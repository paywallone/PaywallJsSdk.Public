import { Component, OnInit } from '@angular/core';

const PaywallJsSdk = window.PaywallJsSdk;

@Component({
  selector: 'app-sdk-test',
  standalone: false,
  templateUrl: './sdk-test.component.html',
  styleUrl: './sdk-test.component.scss'
})
export class SdkTestComponent implements OnInit {
  currentStep: 'NOT_INITIALIZED' | 'CORE_INIT' | 'SESSION_STARTED' | 'PROVIDER_INIT' | 'PAYMENT_INIT' | 'COMPLETED' = 'NOT_INITIALIZED';

  coreInitSuccess: boolean = false;
  sessionStarted: boolean = false;
  providerInitSuccess: boolean = false;
  paymentInitSuccess: boolean = false;

  coreInitError: string | null = null;
  sessionError: string | null = null;
  providerInitError: string | null = null;
  addCardError: string | null = null;
  paymentError: string | null = null;

  environment: 'dev' | 'test' | 'prod' = 'dev';
  accessToken: string = '';

  sessionForm = {
    referenceCode: 'REF-' + Date.now(),
    userId: '',
    userPhone: '',
    force3D: false
  };
  sessionData: any = null;

  paymentForm = {
    amount: 100,
    currencyId: 1,
    merchantUniqueCode: 'MERCHANT-' + Date.now(),
    trackingCode: 'TRACK-' + Date.now(),
    successUrl: 'https://merchant.com/success',
    failUrl: 'https://merchant.com/success',
    clientIp: '192.168.1.1',
    installment: 1,
    channelId: undefined as number | undefined,
    tagId: undefined as number | undefined
  };

  cardType: 'manual' | 'saved' = 'manual';
  shouldSaveCard: boolean = false;
  cardAlias: string = '';
  cardAliasInput: string = '';
  cardForm = {
    cardAlias: '',
    cardBin: '',
    cardMasked: '',
    cardNumber: '',
    expiryMonth: '12',
    expiryYear: '26',
    cvv: '',
    cardHolderName: ''
  };

  customerForm = {
    fullName: '',
    phone: '',
    email: '',
    identityNumber: ''
  };

  products: Array<{
    productId: string;
    productName: string;
    productAmount: number;
  }> = [
    {
      productId: 'PROD-001',
      productName: 'Test Product',
      productAmount: 100
    }
  ];

  coreInitResponse: any = null;
  sessionResponse: any = null;
  providerInitResponse: any = null;
  addCardResponse: any = null;
  paymentInitResponse: any = null;

  paymentStatus: 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED' = 'IDLE';
  paymentMessage: string = '';

  logs: string[] = [];

  constructor() {}

  ngOnInit() {
    this.log('Application started. Ready for token input.');
  }

  /**
   * Step 1: SDK + Session Init
   * PaywallJsSdk.InitPaywallSdk() - SDK + Session initialization
   */
  async initCoreSdk() {
    if (!this.accessToken || this.accessToken.trim() === '') {
      this.coreInitError = 'Token is required';
      this.log('ERROR: Token is required');
      return;
    }

    try {
      this.log('--- STEP 1: SDK + SESSION INIT ---');
      this.log('Environment: ' + this.environment);
      this.log('Token: ' + this.maskToken(this.accessToken));

      // Call SDK -Init with session (InitPaywallSdk - büyük I)
      const sdk = PaywallJsSdk as any;
      let response;
      if (typeof sdk['InitPaywallSdk'] === 'function') {
        response = await sdk['InitPaywallSdk']({
          environment: this.environment,
          token: this.accessToken,
          includeMasterpassSession: true
        });
      } else if (typeof sdk['InitAutomatic'] === 'function') {
        response = await sdk['InitAutomatic']({
          environment: this.environment,
          token: this.accessToken,
          includeMasterpassSession: true
        });
      } else {
        throw new Error('SDK metodu bulunamadı');
      }

      this.coreInitResponse = response;

      // Check SDK response
      if (response.success === true && response.data?.sdkInitialized === true) {
        this.coreInitSuccess = true;
        this.currentStep = 'CORE_INIT';
        this.coreInitError = null;
        this.log('✓ Core SDK initialized successfully');
      } else {
        this.coreInitSuccess = false;
        this.coreInitError = response.message || 'Core SDK initialization failed';
        this.log('✗ Core SDK init failed: ' + this.coreInitError);
        return;
      }
    } catch (e: any) {
      this.coreInitSuccess = false;
      this.coreInitError = e.message || 'Core SDK initialization failed';
      this.log('✗ CORE INIT ERROR');
      this.log(e);
    }
  }

