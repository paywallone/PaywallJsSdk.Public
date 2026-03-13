import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const PaywallJsSdk = window.PaywallJsSdk;
import { SdkLogService } from './sdk-log.service';
import { SdkResponse, ActionType, FlowState, CardInfo } from '../models/sdk-types';

@Injectable({
  providedIn: 'root'
})
export class MasterpassFlowRunnerService {
  private maxRetries = 3;
  private currentRetryCount = 0;
  private flowState: FlowState = {
    providerInitialized: false,
    linkedState: false,
    cardCount: 0,
    cards: [],
    environment: 'dev'
  };

  // Subjects for dialog interactions (public for component access)
  public otpRequired$ = new Subject<{ title: string; message?: string }>();
  public confirmRequired$ = new Subject<{ title: string; message: string }>();
  public selectCardRequired$ = new Subject<CardInfo[]>();

  // Dialog result subjects (public for component access)
  public otpResult$ = new Subject<string | null>();
  public confirmResult$ = new Subject<boolean>();
  public selectCardResult$ = new Subject<CardInfo | null>();

  constructor(private logService: SdkLogService) {}

  /**
   * Get flow state
   */
  getFlowState(): FlowState {
    return { ...this.flowState };
  }

  /**
   * Update flow state
   */
  updateFlowState(updates: Partial<FlowState>): void {
    this.flowState = { ...this.flowState, ...updates };
  }

  /**
   * Observable for OTP dialog
   */
  getOtpRequired$(): Observable<{ title: string; message?: string }> {
    return this.otpRequired$.asObservable();
  }

  /**
   * Observable for confirm dialog
   */
  getConfirmRequired$(): Observable<{ title: string; message: string }> {
    return this.confirmRequired$.asObservable();
  }

  /**
   * Observable for select card dialog
   */
  getSelectCardRequired$(): Observable<CardInfo[]> {
    return this.selectCardRequired$.asObservable();
  }

  /**
   * Submit OTP result
   */
  submitOtp(otp: string | null): void {
    this.otpResult$.next(otp);
  }

  /**
   * Submit confirm result
   */
  submitConfirm(result: boolean): void {
    this.confirmResult$.next(result);
  }

  /**
   * Submit selected card
   */
  submitSelectedCard(card: CardInfo | null): void {
    this.selectCardResult$.next(card);
  }

  /**
   * Resend OTP via SDK (OTP dialog'dan çağrılır)
   */
  async resendOtp(): Promise<SdkResponse<unknown>> {
    const masterpass = PaywallJsSdk?.providers?.masterpass as { resendOtp?: () => Promise<SdkResponse<unknown>> } | undefined;
    if (!masterpass || typeof masterpass['resendOtp'] !== 'function') {
      return {
        success: false,
        status: 'FAILED',
        source: 'SDK',
        message: 'SDK resendOtp metodu bulunamadı.',
        errorCode: 'RESEND_OTP_UNAVAILABLE'
      } as SdkResponse<unknown>;
    }
    try {
      const result = await masterpass['resendOtp']();
      this.logService.addStep({
        actionName: 'resendOtp',
        response: this.logService.maskSensitiveData(result),
        normalizedResult: this.logService.normalizeResponse(result)
      });
      return result as SdkResponse<unknown>;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Resend OTP failed';
      this.logService.addStep({ actionName: 'resendOtp', error: message });
      return {
        success: false,
        status: 'FAILED',
        source: 'SDK',
        message,
        errorCode: 'RESEND_OTP_ERROR'
      } as SdkResponse<unknown>;
    }
  }

  /**
   * Generic wrapper for SDK calls with action handling
   */
  async callWithHandling<T>(
    actionName: string,
    sdkCall: () => Promise<SdkResponse<T>>,
    retryAction?: () => Promise<SdkResponse<T>>
  ): Promise<SdkResponse<T>> {
    this.currentRetryCount = 0;
    return this.executeWithRetry(actionName, sdkCall, retryAction);
  }

