# Paywall JavaScript SDK

Paywall ödeme altyapısı için JavaScript SDK. Tarayıcıda direkt kullanım için UMD formatında hazırlanmıştır.

## Kurulum

### 1. SDK Dosyasını İndirin

SDK dosyasını `public-sdk/` klasöründen indirin:
```
public-sdk/paywall-jssdk.1.0.4.umd.js
```

### 2. HTML Sayfanıza Ekleyin

```html
<!DOCTYPE html>
<html>
<head>
  <title>Paywall SDK Example</title>
</head>
<body>
  <script src="paywall-jssdk.1.0.4.umd.js"></script>
  <script>
    if (window.PaywallSDK && window.PaywallSDK.PaywallJsSdk) {
      window.PaywallJsSdk = window.PaywallSDK.PaywallJsSdk;
    }
  </script>
</body>
</html>
```

## Kullanım Adımları

### Adım 1: Geçici Token Alın

Backend API'nizden geçici bir access token alın. Bu token, SDK'nın Paywall API ile iletişim kurması için gereklidir.

```javascript
async function getTempToken() {
  const response = await fetch('https://your-backend.com/api/auth/temp-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      merchantId: 'YOUR_MERCHANT_ID'
    })
  });
  
  const data = await response.json();
  return data.token;
}
```

### Adım 2: Paywall SDK'yı Initialize Edin

Token'ı aldıktan sonra SDK'yı initialize edin:

```javascript
async function initializeSDK() {
  const tempToken = await getTempToken();
  
  const response = await PaywallJsSdk.Init({
    merchantId: 'YOUR_MERCHANT_ID',
    token: tempToken,
    environment: 'prod'
  });
  
  if (response.success && response.data?.sdkInitialized) {
    console.log('SDK initialized successfully');
    return true;
  } else {
    console.error('SDK initialization failed:', response.message);
    return false;
  }
}
```

### Adım 3: Masterpass Session Başlatın

SDK initialize edildikten sonra, Masterpass session'ı başlatın:

```javascript
async function startMasterpassSession() {
  const response = await PaywallJsSdk.ExternalService.Masterpass.startSession({
    referenceCode: 'REF-' + Date.now(),
    userId: 'user123',
    userPhone: '5551234567',
    force3D: false
  });
  
  if (response.success) {
    console.log('Session started:', response.data);
    return response.data;
  } else {
    console.error('Session start failed:', response.message);
    return null;
  }
}
```

### Adım 4: Masterpass Provider'ı Initialize Edin

Session başarıyla başlatıldıktan sonra, Masterpass provider'ı initialize edin:

```javascript
async function initMasterpassProvider() {
  const response = await PaywallJsSdk.providers.masterpass.init({
    accountKey: 'user123'
  });
  
  if (response.success) {
    console.log('Masterpass provider initialized');
    return true;
  } else {
    console.error('Provider init failed:', response.message);
    return false;
  }
}
```

### Adım 5: Ödeme İşlemini Başlatın

Tüm adımlar tamamlandıktan sonra ödeme işlemini başlatabilirsiniz:

```javascript
async function startPayment() {
  const response = await PaywallJsSdk.payment.init({
    amount: 100.00,
    currencyId: 1,
    merchantUniqueCode: 'ORDER-' + Date.now(),
    trackingCode: 'TRACK-' + Date.now(),
    successUrl: 'https://yoursite.com/success',
    failUrl: 'https://yoursite.com/fail',
    clientIp: '192.168.1.1',
    installment: 1
  });
  
  if (response.status === 'SUCCESS') {
    console.log('Payment successful:', response.data);
  } else if (response.status === 'ACTION_REQUIRED') {
    if (response.actionType === '3D' && response.redirectUrl) {
      window.location.href = response.redirectUrl;
    } else if (response.actionType === 'MASTERPASS_OTP_REQUIRED') {
      const otp = prompt('Enter OTP:');
      await PaywallJsSdk.providers.masterpass.verifyOtp({ otpCode: otp });
    }
  } else {
    console.error('Payment failed:', response.message);
  }
}
```