  /**
   * Step 2: Session Start - REMOVED
   * startSession() is no longer available - session is now included in InitPaywallSdk
   */
  async startSession() {
    this.sessionError = 'startSession is deprecated - session is now included in InitPaywallSdk';
    this.log('ERROR: startSession is deprecated - session is now included in InitPaywallSdk');
    return;
  }

  /**
   * Step 3: Masterpass Provider Init
   * PaywallJsSdk.providers.masterpass.init()
   * Session'dan SONRA çağrılır, parametresiz (session state'inden alır)
   */
  async initMasterpassProvider() {
    if (!this.coreInitSuccess) {
      this.providerInitError = 'Core SDK must be initialized first';
      this.log('ERROR: Core SDK must be initialized first');
      return;
    }

    if (!this.sessionStarted) {
      this.providerInitError = 'Session must be started first';
      this.log('ERROR: Session must be started first');
      return;
    }

    try {
      this.log('--- STEP 3: MASTERPASS PROVIDER INIT ---');

      // Call SDK - Provider init (parametresiz, session state'inden otomatik alır token ve merchantId'yi)
      // SDK session state'inden MasterpassToken ve MasterpassMerchantId'yi otomatik alır
      const response = await PaywallJsSdk.providers.masterpass.init();

      this.providerInitResponse = response;

      // Check SDK response
      if (response.success === true && response.data?.masterpassSdkInitialized === true) {
        this.providerInitSuccess = true;
        this.currentStep = 'PROVIDER_INIT';
        this.providerInitError = null;
        this.log('✓ Masterpass provider initialized successfully');
      } else {
        this.providerInitSuccess = false;
        this.providerInitError = response.message || 'Provider initialization failed';
        this.log('✗ Provider init failed: ' + this.providerInitError);
      }
    } catch (e: any) {
      this.providerInitSuccess = false;
      this.providerInitError = e.message || 'Provider initialization failed';
      this.log('✗ PROVIDER INIT ERROR');
      this.log(e);
    }
  }

