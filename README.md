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

**📚 Dokümantasyon:** https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk

Backend'den alınan token ile SDK'yı başlatın. Token içinde Masterpass session bilgileri otomatik olarak SDK'ya taşınır:

```javascript
async function initializeSDK() {
  // Merchant backend'den token al (içinde session bilgileri var)
  const tokenWithSession = await getTokenFromBackend();
  
  const result = await PaywallJsSdk.InitPaywallSdk({
    environment: 'dev',
    token: tokenWithSession,
    includeMasterpassSession: true
  });
  
  if (result.success) {
    // Session bilgileri otomatik gelir
    const sessionId = result.data.body.Masterpass.SessionId;
    console.log('SDK + Session ready:', sessionId);
    return result;
  } else {
    console.error('SDK initialization failed:', result.message);
    return false;
  }
}
```

**✅ AVANTAJLAR:**
- Session bilgileri otomatik SDK'da hazır
- SessionId, userId, userPhone manuel set etmenize gerek yok
- Tek adımda SDK + Session hazır
- Daha az kod, daha az hata riski

**⚠️ Önemli:** Session oluşturma **merchant backend** tarafından yapılmalıdır.

### Adım 3: Masterpass Provider'ı Initialize Edin

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

### Adım 4: Ödeme İşlemini Başlatın

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

```javascript
async function completePaymentFlow() {
  try {
    // 1. Backend'den token al (içinde Masterpass session var)
    const tokenWithSession = await getTokenFromBackend();
    
    // 2. SDK + Session bilgilerini hazırla
    const initResponse = await PaywallJsSdk.InitPaywallSdk({
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

## API Referansı

### PaywallJsSdk.InitPaywallSdk(params)

**📚 Dokümantasyon:** https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk

SDK'yı başlatır ve backend'den gelen session bilgilerini otomatik parse eder.

**Parametreler:**
- `token` (string): Merchant backend'den token (içinde session bilgileri var)
- `environment` (string): 'dev' | 'test' | 'prod'
- `includeMasterpassSession` (boolean): true olmalı

**✅ AVANTAJLAR:**
- Session bilgileri otomatik alınır, manuel işlem gerekmez
- Daha az kod, daha az hata riski
- Session bilgileri (SessionId, userId, userPhone) otomatik SDK'da hazır
- Her işlemde session parametrelerini manuel geçmeye gerek yok

**📌 ÖNEMLİ:** Tüm session bilgileri tek seferde SDK'ya taşınır ve otomatik yönetilir.

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
- **Session oluşturma merchant backend tarafından yapılır**
- **`InitPaywallSdk` kullanarak** tek adımda SDK + Session hazır
- Session bilgileri otomatik SDK'ya taşınır ve yönetilir
- Action required durumlarında kullanıcı etkileşimi gerekebilir
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