## Tam Örnek

```javascript
async function completePaymentFlow() {
  try {
    const tempToken = await getTempToken();
    
    const initResponse = await PaywallJsSdk.Init({
      merchantId: 'YOUR_MERCHANT_ID',
      token: tempToken,
      environment: 'prod'
    });
    
    if (!initResponse.success) {
      throw new Error('SDK initialization failed');
    }
    
    const sessionResponse = await PaywallJsSdk.ExternalService.Masterpass.startSession({
      referenceCode: 'REF-' + Date.now(),
      userId: 'user123',
      userPhone: '5551234567'
    });
    
    if (!sessionResponse.success) {
      throw new Error('Session start failed');
    }
    
    const providerResponse = await PaywallJsSdk.providers.masterpass.init({
      accountKey: 'user123'
    });
    
    if (!providerResponse.success) {
      throw new Error('Provider init failed');
    }
    
    const paymentResponse = await PaywallJsSdk.payment.init({
      amount: 100.00,
      currencyId: 1,
      merchantUniqueCode: 'ORDER-' + Date.now(),
      trackingCode: 'TRACK-' + Date.now(),
      successUrl: 'https://yoursite.com/success',
      failUrl: 'https://yoursite.com/fail',
      clientIp: '192.168.1.1',
      installment: 1
    });
    
    if (paymentResponse.status === 'ACTION_REQUIRED' && paymentResponse.redirectUrl) {
      window.location.href = paymentResponse.redirectUrl;
    } else if (paymentResponse.status === 'SUCCESS') {
      console.log('Payment completed successfully');
    }
    
  } catch (error) {
    console.error('Payment flow error:', error);
  }
}
```

## API Referansı

### PaywallJsSdk.Init(params)
SDK'yı initialize eder.

**Parametreler:**
- `merchantId` (string): Merchant ID
- `token` (string): Geçici access token
- `environment` (string): 'dev' | 'test' | 'prod'

### PaywallJsSdk.ExternalService.Masterpass.startSession(params)
Masterpass session başlatır.

**Parametreler:**
- `referenceCode` (string): Benzersiz referans kodu
- `userId` (string): Kullanıcı ID
- `userPhone` (string): Kullanıcı telefon numarası
- `force3D` (boolean): 3D zorunlu mu?

### PaywallJsSdk.providers.masterpass.init(params)
Masterpass provider'ı initialize eder.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key

### PaywallJsSdk.payment.init(params)
Ödeme işlemini başlatır.

**Parametreler:**
- `amount` (number): Ödeme tutarı
- `currencyId` (number): Para birimi ID
- `merchantUniqueCode` (string): Benzersiz sipariş kodu
- `trackingCode` (string): Takip kodu
- `successUrl` (string): Başarı URL'i
- `failUrl` (string): Hata URL'i
- `clientIp` (string): İstemci IP adresi
- `installment` (number): Taksit sayısı

## Response Formatları

### Başarılı Response
```javascript
{
  success: true,
  status: 'SUCCESS',
  data: { ... }
}
```

### Action Required Response
```javascript
{
  success: false,
  status: 'ACTION_REQUIRED',
  actionType: '3D' | 'MASTERPASS_OTP_REQUIRED' | 'MERCHANT_LINK_REQUIRED',
  redirectUrl: 'https://...',
  data: { ... }
}
```

### Hata Response
```javascript
{
  success: false,
  status: 'FAILED' | 'ERROR',
  message: 'Error message',
  errorMessage: 'Detailed error'
}
```

## Environment'lar

- `dev`: Development environment
- `test`: Test environment  
- `prod`: Production environment

## Notlar

- SDK global olarak `window.PaywallJsSdk` üzerinden erişilebilir
- Tüm API çağrıları Promise döner
- Action required durumlarında kullanıcı etkileşimi gerekebilir
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