  /**
   * Execute SDK call with retry logic
   */
  private async executeWithRetry<T>(
    actionName: string,
    sdkCall: () => Promise<SdkResponse<T>>,
    retryAction?: () => Promise<SdkResponse<T>>,
    retryCount: number = 0
  ): Promise<SdkResponse<T>> {
    if (retryCount >= this.maxRetries) {
      const errorResponse: SdkResponse = {
        success: false,
        status: 'FAILED',
        message: `Max retries (${this.maxRetries}) exceeded for ${actionName}`
      };
      this.logService.addStep({
        actionName,
        response: errorResponse,
        normalizedResult: this.logService.normalizeResponse(errorResponse),
        error: errorResponse.message
      });
      return errorResponse;
    }

    try {
      // Log request
      const requestPayload = this.getRequestPayload(sdkCall);
      const maskedRequest = this.logService.maskSensitiveData(requestPayload);

      this.logService.addStep({
        actionName: retryCount > 0 ? `${actionName} (Retry ${retryCount})` : actionName,
        request: maskedRequest
      });

      // Execute SDK call
      const response = await sdkCall();

      // Mask sensitive data in response
      const maskedResponse = this.logService.maskSensitiveData(response);
      const normalized = this.logService.normalizeResponse(response);

      // Log response
      this.logService.addStep({
        actionName: retryCount > 0 ? `${actionName} (Retry ${retryCount})` : actionName,
        response: maskedResponse,
        normalizedResult: normalized
      });

      // Handle ACTION_REQUIRED
      if (normalized.status === 'ACTION_REQUIRED' && normalized.actionType) {
        const handled = await this.handleActionRequired(
          normalized.actionType,
          response,
          actionName,
          sdkCall,
          retryAction
        );

        if (handled) {
          // Retry the original action
          if (retryAction) {
            return this.executeWithRetry(actionName, retryAction, retryAction, retryCount + 1);
          } else {
            return this.executeWithRetry(actionName, sdkCall, retryAction, retryCount + 1);
          }
        } else {
          // User cancelled or error
          return {
            ...response,
            success: false,
            status: 'FAILED',
            message: 'Action required but user cancelled or error occurred'
          };
        }
      }

      return response;
    } catch (error: any) {
      const errorResponse: SdkResponse = {
        success: false,
        status: 'FAILED',
        message: error.message || 'Unknown error occurred'
      };

      this.logService.addStep({
        actionName,
        response: errorResponse,
        normalizedResult: this.logService.normalizeResponse(errorResponse),
        error: error.message || 'Unknown error'
      });

      return errorResponse;
    }
  }

  /**
   * Handle ACTION_REQUIRED responses
   */
  private async handleActionRequired(
    actionType: ActionType,
    response: SdkResponse,
    originalActionName: string,
    originalCall: () => Promise<SdkResponse>,
    retryAction?: () => Promise<SdkResponse>
  ): Promise<boolean> {
    switch (actionType) {
      case 'MASTERPASS_OTP_REQUIRED':
      case 'BANK_OTP_REQUIRED':
        return await this.handleOtpRequired(actionType, response);

      case 'MERCHANT_LINK_REQUIRED':
        return await this.handleMerchantLinkRequired(response);

      case 'SESSION_EXPIRED':
        return await this.handleSessionExpired(originalActionName, originalCall);

      case 'HEADER_MISSING':
      case 'INVALID_USER_PHONE':
      case 'INVALID_MERCHANT_ID':
        // Validation errors - don't retry
        return false;

      default:
        // Unknown action type - show confirm dialog
        const confirmed = await this.showConfirmDialog(
          'Action Required',
          `Action required: ${actionType}. Continue?`
        );
        return confirmed;
    }
  }