  /**
   * Add Card to Masterpass (Payment Init'ten ÖNCE)
   * PaywallJsSdk.providers.masterpass.addCard()
   * Eğer "Kartı Masterpass'e Kaydet" seçiliyse, payment init'ten önce çağrılır
   */
  async addCard() {
    if (!this.providerInitSuccess) {
      this.addCardError = 'Masterpass Provider must be initialized first';
      this.log('ERROR: Masterpass Provider must be initialized first');
      return;
    }

    if (!this.sessionStarted || !this.sessionData) {
      this.addCardError = 'Session must be started first';
      this.log('ERROR: Session must be started first');
      return;
    }

    if (this.cardType === 'saved') {
      this.addCardError = 'Cannot add card: Already using saved card';
      this.log('ERROR: Cannot add card: Already using saved card');
      return;
    }

    // Validate required fields
    const cardNumber = this.cardForm.cardNumber.replace(/\s/g, '');
    if (!cardNumber || !this.cardForm.cardHolderName || !this.cardForm.expiryMonth || !this.cardForm.expiryYear || !this.cardForm.cvv) {
      this.addCardError = 'All card fields are required for Add Card';
      this.log('ERROR: All card fields are required for Add Card');
      return;
    }

    if (!this.sessionForm.userId) {
      this.addCardError = 'Session UserId is required for Add Card';
      this.log('ERROR: Session UserId is required for Add Card');
      return;
    }

    if (!this.customerForm.phone) {
      this.addCardError = 'Customer Phone is required for Add Card';
      this.log('ERROR: Customer Phone is required for Add Card');
      return;
    }

    const sessionDataAny = this.sessionData as any;
    const masterpassToken = sessionDataAny.masterpassToken;
    if (!masterpassToken) {
      this.addCardError = 'MasterpassToken not found in session response';
      this.log('ERROR: MasterpassToken not found in session response');
      return;
    }

    try {
      this.log('--- ADD CARD TO MASTERPASS ---');
      this.addCardError = null;

      // Prepare Add Card request payload (SDK contract)
      const addCardParams: any = {
        token: masterpassToken,
        userId: this.sessionForm.userId, // Session'da başlatılan userId
        accountKey: this.customerForm.phone,
        accountKeyType: 'Msisdn',
        requestReferenceNumber: this.generateNumericReference(),
        cardHolderName: this.cardForm.cardHolderName,
        cardNumber: cardNumber,
        expiryDate: this.cardForm.expiryMonth + this.cardForm.expiryYear,
        cvv: this.cardForm.cvv
      };

      // Add accountAliasName only if provided (optional field)
      if (this.cardAliasInput && this.cardAliasInput.trim()) {
        addCardParams.accountAliasName = this.cardAliasInput.trim();
      }

      // Log request payload (masked for security)
      const maskedPayload = {
        ...addCardParams,
        cardNumber: this.maskCardNumber(addCardParams.cardNumber),
        cvv: '***',
        token: this.maskToken(addCardParams.token)
      };
      this.log('--- ADD CARD REQUEST (MASKED) ---');
      this.log(JSON.stringify(maskedPayload, null, 2));

      // Call SDK - Add Card
      const response = await PaywallJsSdk.providers.masterpass.addCard(addCardParams);

      this.addCardResponse = response;

      // Log full SDK response
      this.log('--- ADD CARD RESPONSE (FULL) ---');
      this.log(JSON.stringify(response, null, 2));

      // Extract cardAlias from SDK response
      const responseAny = response as any;
      const cardAliasValue = responseAny.data?.cardAlias || responseAny.cardAlias;
      const isSuccess = responseAny.success === true || responseAny.status === 'SUCCESS';

      if (isSuccess && cardAliasValue) {
        this.cardAlias = cardAliasValue;
        this.log('✓ Card added successfully');
        this.log('CardAlias: ' + cardAliasValue);
        this.addCardError = null;
      } else {
        this.addCardError = responseAny.message || responseAny.errorMessage || 'Add Card failed';
        this.cardAlias = '';
        this.log('✗ Add Card failed: ' + this.addCardError);
      }
    } catch (e: any) {
      this.addCardError = e.message || 'Add Card failed';
      this.cardAlias = '';
      this.log('✗ ADD CARD ERROR');
      this.log(e);
    }
  }

  /**
   * Generate numeric reference number for Add Card request
   */
  generateNumericReference(length: number = 12): string {
    let result = '';
    const digits = '0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      result += digits[randomIndex];
    }

