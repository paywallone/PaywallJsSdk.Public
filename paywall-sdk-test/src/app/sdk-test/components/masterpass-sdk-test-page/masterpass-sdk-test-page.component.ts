import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

const PaywallJsSdk = window.PaywallJsSdk;
import { MasterpassFlowRunnerService } from '../../services/masterpass-flow-runner.service';
import { SdkLogService } from '../../services/sdk-log.service';
import { FlowStep, CardInfo, SdkResponse } from '../../models/sdk-types';

@Component({
  selector: 'app-masterpass-sdk-test-page',
  standalone: false,
  templateUrl: './masterpass-sdk-test-page.component.html',
  styleUrls: ['./masterpass-sdk-test-page.component.scss']
})
export class MasterpassSdkTestPageComponent implements OnInit {
  // ========== CONFIG ==========
  environment: 'dev' | 'test' | 'prod' = 'dev';
  accessToken = '';
  userPhone = '';
  userId = '';
  merchantRef = 'REF-' + Date.now();
  trackingCode = 'TRACK-' + Date.now();

  // ========== SDK / SESSION STATE ==========
  sdkInitLoading = false;
  sdkInitSuccess = false;
  sdkInitError: string | null = null;
  sdkInitResponse: any = null;
  sdkInitResponseExpanded = false;
  includeMasterpassSession = true;

  sessionLoading = false;
  sessionSuccess = false;
  sessionError: string | null = null;
  sessionResponse: any = null;
  sessionResponseExpanded = false;
  sessionId: string | null = null;
  masterpassToken: string | null = null;

  providerInitLoading = false;
  providerInitSuccess = false;
  providerInitError: string | null = null;
  providerInitResponse: any = null;
  providerInitResponseExpanded = false;

  // ========== ACCOUNT / CARD STATE ==========
  cardListLoading = false;
  cardListSuccess = false;
  cardListError: string | null = null;
  cardListResponse: any = null;
  cardListResponseExpanded = false;
  cards: CardInfo[] = [];

  merchantLinkLoading = false;
  merchantLinkSuccess = false;
  merchantLinkError: string | null = null;
  merchantLinkResponse: any = null;
  merchantLinkResponseExpanded = false;

  merchantUnlinkLoading = false;
  merchantUnlinkSuccess = false;
  merchantUnlinkError: string | null = null;
  merchantUnlinkResponse: any = null;
  merchantUnlinkResponseExpanded = false;

  cardDeleteLoading = false;
  cardDeleteSuccess = false;
  cardDeleteError: string | null = null;
  cardDeleteResponse: any = null;
  cardDeleteResponseExpanded = false;
  cardToDelete: CardInfo | null = null;
  showDeleteConfirm = false;

  // OTP handling
  otpRetryCount = 0;
  maxOtpRetries = 3;

  // OTP Verify State
  otpVerifyLoading = false;
  otpVerifySuccess = false;
  otpVerifyError: string | null = null;
  otpVerifyResponse: any = null;
  otpVerifyResponseExpanded = false;

  // Add Card State
  addCardLoading = false;
  addCardSuccess = false;
  addCardError: string | null = null;
  addCardResponse: any = null;
  addCardResponseExpanded = false;

  // ========== PAYMENT STATE ==========
  // Registered Card Payment
  registeredPaymentLoading = false;
  registeredPaymentSuccess = false;
  registeredPaymentError: string | null = null;
  registeredPaymentResponse: any = null;
  registeredPaymentResponseExpanded = false;
  selectedRegisteredCard: {
    cardAlias: string;
    cardBin: string;
    uniqueCardNumber?: string;
  } | null = null;
  selectedCardIndex: number = -1; // For dropdown binding - use index instead of JSON
  paymentAmount = 100;
  force3D = false;

  // Product List
  products: Array<{
    productId?: string;
    productCode?: string;
    productName: string;
    productAmount: number; // SDK expects productAmount (total for this product)
    quantity?: number;
    price?: number;
    totalPrice?: number;
    vatRate?: number;
    vatAmount?: number;
  }> = [
    {
      productId: 'TEST-PRODUCT-001',
      productCode: 'TEST-PRODUCT-001',
      productName: 'Test Product',
      quantity: 1,
      price: 100,
      totalPrice: 100,
      productAmount: 100, // SDK expects this
      vatRate: 0,
      vatAmount: 0
    }
  ];

  // Manual Card Payment
  manualPaymentLoading = false;
  manualPaymentSuccess = false;
  manualPaymentError: string | null = null;
  manualPaymentResponse: any = null;
  manualPaymentResponseExpanded = false;
  manualCardForm = {
    cardNumber: '',
    expiryMonth: '12',
    expiryYear: '26',
    cvv: '',
    cardHolderName: '',
    saveCard: false,
    cardAlias: '',
    saveCardOnPayment: false // Ödeme anında kartı kaydet
  };

  // Customer Form
  customerForm = {
    fullName: '',
    phone: '',
    email: '',
    identityNumber: ''
  };

  // ========== DEBUG PANEL ==========
  logs: FlowStep[] = [];
  currentState: any = {};