  /**
   * Handle OTP required
   */
  private async handleOtpRequired(actionType: ActionType, response: SdkResponse): Promise<boolean> {
    const title = actionType === 'BANK_OTP_REQUIRED' ? 'Bank OTP Required' : 'OTP Required';
    const otp = await this.showOtpDialog(title);

    if (!otp) {
      return false; // User cancelled
    }

    try {
      // Call verify OTP
      const verifyResponse = await this.callWithHandling(
        'verifyOtp',
        () => (PaywallJsSdk.providers.masterpass as any).verifyOtp({ otpCode: otp })
      );

      if (verifyResponse.success || verifyResponse.status === 'SUCCESS') {
        return true; // OTP verified, retry original action
      } else if (verifyResponse.status === 'ACTION_REQUIRED' && 
                 (verifyResponse.actionType === 'MASTERPASS_OTP_REQUIRED' || 
                  verifyResponse.actionType === 'BANK_OTP_REQUIRED')) {
        // OTP still required - retry OTP dialog (max 3 times)
        if (this.currentRetryCount < this.maxRetries) {
          this.currentRetryCount++;
          return await this.handleOtpRequired(actionType, verifyResponse);
        }
        return false;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Handle merchant link required
   */
  private async handleMerchantLinkRequired(response: SdkResponse): Promise<boolean> {
    const confirmed = await this.showConfirmDialog(
      'Merchant Link Required',
      'Account not linked. Link to merchant?'
    );

    if (!confirmed) {
      return false;
    }

    // Get accountKey from flow state
    const accountKey = this.flowState.userPhone;
    if (!accountKey) {
      this.logService.addStep({
        actionName: 'merchantLink',
        error: 'AccountKey (userPhone) not found in flow state'
      });
      return false;
    }

    // Call merchant link
    const linkResponse = await this.callWithHandling(
      'merchantLink',
      () => (PaywallJsSdk.providers.masterpass as any).merchantLink({ accountKey })
    );

    if (linkResponse.success || linkResponse.status === 'SUCCESS') {
      this.updateFlowState({ linkedState: true });
      return true; // Linked, retry original action
    } else if (linkResponse.status === 'ACTION_REQUIRED') {
      // Might need OTP - handle it
      if (linkResponse.actionType === 'MASTERPASS_OTP_REQUIRED' || 
          linkResponse.actionType === 'BANK_OTP_REQUIRED') {
        return await this.handleOtpRequired(linkResponse.actionType!, linkResponse);
      }
    }

    return false;
  }

  /**
   * Handle session expired
   */
  private async handleSessionExpired(
    originalActionName: string,
    originalCall: () => Promise<SdkResponse>
  ): Promise<boolean> {
    const confirmed = await this.showConfirmDialog(
      'Session Expired',
      'Session expired. Start new session?'
    );

    if (!confirmed) {
      return false;
    }

    // Restart session - DEPRECATED: startSession removed
    this.logService.addStep({
      actionName: 'restartSession',
      error: 'startSession is deprecated - session is now included in InitPaywallSdk'
    });
    return false;

    // OLD CODE - startSession no longer available:
    /*
    const sessionResponse = await this.callWithHandling(
      'startSession',
      () => PaywallJsSdk.ExternalService.Masterpass['startSession']({
        referenceCode: 'REF-' + Date.now(),
        userId: this.flowState.userId!,
        userPhone: this.flowState.userPhone!,
        force3D: false,
        phoneVerifiedByMerchant: true
      })
    );

    if (sessionResponse.success || sessionResponse.status === 'SUCCESS') {
      const sessionId = (sessionResponse.data as any)?.sessionId;
      this.updateFlowState({ sessionId });
      return true;
    }

    return false;
    */
  }

  /**
   * Show OTP dialog (returns promise that resolves with OTP or null)
   */
  private showOtpDialog(title: string): Promise<string | null> {
    return new Promise((resolve) => {
      this.otpRequired$.next({ title });
      
      const subscription = this.otpResult$.subscribe((otp) => {
        subscription.unsubscribe();
        resolve(otp);
      });
    });
  }

  /**
   * Show confirm dialog
   */
  private showConfirmDialog(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmRequired$.next({ title, message });
      
      const subscription = this.confirmResult$.subscribe((result) => {
        subscription.unsubscribe();
        resolve(result);
      });
    });
  }

  /**
   * Get request payload from SDK call (for logging)
   * This is a best-effort attempt to extract parameters
   * Note: Actual params are logged at call site in component
   */
  private getRequestPayload(sdkCall: () => Promise<SdkResponse>): any {
    // We can't easily extract parameters from a function
    // Actual request params are logged separately in the component
    return { note: 'Request parameters logged at call site' };
  }

  // ========== SDK Action Methods ==========

  /**
   * Get card list (AccountAccess)
   * SDK'daki gerçek metod ismini kullan - eğer yoksa hata fırlat
   */
  async getCardList(accountKey: string): Promise<SdkResponse> {
    return this.callWithHandling(
      'getCardList',
      async () => {
        // SDK'daki gerçek metod ismini kontrol et
        const masterpass = PaywallJsSdk.providers.masterpass as any;
        
        // Önce accountAccess dene
        if (typeof masterpass.accountAccess === 'function') {
          return await masterpass.accountAccess({ accountKey });
        }
        // Sonra getCardList dene
        if (typeof masterpass.getCardList === 'function') {
          return await masterpass.getCardList({ accountKey });
        }
        // Sonra getCards dene
        if (typeof masterpass.getCards === 'function') {
          return await masterpass.getCards({ accountKey });
        }
        
        throw new Error('SDK method not found: accountAccess, getCardList, or getCards');
      }
    );
  }

  /**
   * Delete card
   * SDK'daki gerçek metod ismini kullan
   */
  async deleteCard(cardAlias: string, accountKey: string): Promise<SdkResponse> {
    return this.callWithHandling(
      'deleteCard',
      async () => {
        const masterpass = PaywallJsSdk.providers.masterpass as any;
        
        // Önce removeCard dene
        if (typeof masterpass.removeCard === 'function') {
          return await masterpass.removeCard({ cardAlias, accountKey });
        }
        // Sonra deleteCard dene
        if (typeof masterpass.deleteCard === 'function') {
          return await masterpass.deleteCard({ cardAlias, accountKey });
        }
        
        throw new Error('SDK method not found: removeCard or deleteCard');
      }
    );
  }

  /**
   * Merchant link
   * SDK'daki gerçek metod ismini kullan
   */
  async merchantLink(accountKey: string): Promise<SdkResponse> {
    return this.callWithHandling(
      'merchantLink',
      async () => {
        const masterpass = PaywallJsSdk.providers.masterpass as any;
        
        // Önce merchantLink dene
        if (typeof masterpass.merchantLink === 'function') {
          return await masterpass.merchantLink({ accountKey });
        }
        // Sonra linkMerchant dene
        if (typeof masterpass.linkMerchant === 'function') {
          return await masterpass.linkMerchant({ accountKey });
        }
        
        throw new Error('SDK method not found: merchantLink or linkMerchant');
      }
    );
  }

  /**
   * Merchant unlink (placeholder if not available)
   */
  async merchantUnlink(accountKey: string): Promise<SdkResponse> {
    // Placeholder - if SDK doesn't have this, return mock
    this.logService.addStep({
      actionName: 'merchantUnlink',
      error: 'merchantUnlink not available in SDK - placeholder response'
    });
    
    return {
      success: false,
      status: 'FAILED',
      message: 'merchantUnlink endpoint not available in SDK'
    };
  }

  /**
   * Verify OTP
   * SDK'daki gerçek metod ismini kullan
   */
  async verifyOtp(otp: string): Promise<SdkResponse> {
    return this.callWithHandling(
      'verifyOtp',
      async () => {
        const masterpass = PaywallJsSdk.providers.masterpass as any;
        
        // Önce verifyOtp dene (otpCode parametresi ile)
        if (typeof masterpass.verifyOtp === 'function') {
          return await masterpass.verifyOtp({ otpCode: otp });
        }
        // Sonra verifyOtp dene (otp parametresi ile)
        if (typeof masterpass.verifyOtp === 'function') {
          return await masterpass.verifyOtp({ otp });
        }
        // Sonra verifyOtpCode dene
        if (typeof masterpass.verifyOtpCode === 'function') {
          return await masterpass.verifyOtpCode({ otp });
        }
        
        throw new Error('SDK method not found: verifyOtp or verifyOtpCode');
      }
    );
  }

  /**
   * Payment with manual card
   */
  async paymentWithManualCard(params: any): Promise<SdkResponse> {
    return this.callWithHandling(
      'paymentWithManualCard',
      () => PaywallJsSdk.payment.init(params)
    );
  }

  /**
   * Payment with registered card
   */
  async paymentWithRegisteredCard(params: any): Promise<SdkResponse> {
    return this.callWithHandling(
      'paymentWithRegisteredCard',
      () => (PaywallJsSdk.payment as any).initWithRegisteredCard ? 
        (PaywallJsSdk.payment as any).initWithRegisteredCard(params) :
        PaywallJsSdk.payment.init({ ...params, paymentSource: 'REGISTERED_CARD' })
    );
  }
}