    return result;
  }

  /**
   * Step 4: Payment Init
   * PaywallJsSdk.payment.init() - Minimal params, SDK handles everything
   * Eğer shouldSaveCard=true ve cardAlias yoksa, önce addCard çağrılır
   */
  async initPayment() {
    if (!this.coreInitSuccess) {
      this.paymentError = 'Core SDK must be initialized first';
      this.log('ERROR: Core SDK must be initialized first');
      return;
    }

    if (!this.sessionStarted) {
      this.paymentError = 'Session must be started first';
      this.log('ERROR: Session must be started first');
      return;
    }

    if (!this.providerInitSuccess) {
      this.paymentError = 'Provider must be initialized first';
      this.log('ERROR: Provider must be initialized first');
      return;
    }

    // Eğer "Kartı Masterpass'e Kaydet" seçiliyse ve cardAlias yoksa, önce addCard çağrılır
    if (this.shouldSaveCard && !this.cardAlias && this.cardType === 'manual') {
      this.log('--- ADD CARD (before payment) ---');
      await this.addCard();

      // Eğer addCard başarısız olduysa, ödeme akışına devam etme
      if (!this.cardAlias) {
        this.paymentError = 'Add Card failed. Cannot proceed with payment.';
        this.log('ERROR: Add Card failed. Payment cancelled.');
        return;
      }
    }

    try {
      this.paymentStatus = 'PROCESSING';
      this.log('--- STEP 4: PAYMENT INIT ---');

      // Merchant collects user input - NO processing, NO mapping
      const cardNumber = this.cardForm.cardNumber.replace(/\s/g, '');

      // Eğer cardAlias varsa (addCard sonrası), REGISTERED_CARD kullan
      // Eğer cardAlias yoksa, cardType'a göre karar ver
      const hasCardAlias = this.cardAlias || (this.cardType === 'saved' && this.cardForm.cardAlias);
      const finalCardAlias = this.cardAlias || this.cardForm.cardAlias;
      const isSavedCard = this.cardType === 'saved' && this.cardForm.cardAlias;

      // Minimal params - SDK handles cardBin, cardMasked, ownerName mapping
      const paymentInitParams: any = {
        sessionId: this.sessionData.sessionId,
        paymentSource: hasCardAlias ? 'REGISTERED_CARD' : 'MANUAL_CARD',
        paymentDetail: {
          amount: this.paymentForm.amount,
          currencyId: this.paymentForm.currencyId,
          merchantUniqueCode: this.paymentForm.merchantUniqueCode,
          trackingCode: this.paymentForm.trackingCode,
          successUrl: this.paymentForm.successUrl,
          failUrl: this.paymentForm.failUrl,
          clientIp: this.paymentForm.clientIp,
          installment: this.paymentForm.installment,
          channelId: this.paymentForm.channelId,
          tagId: this.paymentForm.tagId
        },
        // card objesi: Paywall'a gönderilecek masked bilgiler (cardBin, cardMasked, ownerName)
        // Saved card için: ownerName = alias, cardBin ve cardMasked form'dan alınır
        card: hasCardAlias
          ? {
              ownerName: finalCardAlias, // Kayıtlı kart için alias, Holder Name olarak gönderilir
              ...(isSavedCard && this.cardForm.cardBin && { cardBin: this.cardForm.cardBin }),
              ...(isSavedCard && this.cardForm.cardMasked && { cardMasked: this.cardForm.cardMasked })
            }
          : undefined,
        // cardData objesi: Masterpass'e gönderilecek hassas bilgiler (cardNumber, cvv, expiryDate)
        // Kayıtlı kart için CVV SDK tarafından otomatik "" olarak gönderilir
        cardData: hasCardAlias
          ? {
              cardAlias: finalCardAlias
            }
          : {
              cardNumber: cardNumber,
              ownerName: this.cardForm.cardHolderName,
              expiryDate: this.cardForm.expiryMonth + this.cardForm.expiryYear,
              cvv: this.cardForm.cvv
            },
        customer: {
          fullName: this.customerForm.fullName,
          phone: this.customerForm.phone,
          email: this.customerForm.email,
          identityNumber: this.customerForm.identityNumber
        },
        products: this.products
      };

      // Call SDK - SDK handles everything
      const response = await PaywallJsSdk.payment.init(paymentInitParams);

      this.paymentInitResponse = response;
      this.currentStep = 'PAYMENT_INIT';

      // Log full SDK response
      this.log('--- SDK RESPONSE ---');
      this.log(JSON.stringify(response, null, 2));

      // Process SDK response (merchant behavior)
      this.processPaymentResponse(response);

    } catch (e: any) {
      this.paymentStatus = 'FAILED';
      this.paymentError = e.message || 'Payment initialization failed';
      this.log('✗ PAYMENT INIT ERROR');
      this.log(e);
    }
  }

  /**
   * Process Payment Response
   * Merchant reads SDK response and makes UI decisions
   * NO business logic, NO responseCode interpretation
   */
  processPaymentResponse(result: any) {
    // Merchant ONLY checks status field
    if (result.status === 'SUCCESS') {
      this.paymentStatus = 'SUCCESS';
      this.paymentInitSuccess = true;
      this.currentStep = 'COMPLETED';
      this.paymentMessage = 'Ödeme başarılı';
      this.log('✓ Payment successful');
    } else if (result.status === 'ACTION_REQUIRED') {
      this.paymentStatus = 'ACTION_REQUIRED';
      this.paymentInitSuccess = false;

      if (result.actionType === '3D' || result.actionType === 'THREE_D') {
        this.paymentMessage = '3D Secure yönlendirme gerekli';
        this.log('⚠ 3D Secure redirect required');
        this.log('Redirect URL: ' + (result.redirectUrl || 'N/A'));
      } else if (result.actionType === 'BANK_OTP') {
        this.paymentMessage = 'Banka OTP doğrulaması gerekli. Backend üzerinden doğrulayın.';
        this.log('⚠ Bank OTP verification required');
      } else {
        this.paymentMessage = 'Ek işlem gerekli: ' + (result.actionType || 'UNKNOWN');
        this.log('⚠ Action required: ' + result.actionType);
      }
    } else if (result.status === 'FAILED') {
      this.paymentStatus = 'FAILED';
      this.paymentInitSuccess = false;
      this.paymentMessage = result.message || result.errorMessage || 'Ödeme başarısız';
      this.log('✗ Payment failed');
      this.log('Error: ' + (result.message || result.errorMessage || 'Unknown error'));
    } else {
      // Unknown status - just display what SDK returned
      this.paymentStatus = 'IDLE';
      this.paymentMessage = 'SDK Response: ' + JSON.stringify(result.status || result);
      this.log('? Unknown SDK response status');
    }
  }

  /**
   * Redirect to 3D Page
   * Merchant explicitly calls this when SDK returns 3D redirect URL
   */
  redirectTo3D() {
    if (this.paymentInitResponse && this.paymentInitResponse.redirectUrl) {
      window.location.href = this.paymentInitResponse.redirectUrl;
    }
  }

  /**
   * On Access Token Change
   */
  onTokenChange() {
    if (this.accessToken.trim() && this.coreInitError === 'Token is required') {
      this.coreInitError = null;
    }
  }

  /**
   * Add Product
   */
  addProduct() {
    this.products.push({
      productId: 'PROD-' + (this.products.length + 1),
      productName: '',
      productAmount: 0
    });
  }

  /**
   * Remove Product
   */
  removeProduct(index: number) {
    if (this.products.length > 1) {
      this.products.splice(index, 1);
    }
  }

  /**
   * Utility: Log message
   */
  log(message: any) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${typeof message === 'string' ? message : JSON.stringify(message, null, 2)}`;
    this.logs.push(logEntry);
  }

  /**
   * Utility: Mask token
   */
  maskToken(token: string): string {
    if (!token || token.length < 8) return '***';
    return token.substring(0, 4) + '***' + token.substring(token.length - 4);
  }

  /**
   * Utility: Mask card number
   */
  maskCardNumber(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 8) return '****';
    if (cardNumber.length >= 16) {
      return cardNumber.substring(0, 4) + ' **** **** ' + cardNumber.substring(cardNumber.length - 4);
    }
    return cardNumber.substring(0, 4) + '***' + cardNumber.substring(cardNumber.length - 4);
  }

  /**
   * On Should Save Card Change
   * Checkbox kapatıldığında cardAlias'ı temizle
   */
  onShouldSaveCardChange() {
    if (!this.shouldSaveCard) {
      this.cardAlias = '';
      this.addCardResponse = null;
      this.addCardError = null;
      this.cardAliasInput = '';
    }
  }

  /**
   * On Card Type Change
   * Card type değiştiğinde cardAlias'ı temizle
   */
  onCardTypeChange() {
    if (this.cardType === 'saved') {
      this.shouldSaveCard = false;
      this.cardAlias = '';
      this.addCardResponse = null;
      this.addCardError = null;
    }
  }
}