  constructor(
    private flowRunner: MasterpassFlowRunnerService,
    public logService: SdkLogService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  navigateToFlowDiagram(): void {
    this.router.navigate(['/sdk-test/flow-diagram']);
  }

  ngOnInit() {
    this.loadLogs();
    this.updateCurrentState();

    // Initialize customer form with default values (phone excluded)
    this.customerForm = {
      fullName: 'Test User',
      phone: '',
      email: 'test@example.com',
      identityNumber: '12345678901'
    };

    // Subscribe to OTP result from dialog
    this.flowRunner.otpResult$.subscribe((otp) => {
      this.onOtpSubmit(otp);
    });
  }

  // ========== A) SDK / SESSION CONTROL PANEL ==========

  /** InitPaywallSdk sonrası: provider + session hazır mı (flowState veya component state) */
  isProviderAndSessionReady(): boolean {
    const fs = this.flowRunner.getFlowState();
    const providerOk = this.providerInitSuccess || fs.providerInitialized === true;
    const sessionOk = this.sessionSuccess || !!(fs.sessionId);
    return !!providerOk && !!sessionOk;
  }

  async InitPaywallSdk() {
    if (!this.accessToken.trim()) {
      this.sdkInitError = 'Token is required';
      return;
    }

    this.sdkInitLoading = true;
    this.sdkInitSuccess = false;
    this.sdkInitError = null;
    this.sdkInitResponse = null;

    try {
      const sdk = PaywallJsSdk as any;
      
      let response;
      if (typeof sdk['InitPaywallSdk'] === 'function') {
        response = await sdk['InitPaywallSdk']({
          environment: this.environment,
          token: this.accessToken,
          includeMasterpassSession: this.includeMasterpassSession
        });
      } else if (typeof sdk['InitAutomatic'] === 'function') {
        response = await sdk['InitAutomatic']({
          environment: this.environment,
          token: this.accessToken,
          includeMasterpassSession: this.includeMasterpassSession
        });
      } else {
        this.sdkInitError = 'SDK metodu bulunamadı. SDK dosyasını kontrol edin.';
        return;
      }

      this.sdkInitResponse = response;
      this.logService.addStep({
        actionName: 'InitPaywallSdk',
        request: {
          environment: this.environment,
          includeMasterpassSession: this.includeMasterpassSession,
          token: this.logService.maskSensitiveData({ token: this.accessToken }).token
        },
        response: this.logService.maskSensitiveData(response),
        normalizedResult: this.logService.normalizeResponse(response)
      });

      if (response.success === true && response.data?.sdkInitialized === true) {
        this.sdkInitSuccess = true;
        
        // Session bilgileri varsa otomatik doldur
        if (response.data?.hasMasterpassSession && response.data?.body?.Masterpass) {
          const masterpass = response.data.body.Masterpass;
          this.sessionId = masterpass.SessionId || masterpass.sessionId;
          
          const responseUserId = masterpass.UserId || masterpass.userId;
          const responseUserPhone = masterpass.UserPhone || masterpass.userPhone;

          if (responseUserId) {
            this.userId = responseUserId;
          }
          if (responseUserPhone) {
            this.userPhone = responseUserPhone;
          }

          this.flowRunner.updateFlowState({
            environment: this.environment,
            currentToken: this.accessToken,
            sessionId: this.sessionId || undefined,
            userId: this.userId || responseUserId || '',
            userPhone: this.userPhone || responseUserPhone || '',
            providerInitialized: true
          });

          // Provider otomatik çağır
          try {
            const providerInitResponse = await PaywallJsSdk.providers.masterpass.init();
            if (providerInitResponse.success === true && providerInitResponse.data?.masterpassSdkInitialized === true) {
              this.providerInitSuccess = true;
              this.providerInitError = null;
              this.providerInitResponse = providerInitResponse;
              this.flowRunner.updateFlowState({ providerInitialized: true });
            }
          } catch (providerError: any) {
            this.providerInitError = providerError.message || 'Provider init failed after InitPaywallSdk';
          }
        } else {
          this.flowRunner.updateFlowState({
            environment: this.environment,
            currentToken: this.accessToken
          });
        }
      } else {
        this.sdkInitSuccess = false;
        this.sdkInitError = response.message || 'SDK initialization failed';
      }
    } catch (error: any) {
      this.sdkInitSuccess = false;
      this.sdkInitError = error.message || 'SDK initialization failed';
      this.logService.addStep({
        actionName: 'InitPaywallSdk',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.sdkInitLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  // initPaywallAutomatic removed - Now using InitPaywallSdk only

  async initMasterpassProvider() {
    if (!this.sdkInitSuccess || !this.sessionId) {
      this.providerInitError = 'SDK and Session must be initialized first (use InitPaywallSdk)';
      return;
    }

    this.providerInitLoading = true;
    this.providerInitSuccess = false;
    this.providerInitError = null;
    this.providerInitResponse = null;

    try {
      const response = await PaywallJsSdk.providers.masterpass.init();
      this.providerInitResponse = response;

      this.logService.addStep({
        actionName: 'initMasterpassProvider',
        request: {},
        response: this.logService.maskSensitiveData(response),
        normalizedResult: this.logService.normalizeResponse(response)
      });

      if (response.success === true && response.data?.masterpassSdkInitialized === true) {
        this.providerInitSuccess = true;
        this.flowRunner.updateFlowState({ providerInitialized: true });
      } else {
        this.providerInitSuccess = false;
        this.providerInitError = response.message || 'Provider initialization failed';
      }
    } catch (error: any) {
      this.providerInitSuccess = false;
      this.providerInitError = error.message || 'Provider initialization failed';
      this.logService.addStep({
        actionName: 'initMasterpassProvider',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.providerInitLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  // ========== B) ACCOUNT / CARD OPERATIONS ==========

  async accountAccess(): Promise<void> {
    // 🧱 ZORUNLU GUARD BLOĞU (TRY-CATCH DIŞINDA)
    const flowState = this.flowRunner.getFlowState();
    const userPhone = this.userPhone || flowState.userPhone;
    const userId = this.userId || flowState.userId;

    // Guard: OTP blocking state - RETURN (NO ERROR THROW)
    if (flowState.awaitingOtp) {
      this.cardListError = 'OTP verification required. Please complete OTP verification first.';
      this.cardListLoading = false;
      this.cardListSuccess = false;
      return;
    }

    // Guard: Provider and session ready check
    if (!this.isProviderAndSessionReady()) {
      this.cardListError = 'Provider and session must be ready first';
      this.cardListLoading = false;
      this.cardListSuccess = false;
      return;
    }

    // Guard: Account key missing - RETURN (NO ERROR THROW)
    if (!userPhone) {
      this.cardListError = 'UserPhone (accountKey) is required';
      this.cardListLoading = false;
      this.cardListSuccess = false;
      return;
    }

    // Guard: User ID missing - RETURN (NO ERROR THROW)
    if (!userId?.trim()) {
      this.cardListError = 'userId is required for Masterpass account access';
      this.cardListLoading = false;
      this.cardListSuccess = false;
      return;
    }

    // ✅ TÜM GUARD'LAR GEÇİLDİ - SDK ÇAĞRISI YAPILACAK
    this.cardListLoading = true;
    this.cardListSuccess = false;
    this.cardListError = null;
    this.cardListResponse = null;

    try {
      const requestPayload = {
        accountKey: userPhone,
        accountKeyType: 'Msisdn',
        userId: userId.trim()
      };

      this.logService.addStep({ actionName: 'accountAccess', request: requestPayload });

      // 🚀 SDK ÇAĞRISI
      const masterpass = PaywallJsSdk.providers.masterpass as any;

      // SDK metod kontrolü
      if (!masterpass) {
        throw new Error('Masterpass provider not initialized. Please initialize provider first.');
      }

      // Metod isimlerini dene
      let response: any;
      if (typeof masterpass.accountAccess === 'function') {
        response = await masterpass.accountAccess(requestPayload);
      } else if (typeof masterpass.getCardList === 'function') {
        response = await masterpass.getCardList(requestPayload);
      } else if (typeof masterpass.getCards === 'function') {
        response = await masterpass.getCards(requestPayload);
      } else {
        throw new Error('SDK method not found. Available methods: ' + Object.keys(masterpass).join(', '));
      }

      this.cardListResponse = response;
      const result = response?.result || response?.data?.result;
      const responseCode = result?.responseCode || response?.providerMeta?.responseCode || (response as any)?.statusCode;
      const statusCode = (response as any)?.statusCode;
      const actionType = response?.actionType;
      const status = response?.status;
      const otpToken = result?.token || response?.data?.token;

      this.logService.addStep({
        actionName: 'accountAccess',
        response: this.logService.maskSensitiveData(response),
        normalizedResult: this.logService.normalizeResponse(response)
      });

      // 🔐 OTP ALGILANDIĞINDA YAPILACAK TEK ŞEY
      // Kontrol: responseCode 5001/5008 VEYA ACTION_REQUIRED + OTP actionType
      const needsOTP = (responseCode === '5001' || responseCode === '5008') ||
                       (status === 'ACTION_REQUIRED' && (actionType === 'OTP' || actionType === 'BANK_OTP' || actionType === 'MASTERPASS_OTP_REQUIRED'));

      if (needsOTP && otpToken) {
        // Set OTP blocking state
        this.flowRunner.updateFlowState({
          awaitingOtp: true,
          pendingAction: 'accountAccess',
          otpToken: otpToken
        });

        // Open OTP popup
        this.flowRunner.otpRequired$.next({
          title: actionType === 'BANK_OTP' ? 'Bank OTP Required' : 'OTP Required',
          message: result?.description || response?.message || 'Please enter OTP code sent to your phone'
        });

        this.cardListLoading = false;
        this.cardListSuccess = false;
        this.cardListError = null;
        this.loadLogs();
        this.updateCurrentState();
        return; // STOP - no auto-retry
      }

      // Success case
      if (responseCode === '0000' || response.success || response.status === 'SUCCESS') {
        const rawCards = (response.data as any)?.cards || (response.data as any)?.cardList || [];
        this.cards = rawCards.map((card: any) => ({
          alias: card.cardAlias || card.alias || '',
          cardAlias: card.cardAlias || card.alias || '',
          cardMasked: card.maskedCardNumber || card.cardMasked || card.maskedNumber || '****',
          cardBin: card.cardBin || card.bin || '',
          uniqueCardNumber: card.uniqueCardNumber,
          isDefault: card.isDefaultCard || card.isDefault || false,
          originalCard: card
        }));

        this.cardListSuccess = true;
        this.flowRunner.updateFlowState({
          cards: this.cards,
          cardCount: this.cards.length,
          linkedState: this.cards.length > 0
        });

        // Update selected card if still valid
        if (this.selectedCardIndex >= 0 && this.selectedCardIndex < this.cards.length) {
          const card = this.cards[this.selectedCardIndex];
          if (this.selectedRegisteredCard?.cardAlias === (card['cardAlias'] || card.alias)) {
            this.selectedRegisteredCard = {
              cardAlias: card['cardAlias'] || card.alias || '',
              cardBin: card.cardBin || '',
              uniqueCardNumber: card.uniqueCardNumber
            };
          } else {
            this.selectedRegisteredCard = null;
            this.selectedCardIndex = -1;
          }
        }
      } else {
        this.cardListSuccess = false;
        this.cardListError = result?.description || response.message || 'Get card list failed';
      }
    } catch (error: any) {
      // 🧪 catch BLOĞU (SDK ÇAĞRISI SONRASI HATA)
      this.cardListSuccess = false;
      this.cardListError = error.message || 'Get card list failed';

      this.logService.addStep({ actionName: 'accountAccess', error: error.message });
    } finally {
      // ✅ HER DURUMDA LOADING STATE RESET
      this.cardListLoading = false;
      this.loadLogs();
      this.updateCurrentState();

      // ❌ ASLA retry
      // ❌ ASLA başka SDK çağrısı
    }
  }


  /**
   * Handle OTP submission from dialog
   */
  async onOtpSubmit(otp: string | null): Promise<void> {
    if (!otp) {
      this.flowRunner.updateFlowState({
        awaitingOtp: false,
        pendingAction: null,
        otpToken: null
      });
      return;
    }

    const flowState = this.flowRunner.getFlowState();
    const otpToken = flowState.otpToken;

    if (!otpToken) {
      this.flowRunner.updateFlowState({
        awaitingOtp: false,
        pendingAction: null,
        otpToken: null
      });
      return;
    }

    this.otpVerifyLoading = true;
    this.otpVerifySuccess = false;
    this.otpVerifyError = null;
    this.otpVerifyResponse = null;

    try {
      const requestPayload = {
        otpCode: otp,
        token: otpToken
      };

      this.logService.addStep({
        actionName: 'verifyOtp',
        request: { otpLength: otp.length, token: otpToken.substring(0, 10) + '...' }
      });

      const masterpass = PaywallJsSdk.providers.masterpass as any;
      const verifyResponse = await masterpass.verifyOtp(requestPayload);

      this.otpVerifyResponse = verifyResponse;
      const result = verifyResponse?.result || verifyResponse?.data?.result;
      const responseCode = result?.responseCode;
      const statusCode = (verifyResponse as any)?.statusCode;
      const success = verifyResponse.success || verifyResponse.status === 'SUCCESS' || responseCode === '0000';

      this.logService.addStep({
        actionName: 'verifyOtp',
        response: this.logService.maskSensitiveData(verifyResponse),
        normalizedResult: this.logService.normalizeResponse(verifyResponse)
      });

      if (success) {
        // Update linkedState if pending action was merchantLink
        if (flowState.pendingAction === 'merchantLink') {
          this.flowRunner.updateFlowState({ linkedState: true });
        }

        // ✅ OTP BAŞARILI OLUNCA ZORUNLU RESET
        this.flowRunner.updateFlowState({
          awaitingOtp: false,
          pendingAction: null,
          otpToken: null
        });

        this.otpVerifySuccess = true;
        this.otpVerifyError = null;
        this.otpRetryCount = 0;

        this.loadLogs();
        this.updateCurrentState();

        // 🔁 OTP SONRASI DAVRANIŞ
        // HİÇBİR şey otomatik tetiklenmez
        // Kullanıcı tekrar AccountAccess'e veya MerchantLink'e basar
      } else {
        // OTP verification failed - retry if under max retries
        this.otpRetryCount++;

        this.otpVerifySuccess = false;
        this.otpVerifyError = result?.description || verifyResponse.message || 'OTP verification failed';

        if (this.otpRetryCount >= this.maxOtpRetries) {
          this.flowRunner.updateFlowState({
            awaitingOtp: false,
            pendingAction: null,
            otpToken: null
          });
          this.otpRetryCount = 0;
          this.loadLogs();
          this.updateCurrentState();
        } else {
          // Retry - open OTP dialog again
          this.flowRunner.otpRequired$.next({
            title: 'OTP Required',
            message: result?.description || 'OTP verification failed. Please try again.'
          });
          this.loadLogs();
          this.updateCurrentState();
        }
      }
    } catch (error: any) {
      this.otpVerifySuccess = false;
      this.otpVerifyError = error.message || 'OTP verification failed';

      this.logService.addStep({
        actionName: 'verifyOtp',
        error: error.message || 'Unknown error'
      });

      this.flowRunner.updateFlowState({
        awaitingOtp: false,
        pendingAction: null,
        otpToken: null
      });
      this.otpRetryCount = 0;

      this.loadLogs();
      this.updateCurrentState();
    } finally {
      this.otpVerifyLoading = false;
    }
  }


  async merchantLink(): Promise<void> {
    // 🧱 ZORUNLU GUARD BLOĞU (TRY-CATCH DIŞINDA)
    const flowState = this.flowRunner.getFlowState();
    const userPhone = this.userPhone || flowState.userPhone;
    const userId = this.userId || flowState.userId;

    // Guard: OTP blocking state - RETURN (NO ERROR THROW)
    if (flowState.awaitingOtp) {
      this.merchantLinkError = 'OTP verification required. Please complete OTP verification first.';
      this.merchantLinkLoading = false;
      this.merchantLinkSuccess = false;
      return;
    }

    // Guard: Provider and session ready check
    if (!this.isProviderAndSessionReady()) {
      this.merchantLinkError = 'Provider and session must be ready first';
      this.merchantLinkLoading = false;
      this.merchantLinkSuccess = false;
      return;
    }

    // Guard: Account key missing - RETURN (NO ERROR THROW)
    if (!userPhone) {
      this.merchantLinkError = 'UserPhone (accountKey) is required';
      this.merchantLinkLoading = false;
      this.merchantLinkSuccess = false;
      return;
    }

    // Guard: User ID missing - RETURN (NO ERROR THROW)
    if (!userId?.trim()) {
      this.merchantLinkError = 'userId is required';
      this.merchantLinkLoading = false;
      this.merchantLinkSuccess = false;
      return;
    }

    // ✅ TÜM GUARD'LAR GEÇİLDİ - SDK ÇAĞRISI YAPILACAK
    this.merchantLinkLoading = true;
    this.merchantLinkSuccess = false;
    this.merchantLinkError = null;
    this.merchantLinkResponse = null;

    try {
      const requestPayload = {
        accountKey: userPhone,
        userId: userId.trim()
      };

      this.logService.addStep({ actionName: 'merchantLink', request: requestPayload });

      // 🚀 SDK ÇAĞRISI
      const masterpass = PaywallJsSdk.providers.masterpass as any;

      // SDK metod kontrolü
      if (!masterpass) {
        throw new Error('Masterpass provider not initialized. Please initialize provider first.');
      }

      // Metod isimlerini dene
      let response: any;
      if (typeof masterpass.merchantLink === 'function') {
        response = await masterpass.merchantLink(requestPayload);
      } else if (typeof masterpass.linkMerchant === 'function') {
        response = await masterpass.linkMerchant(requestPayload);
      } else {
        throw new Error('SDK method not found. Available methods: ' + Object.keys(masterpass).join(', '));
      }

      this.merchantLinkResponse = response;
      const result = response?.result || response?.data?.result;
      const responseCode = result?.responseCode || response?.providerMeta?.responseCode || (response as any)?.statusCode;
      const statusCode = (response as any)?.statusCode;
      const actionType = response?.actionType;
      const status = response?.status;
      const otpToken = result?.token || response?.data?.token;

      this.logService.addStep({
        actionName: 'merchantLink',
        response: this.logService.maskSensitiveData(response),
        normalizedResult: this.logService.normalizeResponse(response)
      });

      // 🔐 OTP ALGILANDIĞINDA YAPILACAK TEK ŞEY
      // Kontrol: responseCode 5001/5008 VEYA ACTION_REQUIRED + OTP actionType
      const needsOTP = (responseCode === '5001' || responseCode === '5008') ||
                       (status === 'ACTION_REQUIRED' && (actionType === 'OTP' || actionType === 'BANK_OTP' || actionType === 'MASTERPASS_OTP_REQUIRED'));

      if (needsOTP && otpToken) {
        // Set OTP blocking state
        this.flowRunner.updateFlowState({
          awaitingOtp: true,
          pendingAction: 'merchantLink',
          otpToken: otpToken
        });

        // Open OTP popup
        this.flowRunner.otpRequired$.next({
          title: actionType === 'BANK_OTP' ? 'Bank OTP Required' : 'OTP Required',
          message: result?.description || response?.message || 'Please enter OTP code sent to your phone'
        });

        this.merchantLinkLoading = false;
        this.merchantLinkSuccess = false;
        this.merchantLinkError = null;
        this.loadLogs();
        this.updateCurrentState();
        return; // STOP - no auto-retry
      }

      // Success case
      if (responseCode === '0000' || statusCode === 200 || response.success || response.status === 'SUCCESS') {
        this.merchantLinkSuccess = true;
        this.flowRunner.updateFlowState({ linkedState: true });
        // NO auto-refresh - user must click accountAccess button
      } else {
        this.merchantLinkSuccess = false;
        const errorMsg = result?.description || (response as any).exception?.message || response.message || 'Merchant link failed';
        const errorCode = (response as any).exception?.code || '';
        if (errorCode === 'ACCOUNT_NOT_FOUND' || statusCode === 404) {
          this.merchantLinkError = `Account not found (404). This may happen after deleting all cards. Error: ${errorMsg}`;
        } else {
          this.merchantLinkError = errorMsg;
        }
      }
    } catch (error: any) {
      // 🧪 catch BLOĞU (SDK ÇAĞRISI SONRASI HATA)
      this.merchantLinkSuccess = false;
      this.merchantLinkError = error.message || 'Merchant link failed';

      this.logService.addStep({ actionName: 'merchantLink', error: error.message });
    } finally {
      // ✅ HER DURUMDA LOADING STATE RESET
      this.merchantLinkLoading = false;
      this.loadLogs();
      this.updateCurrentState();

      // ❌ ASLA retry
      // ❌ ASLA başka SDK çağrısı
    }
  }

  async merchantUnlink() {
    const flowState = this.flowRunner.getFlowState();
    const userPhone = this.userPhone || flowState.userPhone;
    const userId = this.userId || flowState.userId;

    if (!this.isProviderAndSessionReady()) {
      this.merchantUnlinkError = 'Provider and session must be ready first';
      return;
    }

    if (!userPhone) {
      this.merchantUnlinkError = 'UserPhone (accountKey) is required';
      return;
    }

    if (!userId || !userId.trim()) {
      this.merchantUnlinkError = 'userId is required';
      return;
    }

    if (!this.masterpassToken) {
      this.merchantUnlinkError = 'Masterpass token not found. Please start session first.';
      return;
    }

    // Confirm dialog
    const confirmed = await new Promise<boolean>((resolve) => {
      this.flowRunner.confirmRequired$.next({
        title: 'Unlink Merchant',
        message: 'Are you sure you want to unlink the account from merchant?'
      });
      const sub = this.flowRunner.confirmResult$.subscribe((result) => {
        sub.unsubscribe();
        resolve(result);
      });
    });

    if (!confirmed) {
      return;
    }

    this.merchantUnlinkLoading = true;
    this.merchantUnlinkSuccess = false;
    this.merchantUnlinkError = null;
    this.merchantUnlinkResponse = null;

    try {
      // Prepare request payload
      const requestPayload = {
        merchantId: (PaywallJsSdk as any).merchantId || '',
        accountKey: userPhone,
        userId: userId.trim(),
        token: this.masterpassToken
      };

      this.logService.addStep({
        actionName: 'merchantUnlink',
        request: { accountKey: userPhone, userId: userId, merchantId: requestPayload.merchantId }
      });

      // Call SDK - merchantUnlink
      const masterpass = PaywallJsSdk.providers.masterpass as any;
      let response: any;

      if (typeof masterpass.merchantUnlink === 'function') {
        response = await masterpass.merchantUnlink(requestPayload);
      } else {
        throw new Error('SDK method not found: merchantUnlink');
      }

      this.merchantUnlinkResponse = response;
      const maskedResponse = this.logService.maskSensitiveData(response);
      const normalized = this.logService.normalizeResponse(response);

      this.logService.addStep({
        actionName: 'merchantUnlink',
        response: maskedResponse,
        normalizedResult: normalized
      });

      // merchantUnlink is a terminal operation - no ACTION_REQUIRED handling
      if (response.success || response.status === 'SUCCESS' || (response as any).statusCode === 200) {
        this.merchantUnlinkSuccess = true;
        this.merchantUnlinkError = null;
        // Clear card list on success
        this.cards = [];
        this.cardListResponse = null;
      } else {
        this.merchantUnlinkSuccess = false;
        const errorMsg = (response as any).exception?.message || response.message || 'Merchant unlink failed';
        this.merchantUnlinkError = errorMsg;
      }
    } catch (error: any) {
      this.merchantUnlinkSuccess = false;
      this.merchantUnlinkError = error.message || 'Merchant unlink failed';
      this.logService.addStep({
        actionName: 'merchantUnlink',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.merchantUnlinkLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  confirmDeleteCard(card: CardInfo) {
    this.cardToDelete = card;
    this.showDeleteConfirm = true;
  }

  // ========== ADD CARD ==========

  async addCard() {
    const flowState = this.flowRunner.getFlowState();
    const userPhone = this.userPhone || flowState.userPhone;
    const userId = this.userId || flowState.userId;

    if (!this.isProviderAndSessionReady()) {
      this.addCardError = 'Provider and session must be ready first';
      return;
    }

    const token = this.masterpassToken ?? (flowState as any).masterpassToken;
    if (!token) {
      this.addCardError = 'Masterpass token not found';
      return;
    }

    if (!userPhone) {
      this.addCardError = 'UserPhone (accountKey) is required';
      return;
    }

    if (!userId || !userId.trim()) {
      this.addCardError = 'userId is required';
      return;
    }

    // Validate card form
    const cardNumber = this.manualCardForm.cardNumber.replace(/\s/g, '');
    if (!cardNumber || !this.manualCardForm.cardHolderName || !this.manualCardForm.expiryMonth ||
        !this.manualCardForm.expiryYear || !this.manualCardForm.cvv) {
      this.addCardError = 'All card fields are required';
      return;
    }

    if (!this.manualCardForm.cardAlias.trim()) {
      this.addCardError = 'Card Alias is required';
      return;
    }

    this.addCardLoading = true;
    this.addCardSuccess = false;
    this.addCardError = null;
    this.addCardResponse = null;

    try {
      // Prepare Add Card request payload
      const addCardParams: any = {
        token: token,
        userId: userId.trim(),
        accountKey: userPhone,
        accountKeyType: 'Msisdn',
        requestReferenceNumber: this.generateNumericReference(), // Must be numeric string
        cardHolderName: this.manualCardForm.cardHolderName,
        cardNumber: cardNumber,
        expiryDate: this.manualCardForm.expiryMonth + this.manualCardForm.expiryYear,
        cvv: this.manualCardForm.cvv,
        accountAliasName: this.manualCardForm.cardAlias.trim()
      };

      this.logService.addStep({
        actionName: 'addCard',
        request: this.logService.maskSensitiveData(addCardParams)
      });

      // Call SDK - Add Card
      const masterpass = PaywallJsSdk.providers.masterpass as any;
      let response: any;

      if (typeof masterpass.addCard === 'function') {
        response = await masterpass.addCard(addCardParams);
      } else {
        throw new Error('SDK method not found: addCard');
      }

      this.addCardResponse = response;
      const maskedResponse = this.logService.maskSensitiveData(response);
      const normalized = this.logService.normalizeResponse(response);

      this.logService.addStep({
        actionName: 'addCard',
        response: maskedResponse,
        normalizedResult: normalized
      });

      // Extract result and responseCode (Masterpass SDK format)
      const result = (response as any).result || response.data?.result;
      const responseCode = result?.responseCode;
      const statusCode = (response as any)?.statusCode;
      const actionType = response?.actionType;
      const status = response?.status;
      const otpToken = result?.token || response?.data?.token;

      // 🔐 OTP ALGILANDIĞINDA YAPILACAK TEK ŞEY
      // Kontrol: responseCode 5001/5008 VEYA ACTION_REQUIRED + OTP actionType
      const needsOTP = (responseCode === '5001' || responseCode === '5008') ||
                       (status === 'ACTION_REQUIRED' && (actionType === 'OTP' || actionType === 'BANK_OTP' || actionType === 'MASTERPASS_OTP_REQUIRED'));

      if (needsOTP && otpToken) {
        // Set OTP blocking state
        this.flowRunner.updateFlowState({
          awaitingOtp: true,
          pendingAction: 'addCard' as any,
          otpToken: otpToken
        });

        // Open OTP popup
        this.flowRunner.otpRequired$.next({
          title: actionType === 'BANK_OTP' ? 'Bank OTP Required' : 'OTP Required',
          message: result?.description || response?.message || 'Please enter OTP code sent to your phone'
        });

        this.addCardLoading = false;
        this.addCardSuccess = false;
        this.addCardError = null;
        this.loadLogs();
        this.updateCurrentState();
        return; // STOP - no auto-retry
      } else if (response.success || response.status === 'SUCCESS' || statusCode === 202) {
        this.addCardSuccess = true;
        this.addCardError = null;
        // Kart kaydedildi - otomatik refresh YOK, kullanıcı manuel refresh yapacak
      } else {
        this.addCardSuccess = false;
        this.addCardError = response.message || 'Add card failed';
      }
    } catch (error: any) {
      this.addCardSuccess = false;
      this.addCardError = error.message || 'Add card failed';
      this.logService.addStep({
        actionName: 'addCard',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.addCardLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  async deleteCard() {
    if (!this.cardToDelete) return;

    const flowState = this.flowRunner.getFlowState();
    const userPhone = this.userPhone || flowState.userPhone;
    const userId = this.userId || flowState.userId;

    if (!userPhone) {
      this.cardListError = 'UserPhone (accountKey) is required';
      return;
    }

    this.cardDeleteLoading = true;
    this.cardDeleteSuccess = false;
    this.cardDeleteError = null;
    this.cardDeleteResponse = null;
    this.showDeleteConfirm = false;

    try {
      if (!userId || !userId.trim()) {
        this.cardDeleteError = 'userId is required';
        return;
      }

      this.logService.addStep({
        actionName: 'deleteCard',
        request: { cardAlias: this.cardToDelete.alias, accountKey: userPhone, userId: userId }
      });

      // Direkt SDK'yı çağır
      const masterpass = PaywallJsSdk.providers.masterpass as any;
      let response: any;

      if (typeof masterpass.removeCard === 'function') {
        response = await masterpass.removeCard({ cardAlias: this.cardToDelete.alias, accountKey: userPhone });
      } else if (typeof masterpass.deleteCard === 'function') {
        response = await masterpass.deleteCard({ cardAlias: this.cardToDelete.alias, accountKey: userPhone });
      } else {
        throw new Error('SDK method not found. Available methods: ' + Object.keys(masterpass).join(', '));
      }

      this.cardDeleteResponse = response;
      const maskedResponse = this.logService.maskSensitiveData(response);
      const normalized = this.logService.normalizeResponse(response);

      this.logService.addStep({
        actionName: 'deleteCard',
        response: maskedResponse,
        normalizedResult: normalized
      });

      if (response.success || response.status === 'SUCCESS') {
        this.cardDeleteSuccess = true;
        // Auto refresh card list
        await this.accountAccess();
        this.cardToDelete = null;
      } else {
        this.cardDeleteSuccess = false;
        this.cardDeleteError = response.message || 'Delete card failed';
      }
    } catch (error: any) {
      this.cardDeleteSuccess = false;
      this.cardDeleteError = error.message || 'Delete card failed';
      this.logService.addStep({
        actionName: 'deleteCard',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.cardDeleteLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  cancelDeleteCard() {
    this.showDeleteConfirm = false;
    this.cardToDelete = null;
  }

  // ========== C) PAYMENT TEST AREA ==========

  onRegisteredCardSelected(cardIndex: number | string) {
    // Handle empty selection
    if (cardIndex === null || cardIndex === undefined || cardIndex === -1 || cardIndex === '-1' || cardIndex === '') {
      this.selectedRegisteredCard = null;
      this.selectedCardIndex = -1;
      return;
    }

    // Convert to number if string
    const index = typeof cardIndex === 'string' ? parseInt(cardIndex, 10) : cardIndex;

    if (isNaN(index) || index < 0 || index >= this.cards.length) {
      this.selectedRegisteredCard = null;
      this.selectedCardIndex = -1;
      return;
    }

    const card = this.cards[index];

    // Get cardAlias - try multiple sources
    const cardAlias = card['cardAlias'] || card.alias || (card as any).originalCard?.cardAlias;
    const cardBin = card.cardBin || (card as any).originalCard?.cardBin || '';
    const uniqueCardNumber = card.uniqueCardNumber || (card as any).originalCard?.uniqueCardNumber;

    if (!cardAlias) {
      this.selectedRegisteredCard = null;
      this.selectedCardIndex = -1;
      this.registeredPaymentError = 'Card selection error: cardAlias is missing in card data';
      return;
    }

    this.selectedRegisteredCard = {
      cardAlias: cardAlias,
      cardBin: cardBin,
      uniqueCardNumber: uniqueCardNumber
    };
    this.selectedCardIndex = index;
  }

  getCardDisplayLabel(card: CardInfo): string {
    if (!card) return 'Unknown Card';

    const masked = card.cardMasked || card.maskedCardNumber || card.maskedNumber || (card as any).originalCard?.maskedCardNumber || '****';
    const bin = card.cardBin || (card as any).originalCard?.cardBin || '';
    return bin ? `${masked} (${bin})` : masked;
  }


  async payWithRegisteredCard() {
    const flowState = this.flowRunner.getFlowState();
    const sessionId = this.sessionId ?? flowState.sessionId;

    // UI Guard 1: Provider and Session check
    if (!this.isProviderAndSessionReady()) {
      this.registeredPaymentError = 'Provider and Session must be ready first';
      return;
    }

    // UI Guard 2: Card list check
    if (this.cards.length === 0) {
      this.registeredPaymentError = 'No registered cards available. Please get card list first.';
      return;
    }

    // UI Guard 3: Selected card check
    if (!this.selectedRegisteredCard) {
      this.registeredPaymentError = 'Please select a registered card';
      return;
    }

    // UI Guard 4: Required fields check
    if (!this.selectedRegisteredCard.cardAlias) {
      this.registeredPaymentError = 'Card alias is missing';
      return;
    }

    if (!this.selectedRegisteredCard.cardBin) {
      this.registeredPaymentError = 'Card BIN is missing';
      return;
    }

    if (!sessionId) {
      this.registeredPaymentError = 'SessionId not found';
      return;
    }

    this.registeredPaymentLoading = true;
    this.registeredPaymentSuccess = false;
    this.registeredPaymentError = null;
    this.registeredPaymentResponse = null;

    try {
      // Final validation before payment
      if (!this.selectedRegisteredCard || !this.selectedRegisteredCard.cardAlias) {
        this.registeredPaymentError = 'Card selection is invalid. Please select a card again.';
        this.registeredPaymentLoading = false;
        return;
      }

      // Calculate product total and update payment amount
      const productTotal = this.calculateProductTotal();
      if (productTotal > 0) {
        this.paymentAmount = productTotal;
      }

      // REGISTERED CARD PAYMENT - SADECE cardAlias ve cardBin kullan
      // SDK format: card objesi içinde ownerName (alias), cardData içinde cardAlias
      const requestPayload: any = {
        sessionId: sessionId,
        paymentSource: 'REGISTERED_CARD',
        paymentDetail: {
          amount: this.paymentAmount,
          currencyId: 1,
          merchantUniqueCode: 'MERCHANT-' + Date.now(),
          trackingCode: this.trackingCode,
          successUrl: 'https://merchant.com/success',
          failUrl: 'https://merchant.com/fail',
          clientIp: '192.168.1.1',
          installment: 1
        },
        card: {
          ownerName: this.selectedRegisteredCard.cardAlias, // SDK expects ownerName for registered cards
          cardBin: this.selectedRegisteredCard.cardBin || '',
          cardMasked: this.cards.find(c => c.alias === this.selectedRegisteredCard?.cardAlias)?.cardMasked || ''
        },
        cardData: {
          cardAlias: this.selectedRegisteredCard.cardAlias // SDK expects cardAlias in cardData
        },
        customer: {
          fullName: this.customerForm.fullName,
          phone: this.customerForm.phone,
          email: this.customerForm.email,
          identityNumber: this.customerForm.identityNumber
        },
        products: this.products.map(p => ({
          productId: p.productId || p.productCode,
          productCode: p.productCode || p.productId,
          productName: p.productName,
          productAmount: p.productAmount || p.totalPrice || 0, // SDK expects productAmount
          quantity: p.quantity,
          price: p.price,
          totalPrice: p.totalPrice || p.productAmount,
          vatRate: p.vatRate,
          vatAmount: p.vatAmount
        }))
      };

      this.logService.addStep({
        actionName: 'payWithRegisteredCard',
        request: this.logService.maskSensitiveData(requestPayload)
      });

      // Direkt SDK'yı çağır - payment.init kullan
      const response = await PaywallJsSdk.payment.init(requestPayload);
      this.registeredPaymentResponse = response;

      const maskedResponse = this.logService.maskSensitiveData(response);
      const normalized = this.logService.normalizeResponse(response);

      this.logService.addStep({
        actionName: 'payWithRegisteredCard',
        response: maskedResponse,
        normalizedResult: normalized
      });

      // Extract result and responseCode
      const result = (response as any).result || (response as any).data?.result;
      const responseCode = result?.responseCode;
      const has3DUrl = result?.url3d;

      // Check OTP requirement (5010 for payment)
      if (responseCode === '5010') {
        const otpToken = result?.token;
        if (otpToken) {
          // Set OTP blocking state
          this.flowRunner.updateFlowState({
            awaitingOtp: true,
            pendingAction: 'payWithRegisteredCard' as any,
            otpToken: otpToken
          });

          // Open OTP popup
          this.flowRunner.otpRequired$.next({
            title: 'OTP Required',
            message: result?.description || 'Please enter OTP code sent to your phone'
          });

          this.registeredPaymentLoading = false;
          this.loadLogs();
          this.updateCurrentState();
          return; // STOP - no auto-retry
        }
      }

      // Check 3D Secure
      if (has3DUrl) {
        this.registeredPaymentError = '3D Secure required. URL: ' + (result?.url3d || 'N/A');
      } else if (response.success === true || response.status === 'SUCCESS' || (response as any).statusCode === 202) {
        // Final success
        this.registeredPaymentSuccess = true;
        this.registeredPaymentError = null;
      } else {
        this.registeredPaymentSuccess = false;
        this.registeredPaymentError = response.message || (response as any).error || 'Payment failed';
      }
    } catch (error: any) {
      this.registeredPaymentSuccess = false;
      this.registeredPaymentError = error.message || 'Payment failed';
      this.logService.addStep({
        actionName: 'payWithRegisteredCard',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.registeredPaymentLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  async payWithManualCard() {
    const flowState = this.flowRunner.getFlowState();
    const sessionId = this.sessionId ?? flowState.sessionId;
    const userPhone = this.userPhone || flowState.userPhone;
    const userId = this.userId || flowState.userId;

    // UI Guard: Provider and Session check
    if (!this.isProviderAndSessionReady()) {
      this.manualPaymentError = 'Provider and Session must be ready first';
      return;
    }

    if (!sessionId) {
      this.manualPaymentError = 'SessionId not found';
      return;
    }

    if (!userPhone) {
      this.manualPaymentError = 'UserPhone (accountKey) is required for registerAndPurchase';
      return;
    }

    if (!userId || !userId.trim()) {
      this.manualPaymentError = 'UserId is required for registerAndPurchase';
      return;
    }

    this.manualPaymentLoading = true;
    this.manualPaymentSuccess = false;
    this.manualPaymentError = null;
    this.manualPaymentResponse = null;

    try {
      // Calculate product total and update payment amount
      const productTotal = this.calculateProductTotal();
      if (productTotal > 0) {
        this.paymentAmount = productTotal;
      }

      // Clean card number (remove spaces)
      const cardNumber = this.manualCardForm.cardNumber.replace(/\s/g, '');

      if (!cardNumber || !this.manualCardForm.cardHolderName || !this.manualCardForm.expiryMonth ||
          !this.manualCardForm.expiryYear || !this.manualCardForm.cvv) {
        this.manualPaymentError = 'All card fields are required';
        this.manualPaymentLoading = false;
        return;
      }

      // Eğer "Kartımı Kaydet ve Öde" seçiliyse registerAndPurchase kullan
      if (this.manualCardForm.saveCardOnPayment) {
        // CardAlias zorunlu kontrolü
        if (!this.manualCardForm.cardAlias || !this.manualCardForm.cardAlias.trim()) {
          this.manualPaymentError = 'Card Alias is required when saving card';
          this.manualPaymentLoading = false;
          return;
        }
        await this.registerAndPurchase(cardNumber);
        return;
      }


      // MANUAL CARD PAYMENT - registered card alanlarına BAKMA
      const requestPayload: any = {
        sessionId: sessionId,
        paymentSource: 'MANUAL_CARD',
        paymentDetail: {
          amount: this.paymentAmount,
          currencyId: 1,
          merchantUniqueCode: 'MERCHANT-' + Date.now(),
          trackingCode: this.trackingCode,
          successUrl: 'https://merchant.com/success',
          failUrl: 'https://merchant.com/fail',
          clientIp: '192.168.1.1',
          installment: 1
        },
        cardData: {
          cardNumber,
          ownerName: this.manualCardForm.cardHolderName,
          expiryDate: this.manualCardForm.expiryMonth + this.manualCardForm.expiryYear,
          cvv: this.manualCardForm.cvv
        },
        customer: {
          fullName: this.customerForm.fullName,
          phone: this.customerForm.phone,
          email: this.customerForm.email,
          identityNumber: this.customerForm.identityNumber
        },
        products: this.products.map(p => ({
          productId: p.productId || p.productCode,
          productCode: p.productCode || p.productId,
          productName: p.productName,
          productAmount: p.productAmount || p.totalPrice || 0, // SDK expects productAmount
          quantity: p.quantity,
          price: p.price,
          totalPrice: p.totalPrice || p.productAmount,
          vatRate: p.vatRate,
          vatAmount: p.vatAmount
        }))
      };

      this.logService.addStep({
        actionName: 'payWithManualCard',
        request: this.logService.maskSensitiveData(requestPayload)
      });

      // Direkt SDK'yı çağır - payment.init kullan
      const response = await PaywallJsSdk.payment.init(requestPayload);
      this.manualPaymentResponse = response;

      const maskedResponse = this.logService.maskSensitiveData(response);
      const normalized = this.logService.normalizeResponse(response);

      this.logService.addStep({
        actionName: 'payWithManualCard',
        response: maskedResponse,
        normalizedResult: normalized
      });

      // Extract result and responseCode
      const result = (response as any).result || (response as any).data?.result;
      const responseCode = result?.responseCode;
      const has3DUrl = result?.url3d;

      // Check OTP requirement (5010 for payment)
      if (responseCode === '5010') {
        const otpToken = result?.token;
        if (otpToken) {
          // Set OTP blocking state
          this.flowRunner.updateFlowState({
            awaitingOtp: true,
            pendingAction: 'payWithManualCard' as any,
            otpToken: otpToken
          });

          // Open OTP popup
          this.flowRunner.otpRequired$.next({
            title: 'OTP Required',
            message: result?.description || 'Please enter OTP code sent to your phone'
          });

          this.manualPaymentLoading = false;
          this.loadLogs();
          this.updateCurrentState();
          return; // STOP - no auto-retry
        }
      }

      // Check 3D Secure
      if (has3DUrl) {
        this.manualPaymentError = '3D Secure required. URL: ' + (result?.url3d || 'N/A');
      } else if (response.success === true || response.status === 'SUCCESS' || (response as any).statusCode === 202) {
        // Final success
        this.manualPaymentSuccess = true;
        this.manualPaymentError = null;
      } else {
        this.manualPaymentSuccess = false;
        this.manualPaymentError = response.message || (response as any).error || 'Payment failed';
      }
    } catch (error: any) {
      this.manualPaymentSuccess = false;
      this.manualPaymentError = error.message || 'Payment failed';
      this.logService.addStep({
        actionName: 'payWithManualCard',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.manualPaymentLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  async registerAndPurchase(cardNumber: string) {
    const flowState = this.flowRunner.getFlowState();
    const sessionId = this.sessionId ?? flowState.sessionId;
    const userPhone = this.userPhone || flowState.userPhone;
    const userId = this.userId || flowState.userId;

    if (!sessionId) {
      this.manualPaymentError = 'SessionId not found';
      return;
    }
    if (!userPhone) {
      this.manualPaymentError = 'UserPhone not found';
      return;
    }
    if (!userId?.trim()) {
      this.manualPaymentError = 'UserId not found';
      return;
    }

    try {
      // Prepare registerAndPurchase request payload
      const requestPayload: any = {
        sessionId: sessionId,
        accountKey: userPhone,
        accountKeyType: 'Msisdn',
        merchantUserId: userId.trim(),
        paymentDetail: {
          amount: this.paymentAmount,
          currencyId: 1,
          merchantUniqueCode: 'MERCHANT-' + Date.now(),
          trackingCode: this.trackingCode,
          successUrl: 'https://merchant.com/success',
          failUrl: 'https://merchant.com/fail',
          clientIp: '192.168.1.1',
          installment: 1
        },
        cardData: {
          cardNumber: cardNumber,
          cardHolderName: this.manualCardForm.cardHolderName,
          expiryDate: this.manualCardForm.expiryMonth + this.manualCardForm.expiryYear,
          cvv: this.manualCardForm.cvv,
          cardAlias: this.manualCardForm.cardAlias.trim()
        },
        products: this.products.map(p => ({
          productId: p.productId || p.productCode,
          productName: p.productName,
          productAmount: p.productAmount || p.totalPrice || 0,
          productCategory: undefined,
          productDescription: undefined
        })),
        force3D: this.force3D,
        customer: {
          fullName: this.customerForm.fullName,
          phone: this.customerForm.phone,
          email: this.customerForm.email,
          identityNumber: this.customerForm.identityNumber
        }
      };

      this.logService.addStep({
        actionName: 'registerAndPurchase',
        request: this.logService.maskSensitiveData(requestPayload)
      });

      // Call SDK - registerAndPurchase
      const response = await PaywallJsSdk.payment['registerAndPurchase'](requestPayload);
      this.manualPaymentResponse = response;

      const maskedResponse = this.logService.maskSensitiveData(response);
      const normalized = this.logService.normalizeResponse(response);

      this.logService.addStep({
        actionName: 'registerAndPurchase',
        response: maskedResponse,
        normalizedResult: normalized
      });

      // Handle response
      // Extract result and responseCode (Masterpass SDK format)
      // Response format can be: response.result OR response.data.result OR response.data
      const responseAny = response as any;
      const result = responseAny.result || responseAny.data?.result || responseAny.data;
      const responseCode = result?.responseCode || responseAny.data?.providerMeta?.responseCode || responseAny.providerMeta?.responseCode;
      const statusCode = responseAny.statusCode || responseAny.data?.statusCode;
      const has3DUrl = result?.url3d || responseAny.data?.redirectUrl;
      const otpToken = result?.token || responseAny.data?.token || responseAny.token;

      // Debug: Log response structure
      console.log('[registerAndPurchase] Response structure:', {
        hasResult: !!result,
        responseCode: responseCode,
        statusCode: statusCode,
        hasOtpToken: !!otpToken,
        has3DUrl: !!has3DUrl,
        responseKeys: Object.keys(responseAny),
        resultKeys: result ? Object.keys(result) : null
      });

      // Check OTP requirement first (5010 for payment)
      // OTP can come from: result.responseCode OR statusCode 202 with responseCode 5010
      if ((responseCode === '5010' || (statusCode === 202 && result?.responseCode === '5010')) && otpToken) {
        // Set OTP blocking state
        this.flowRunner.updateFlowState({
          awaitingOtp: true,
          pendingAction: 'registerAndPurchase' as any,
          otpToken: otpToken
        });

        // Open OTP popup
        this.flowRunner.otpRequired$.next({
          title: 'Bank OTP Required',
          message: result?.description || responseAny.data?.message || responseAny.message || 'Please enter OTP code sent to your phone'
        });

        this.manualPaymentLoading = false;
        this.loadLogs();
        this.updateCurrentState();
        return; // STOP - no auto-retry, wait for OTP verification
      }

      // Check SDK response format
      if (response.success && response.data) {
        const data = response.data;

        if (data.status === 'SUCCESS') {
          // Payment and card registration successful
          this.manualPaymentSuccess = true;
          this.manualPaymentError = null;
        } else if (data.status === 'ACTION_REQUIRED') {
          if (data.actionType === '3D') {
            // 3D Secure required
            this.manualPaymentError = '3D Secure required. URL: ' + (data.redirectUrl || 'N/A');
            // Note: In a real application, you would redirect to data.redirectUrl
          } else if (data.actionType === 'BANK_OTP') {
            // OTP verification required (already handled above, but keep for compatibility)
            if (otpToken) {
              this.flowRunner.updateFlowState({
                awaitingOtp: true,
                pendingAction: 'registerAndPurchase' as any,
                otpToken: otpToken
              });

              this.flowRunner.otpRequired$.next({
                title: 'Bank OTP Required',
                message: data.message || 'Please enter OTP code sent to your phone'
              });

              this.manualPaymentLoading = false;
              this.loadLogs();
              this.updateCurrentState();
              return;
            }
          }
        } else {
          // Payment failed
          this.manualPaymentSuccess = false;
          this.manualPaymentError = data.message || response.message || 'Payment failed';
        }
      } else if (statusCode === 202 && responseCode === '5010') {
        // Masterpass response format: statusCode 202 with responseCode 5010 means OTP required
        // This should have been handled above, but keep as fallback
        if (otpToken) {
          this.flowRunner.updateFlowState({
            awaitingOtp: true,
            pendingAction: 'registerAndPurchase' as any,
            otpToken: otpToken
          });

          this.flowRunner.otpRequired$.next({
            title: 'Bank OTP Required',
            message: result?.description || 'Please enter OTP code sent to your phone'
          });

          this.manualPaymentLoading = false;
          this.loadLogs();
          this.updateCurrentState();
          return;
        }
      } else if (statusCode === 202 && has3DUrl) {
        // 3D Secure required (after OTP or directly)
        this.manualPaymentError = '3D Secure required. URL: ' + (result?.url3d || 'N/A');
      } else if (statusCode === 202) {
        // Success (202 Accepted)
        this.manualPaymentSuccess = true;
        this.manualPaymentError = null;
      } else {
        // Request failed
        this.manualPaymentSuccess = false;
        this.manualPaymentError = response.message || result?.description || 'Payment failed';
      }
    } catch (error: any) {
      this.manualPaymentSuccess = false;
      this.manualPaymentError = error.message || 'Payment failed';
      this.logService.addStep({
        actionName: 'registerAndPurchase',
        error: error.message || 'Unknown error'
      });
    } finally {
      this.manualPaymentLoading = false;
      this.loadLogs();
      this.updateCurrentState();
    }
  }

  // ========== DEBUG PANEL ==========

  loadLogs() {
    this.logs = this.logService.getLogs();
  }

  updateCurrentState() {
    const state = this.flowRunner.getFlowState();
    this.currentState = {
      currentToken: state.currentToken ? this.logService.maskSensitiveData({ token: state.currentToken }).token : undefined,
      sessionId: state.sessionId,
      providerInitialized: state.providerInitialized,
      linkedState: state.linkedState,
      cardCount: state.cardCount,
      environment: state.environment,
      userId: state.userId,
      userPhone: state.userPhone
    };
  }

  // ========== PRODUCT MANAGEMENT ==========

  calculateProductTotal(): number {
    return this.products.reduce((sum, p) => sum + (p.productAmount || p.totalPrice || 0), 0);
  }

  updateProductTotal(index: number) {
    const product = this.products[index];
    if (product.price && product.quantity) {
      product.totalPrice = product.price * product.quantity;
      product.productAmount = product.totalPrice; // Sync productAmount with totalPrice
      product.vatAmount = product.totalPrice * ((product.vatRate || 0) / 100);
    } else if (product.productAmount) {
      product.totalPrice = product.productAmount;
    } else {
      product.totalPrice = 0;
      product.productAmount = 0;
      product.vatAmount = 0;
    }
    // Update payment amount to match product total
    this.paymentAmount = this.calculateProductTotal();
  }

  addProduct() {
    this.products.push({
      productId: 'PRODUCT-' + (this.products.length + 1),
      productCode: 'PRODUCT-' + (this.products.length + 1),
      productName: 'New Product',
      quantity: 1,
      price: 0,
      totalPrice: 0,
      productAmount: 0,
      vatRate: 0,
      vatAmount: 0
    });
    this.updateProductTotal(this.products.length - 1);
  }

  removeProduct(index: number) {
    this.products.splice(index, 1);
    this.paymentAmount = this.calculateProductTotal();
  }

  updatePaymentAmountFromProducts() {
    this.paymentAmount = this.calculateProductTotal();
  }

  async copyLogs() {
    await this.logService.copyLogsAsJson();
  }

  clearLogs() {
    this.logService.clearLogs();
    this.loadLogs();
  }

  toggleResponseExpanded(key: string) {
    // If key already ends with 'Expanded', use it as is, otherwise append 'Expanded'
    const expandedKey = key.endsWith('Expanded') ? key : key + 'Expanded';
    const currentValue = (this as any)[expandedKey];
    (this as any)[expandedKey] = !currentValue;
  }

  // Generate numeric reference number for SDK requests
  generateNumericReference(length: number = 12): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  }
}
