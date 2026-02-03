## Tanıtım

Bu repository iki ana bileşenden oluşmaktadır:

- **public-sdk**: Paywall JavaScript SDK'nın dağıtım dosyasını içerir. Merchant'lar bu klasörden SDK dosyasını indirerek kendi projelerinde kullanabilirler.

- **paywall-sdk-test**: Paywall SDK'nın kullanımını gösteren örnek bir Angular test projesidir. SDK'nın nasıl entegre edileceğini ve kullanılacağını gösterir.

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

Paywall API'nize istek atarak geçici bir access token alın. Bu token, SDK'nın Paywall API ile iletişim kurması için gereklidir.

**Not:** Bu fonksiyon örnek amaçlıdır. Merchant'lar kendi backend yapılarına göre bu fonksiyonu tamamen değiştirebilirler. Önemli olan, Paywall API'den geçerli bir token alınmasıdır.

Detaylı bilgi için: [Paywall Yetkilendirme Dokümantasyonu](https://developer.paywall.one/client-side-servisler/yetkilendirme)

```javascript
async function getTempToken() {
  const response = await fetch('https://dev-payment-api.itspaywall.com/api/auth/temp-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ClientCardSave": true,
      "ThreeDSession": false,
      "ClientSdk": true,
      "ScopeBased": false,
      "Scope": 0,
      "ExpiryMin": 1440
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
  
  const response = await PaywallJsSdk.InitManual({
    token: tempToken,
    environment: 'dev'
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

### Adım 3: İki Yöntemden Birini Seçin

#### **Yöntem A: InitAutomatic (Önerilen)**

**📚 Dokümantasyon:** https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk

Backend'de Masterpass session oluşturup token içine ekleyin, SDK otomatik parse etsin:

```javascript
async function initWithAutomatic() {
  // Merchant backend'den token al (içinde session bilgileri var)
  const tokenWithSession = await getTokenWithSessionFromBackend();
  
  const result = await PaywallJsSdk.InitAutomatic({
    environment: 'dev',
    token: tokenWithSession,
    includeMasterpassSession: true
  });
  
  if (result.success) {
    // Session bilgileri otomatik gelir
    const sessionId = result.data.body.Masterpass.SessionId;
    console.log('SDK + Session ready:', sessionId);
    return result;
  }
}
```

#### **Yöntem B: InitManual (Manuel)**

**📚 Dokümantasyon:** https://developer.paywall.one/client-side-servisler/1.-yetkilendirme

Merchant backend'de session oluşturun, SDK'ya sadece token verin:

```javascript
async function initManually() {
  // 1. Merchant backend'de Masterpass session oluştur
  const sessionData = await createSessionOnBackend();
  
  // 2. SDK'yı başlat (session bilgisi olmadan)
  await PaywallJsSdk.InitManual({
    environment: 'dev',
    token: await getTokenFromBackend()
  });
  
  // 3. SessionId'yi manuel kullan
  const sessionId = sessionData.sessionId;
  return { sessionId };
}
```

**⚠️ Önemli:** SDK'nın `startSession()` metodu kaldırılmıştır. Session oluşturma artık **sadece merchant backend** tarafından yapılmalıdır.

### Adım 4: Masterpass Provider'ı Initialize Edin

Session bilgileri hazır olduktan sonra, Masterpass provider'ı initialize edin:

```javascript
async function initMasterpassProvider() {
  const response = await PaywallJsSdk.providers.masterpass.init();
  
  if (response.success) {
    console.log('Masterpass provider initialized');
    return true;
  } else {
    console.error('Provider init failed:', response.message);
    return false;
  }
}
```

**💡 Not:** `accountKey` parametresi opsiyoneldir. Session state'inden otomatik alınır.

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

## Diğer Önemli Fonksiyonlar

### Kart Ekleme

```javascript
async function addCard() {
  const response = await PaywallJsSdk.providers.masterpass.addCard({
    accountKey: 'user123',
    cardNumber: '5555555555554444',
    expiryDate: '12/26',
    cvv: '123',
    cardHolderName: 'John Doe',
    accountAliasName: 'My Card'
  });
  
  if (response.success) {
    console.log('Card added:', response.data);
    return response.data.cardAlias;
  } else {
    console.error('Add card failed:', response.message);
    return null;
  }
}
```

### Kart Silme

```javascript
async function deleteCard(cardAlias) {
  const response = await PaywallJsSdk.providers.masterpass.deleteCard({
    accountKey: 'user123',
    cardAlias: cardAlias
  });
  
  if (response.success) {
    console.log('Card deleted successfully');
    return true;
  } else {
    console.error('Delete card failed:', response.message);
    return false;
  }
}
```

### Access Account (Kayıtlı Kartları Listeleme)

```javascript
async function getSavedCards() {
  const response = await PaywallJsSdk.providers.masterpass.accessAccount({
    accountKey: 'user123'
  });
  
  if (response.success) {
    console.log('Saved cards:', response.data);
    return response.data.cards;
  } else {
    console.error('Access account failed:', response.message);
    return [];
  }
}
```

### Merchant Link (Kullanıcıyı Merchant'a Bağlama)

```javascript
async function linkToMerchant() {
  const response = await PaywallJsSdk.providers.masterpass.merchantLink({
    accountKey: 'user123'
  });
  
  if (response.success) {
    console.log('Merchant link successful');
    return true;
  } else {
    console.error('Merchant link failed:', response.message);
    return false;
  }
}
```

## Tam Örnek

### **Yöntem 1: InitAutomatic (Önerilen)**

```javascript
async function completePaymentFlowAutomatic() {
  try {
    // 1. Backend'den token al (içinde Masterpass session var)
    const tokenWithSession = await getTokenWithSessionFromBackend();
    
    // 2. SDK + Session bilgilerini hazırla
    const initResponse = await PaywallJsSdk.InitAutomatic({
      token: tokenWithSession,
      environment: 'dev',
      includeMasterpassSession: true
    });
    
    if (!initResponse.success) {
      throw new Error('SDK initialization failed');
    }
    
    // 3. SessionId otomatik gelir
    const sessionId = initResponse.data.body.Masterpass.SessionId;
    
    // 4. Provider'ı hazırla
    const providerResponse = await PaywallJsSdk.providers.masterpass.init();
    
    if (!providerResponse.success) {
      throw new Error('Provider init failed');
    }
    
    // 5. Ödeme yap
    const paymentResponse = await PaywallJsSdk.payment.init({
      sessionId: sessionId,
      paymentSource: 'REGISTERED_CARD',
      paymentDetail: {
        amount: 100.00,
        currencyId: 1,
        merchantUniqueCode: 'ORDER-' + Date.now(),
        trackingCode: 'TRACK-' + Date.now(),
        successUrl: 'https://yoursite.com/success',
        failUrl: 'https://yoursite.com/fail',
        clientIp: '192.168.1.1',
        installment: 1
      },
      // ... diğer parametreler
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

### **Yöntem 2: InitManual (Manuel)**

```javascript
async function completePaymentFlowManual() {
  try {
    // 1. Merchant backend'de Masterpass session oluştur
    const sessionData = await createSessionOnBackend();
    
    // 2. SDK'yı başlat (session bilgisi yok)
    const initResponse = await PaywallJsSdk.InitManual({
      token: await getTokenFromBackend(),
      environment: 'dev'
    });
    
    if (!initResponse.success) {
      throw new Error('SDK initialization failed');
    }
    
    // 3. Provider'ı hazırla
    const providerResponse = await PaywallJsSdk.providers.masterpass.init();
    
    if (!providerResponse.success) {
      throw new Error('Provider init failed');
    }
    
    // 4. SessionId'yi backend'den al ve kullan
    const sessionId = sessionData.sessionId;
    
    // 5. Ödeme yap
    const paymentResponse = await PaywallJsSdk.payment.init({
      sessionId: sessionId,
      // ... diğer parametreler
    });
    
  } catch (error) {
    console.error('Payment flow error:', error);
  }
}
```

## API Referansı

### PaywallJsSdk.InitManual(params)

**📚 Dokümantasyon:** https://developer.paywall.one/client-side-servisler/1.-yetkilendirme

SDK'yı initialize eder. **Session bilgileri dahil edilmez.**

**Parametreler:**
- `token` (string): Merchant backend'den alınan token
- `environment` (string): 'dev' | 'test' | 'prod'

**⚠️ Not:** Masterpass session merchant backend'de oluşturulmalı, SessionId manuel alınmalıdır.

### PaywallJsSdk.InitAutomatic(params)

**📚 Dokümantasyon:** https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk

SDK'yı başlatır ve backend'den gelen session bilgilerini otomatik parse eder.

**Parametreler:**
- `token` (string): Merchant backend'den token (içinde session bilgileri var)
- `environment` (string): 'dev' | 'test' | 'prod'
- `includeMasterpassSession` (boolean): true olmalı

**✅ Önerilen:** Session bilgileri otomatik alınır, manuel işlem gerekmez.

### ~~PaywallJsSdk.ExternalService.Masterpass.startSession(params)~~

**❌ KALDIRILDI:** Bu metod artık kullanılmıyor. Session oluşturma işlemi **merchant backend** tarafından yapılmalıdır.

### PaywallJsSdk.providers.masterpass.init(params)
Masterpass provider'ı initialize eder.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key (opsiyonel, session'dan alınır)

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

### PaywallJsSdk.providers.masterpass.addCard(params)
Kart ekler.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key
- `cardNumber` (string): Kart numarası
- `expiryDate` (string): Son kullanma tarihi (MM/YY formatında)
- `cvv` (string): CVV kodu
- `cardHolderName` (string): Kart sahibi adı
- `accountAliasName` (string): Kart için alias adı

### PaywallJsSdk.providers.masterpass.deleteCard(params)
Kart siler.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key
- `cardAlias` (string): Silinecek kartın alias'ı

### PaywallJsSdk.providers.masterpass.accessAccount(params)
Kayıtlı kartları listeler.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key

### PaywallJsSdk.providers.masterpass.merchantLink(params)
Kullanıcıyı merchant'a bağlar.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key

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
- **⚠️ SDK'nın `startSession()` metodu kaldırıldı - Merchant backend'de session oluşturun**
- **InitAutomatic kullanımı önerilir:** Session bilgileri otomatik SDK'ya taşınır
- **InitManual kullanıyorsanız:** SessionId'yi merchant backend'den manuel alıp her işlemde geçmelisiniz
- Action required durumlarında kullanıcı etkileşimi gerekebilir
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
