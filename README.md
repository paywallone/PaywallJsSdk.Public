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
public-sdk/paywall-jssdk.1.0.7.umd.js
```

### 2. HTML Sayfanıza Ekleyin

```html
<!DOCTYPE html>
<html>
<head>
  <title>Paywall SDK Example</title>
</head>
<body>
  <script src="paywall-jssdk.1.0.7.umd.js"></script>
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

**💡 Not:** Provider init edilirken gerekli tüm bilgiler session state'inden otomatik alınır.

### Adım 4: Ödeme İşlemini Başlatın

Tüm adımlar tamamlandıktan sonra ödeme işlemini başlatabilirsiniz:

```javascript
async function startPayment() {
  const response = await PaywallJsSdk.payment.init({
    sessionId: sessionId, // InitPaywallSdk'dan alınan sessionId
    paymentSource: 'REGISTERED_CARD', // veya 'MANUAL_CARD'
    paymentDetail: {
      amount: 100.00,
      currencyId: 1, // TRY. Para birimi listesi: https://developer.paywall.one/sistem-verileri/para-birimleri
      merchantUniqueCode: 'ORDER-' + Date.now(),
      trackingCode: 'TRACK-' + Date.now(),
      successUrl: 'https://yoursite.com/success',
      failUrl: 'https://yoursite.com/fail',
      clientIp: '192.168.1.1',
      installment: 1
    },
    card: {
      cardAlias: 'MyCard',
      cardBin: '540667',
      cardMasked: '540667******0001',
      ownerName: 'John Doe'
    },
    cardData: {
      cardAlias: 'MyCard' // Kayıtlı kart için
    },
    products: [
      {
        productId: 'PROD-001',
        productName: 'Product 1',
        productAmount: 100.00
      }
    ]
  });
  
  if (response.status === 'SUCCESS') {
    console.log('Payment successful:', response.data);
  } else if (response.status === 'ACTION_REQUIRED') {
    if (response.actionType === '3D' && response.data.redirectUrl) {
      window.location.href = response.data.redirectUrl;
    } else if (response.actionType === 'BANK_OTP') {
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
  const response = await PaywallJsSdk.providers.masterpass.AddCard({
    accountKey: '905437892802',
    accountKeyType: 'Msisdn',
    userId: 'USER_123',
    accountAliasName: 'My Card',
    cardHolderName: 'John Doe',
    cardNumber: '5528790000000008',
    expiryDate: '2612', // MMYY formatında (Aralık 2026)
    cvv: '123',
    requestReferenceNumber: '111111111111',
    deviceFingerPrint: ''
  });
  
  if (response.success) {
    console.log('Card added:', response.data);
    return response.data.cardAlias;
  } else if (response.status === 'ACTION_REQUIRED' && response.actionType === 'BANK_OTP') {
    // OTP doğrulama gerekiyor
    const otp = prompt('Enter OTP:');
    const verifyResponse = await PaywallJsSdk.providers.masterpass.verifyOtp({ otpCode: otp });
    if (verifyResponse.success) {
      console.log('Card added and verified');
      return verifyResponse.data.cardUniqueNumber;
    }
  } else {
    console.error('Add card failed:', response.message);
    return null;
  }
}
```

### Kart Silme

```javascript
async function deleteCard(cardAlias) {
  const response = await PaywallJsSdk.providers.masterpass.removeCard({
    accountKey: '905437892802',
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

### Kayıtlı Kartları Listeleme

**⚠️ ÖNEMLİ:** `getCardList` fonksiyonu arka planda Masterpass'in `accountAccess` metodunu çağırır. Hem kullanıcının merchant'a bağlı olup olmadığını kontrol eder, hem de kayıtlı kartları listeler.

```javascript
async function getSavedCards() {
  const response = await PaywallJsSdk.providers.masterpass.getCardList({
    accountKey: '905437892802',
    accountKeyType: 'Msisdn',
    userId: 'USER_123'
  });
  
  if (response.success) {
    console.log('Saved cards:', response.data.cards);
    return response.data.cards;
  } else if (response.status === 'ACTION_REQUIRED' && response.actionType === 'MERCHANT_LINK_REQUIRED') {
    // Kullanıcı merchant'a bağlı değil, önce merchantLink yapılmalı
    console.log('User not linked to merchant');
    return { requiresMerchantLink: true };
  } else {
    console.error('Get card list failed:', response.message);
    return [];
  }
}
```

### Merchant Link (Kullanıcıyı Merchant'a Bağlama)

Yeni kullanıcılar için önce merchant link işlemi yapılması gerekir:

```javascript
async function linkToMerchant() {
  const response = await PaywallJsSdk.providers.masterpass.merchantLink({
    accountKey: '905437892802'
  });
  
  if (response.status === 'ACTION_REQUIRED' && response.actionType === 'BANK_OTP') {
    // OTP doğrulama gerekiyor
    const otp = prompt('Enter OTP:');
    const verifyResponse = await PaywallJsSdk.providers.masterpass.verifyOtp({ otpCode: otp });
    
    if (verifyResponse.success) {
      console.log('Merchant link successful');
      return true;
    }
  } else {
    console.error('Merchant link failed:', response.message);
    return false;
  }
}
```

### Merchant Link + Kart Listesi Akışı

```javascript
async function ensureMerchantLinkAndGetCards() {
  // Önce kart listesini almayı dene
  let cardsResponse = await PaywallJsSdk.providers.masterpass.getCardList({
    accountKey: '905437892802',
    accountKeyType: 'Msisdn',
    userId: 'USER_123'
  });
  
  // Eğer merchant link gerekiyorsa
  if (cardsResponse.actionType === 'MERCHANT_LINK_REQUIRED') {
    console.log('Merchant link required, initiating...');
    
    // Merchant link yap
    const linkSuccess = await linkToMerchant();
    
    if (linkSuccess) {
      // Tekrar kart listesini al
      cardsResponse = await PaywallJsSdk.providers.masterpass.getCardList({
        accountKey: '905437892802',
        accountKeyType: 'Msisdn',
        userId: 'USER_123'
      });
      
      if (cardsResponse.success) {
        return cardsResponse.data.cards;
      }
    }
  } else if (cardsResponse.success) {
    return cardsResponse.data.cards;
  }
  
  return [];
}
```

### Register and Purchase (Kart Kaydet ve Öde)

Tek seferde hem kart kaydı hem de ödeme yapmak için:

```javascript
async function registerAndPurchase() {
  const response = await PaywallJsSdk.payment.registerAndPurchase({
    sessionId: sessionId, // InitPaywallSdk'dan alınan
    accountKey: '905437892802',
    accountKeyType: 'Msisdn',
    merchantUserId: 'USER_123',
    paymentDetail: {
      amount: 10000, // 100.00 TRY (kuruş cinsinden)
      currencyId: 1, // TRY. Para birimi listesi: https://developer.paywall.one/sistem-verileri/para-birimleri
      merchantUniqueCode: 'ORDER-' + Date.now(),
      trackingCode: 'TRACK-' + Date.now(),
      successUrl: 'https://yoursite.com/success',
      failUrl: 'https://yoursite.com/fail',
      clientIp: '192.168.1.1',
      installment: 1
    },
    cardData: {
      cardNumber: '5528790000000008',
      cardHolderName: 'John Doe',
      expiryDate: '2612', // MMYY formatında
      cvv: '123',
      cardAlias: 'My Card' // ZORUNLU
    },
    products: [
      {
        productId: 'PROD-001',
        productName: 'Product 1',
        productAmount: 10000
      }
    ],
    customer: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '905437892802'
    }
  });
  
  if (response.success && response.data.status === 'SUCCESS') {
    console.log('Payment successful:', response.data);
  } else if (response.data.status === 'ACTION_REQUIRED') {
    if (response.data.actionType === 'BANK_OTP') {
      const otp = prompt('Enter OTP:');
      // OTP doğrulama merchant backend'de yapılmalı
    } else if (response.data.actionType === '3D') {
      window.location.href = response.data.redirectUrl;
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
    
    // 5. Önce kartları listele (merchant link kontrolü için)
    let cards = await PaywallJsSdk.providers.masterpass.getCardList({
      accountKey: '905437892802',
      accountKeyType: 'Msisdn',
      userId: 'USER_123'
    });
    
    // 6. Eğer merchant link gerekiyorsa
    if (cards.actionType === 'MERCHANT_LINK_REQUIRED') {
      const linkResponse = await PaywallJsSdk.providers.masterpass.merchantLink({
        accountKey: '905437892802'
      });
      
      if (linkResponse.actionType === 'BANK_OTP') {
        const otp = prompt('Enter OTP:');
        await PaywallJsSdk.providers.masterpass.verifyOtp({ otpCode: otp });
      }
      
      // Tekrar kartları listele
      cards = await PaywallJsSdk.providers.masterpass.getCardList({
        accountKey: '905437892802',
        accountKeyType: 'Msisdn',
        userId: 'USER_123'
      });
    }
    
    // 7. Ödeme yap
    const paymentResponse = await PaywallJsSdk.payment.init({
      sessionId: sessionId,
      paymentSource: 'REGISTERED_CARD',
      paymentDetail: {
        amount: 100.00,
        currencyId: 1, // TRY. Para birimi listesi: https://developer.paywall.one/sistem-verileri/para-birimleri
        merchantUniqueCode: 'ORDER-' + Date.now(),
        trackingCode: 'TRACK-' + Date.now(),
        successUrl: 'https://yoursite.com/success',
        failUrl: 'https://yoursite.com/fail',
        clientIp: '192.168.1.1',
        installment: 1
      },
      card: {
        cardAlias: cards.data.cards[0].cardAlias,
        cardBin: cards.data.cards[0].cardBin,
        cardMasked: cards.data.cards[0].maskedCardNumber,
        ownerName: 'John Doe'
      },
      cardData: {
        cardAlias: cards.data.cards[0].cardAlias
      },
      products: [
        {
          productId: 'PROD-001',
          productName: 'Product 1',
          productAmount: 100.00
        }
      ]
    });
    
    if (paymentResponse.status === 'ACTION_REQUIRED' && paymentResponse.data.redirectUrl) {
      window.location.href = paymentResponse.data.redirectUrl;
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

### PaywallJsSdk.providers.masterpass.init()
Masterpass provider'ı initialize eder. Gerekli tüm bilgiler session state'inden otomatik alınır.

### PaywallJsSdk.payment.init(params)
Ödeme işlemini başlatır.

**Parametreler:**
- `sessionId` (string): Session ID (InitPaywallSdk'dan alınan)
- `paymentSource` (string): 'MANUAL_CARD' | 'REGISTERED_CARD'
- `paymentDetail` (object): Ödeme detayları
    - `amount` (number): Ödeme tutarı
    - `currencyId` (number): Para birimi ID. Geçerli değerler: [Para Birimi](https://developer.paywall.one/sistem-verileri/para-birimleri)
    - `merchantUniqueCode` (string): Benzersiz sipariş kodu
    - `trackingCode` (string): Takip kodu
    - `successUrl` (string): Başarı URL'i
    - `failUrl` (string): Hata URL'i
    - `clientIp` (string): İstemci IP adresi
    - `installment` (number): Taksit sayısı
- `card` (object): Paywall'a gönderilecek masked kart bilgileri
- `cardData` (object): Masterpass'e gönderilecek hassas kart bilgileri
- `products` (array): Ürün listesi

### PaywallJsSdk.payment.registerAndPurchase(params)
Kart kaydı ve ödeme işlemini tek seferde yapar.

**⚠️ ÖNEMLİ:** `cardData.cardAlias` ZORUNLU

### PaywallJsSdk.providers.masterpass.AddCard(params)
Kart ekler.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key (genellikle telefon numarası)
- `accountKeyType` (string): 'Msisdn'
- `userId` (string): Kullanıcı ID
- `accountAliasName` (string): Kart için alias adı
- `cardHolderName` (string): Kart sahibi adı
- `cardNumber` (string): Kart numarası
- `expiryDate` (string): Son kullanma tarihi (MMYY formatında, örn: '2612')
- `cvv` (string): CVV kodu
- `requestReferenceNumber` (string): İstek referans numarası
- `deviceFingerPrint` (string): Cihaz parmak izi (opsiyonel)

### PaywallJsSdk.providers.masterpass.removeCard(params)
Kart siler.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key
- `cardAlias` (string): Silinecek kartın alias'ı

### PaywallJsSdk.providers.masterpass.getCardList(params)
Kayıtlı kartları listeler.

**⚠️ ÖNEMLİ:** Bu fonksiyon arka planda Masterpass SDK'nın `accountService.accountAccess` metodunu çağırır. Hem kullanıcının merchant'a bağlı olup olmadığını kontrol eder, hem de kayıtlı kartları listeler.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key
- `accountKeyType` (string): 'Msisdn'
- `userId` (string): Kullanıcı ID (ZORUNLU)

**İŞ AKIŞI:**
1. `getCardList()` çağrıldığında önce kullanıcının merchant'a bağlı olup olmadığı kontrol edilir
2. Eğer `isAccountLinked: false` ise, `merchantLink()` çağrılmalıdır
3. Merchant link başarılı olduktan sonra tekrar `getCardList()` çağrılabilir

### PaywallJsSdk.providers.masterpass.merchantLink(params)
Kullanıcıyı merchant'a bağlar.

**Parametreler:**
- `accountKey` (string): Kullanıcı account key

### PaywallJsSdk.providers.masterpass.verifyOtp(params)
OTP kodunu doğrular.

**Parametreler:**
- `otpCode` (string): OTP kodu

### PaywallJsSdk.providers.masterpass.resendOtp()
OTP kodunu yeniden gönderir. Parametre almaz, OTP token'ı session state'inden otomatik alınır.

## Response Formatları

### Başarılı Response
```javascript
{
  success: true,
  status: 'SUCCESS',
  source: 'MASTERPASS' | 'PAYWALL' | 'SDK',
  data: { ... }
}
```

### Action Required Response
```javascript
{
  success: false,
  status: 'ACTION_REQUIRED',
  source: 'MASTERPASS' | 'PAYWALL',
  actionType: 'BANK_OTP' | '3D' | 'MERCHANT_LINK_REQUIRED',
  data: {
    token?: string, // OTP için
    redirectUrl?: string, // 3D için
    ...
  }
}
```

### Hata Response
```javascript
{
  success: false,
  status: 'FAILED',
  source: 'SDK' | 'PAYWALL' | 'MASTERPASS',
  message: 'Error message',
  errorCode: 'ERROR_CODE'
}
```

## Environment'lar

- `dev`: Development environment
    - Paywall API: `https://dev-payment-api.itspaywall.com`
    - Masterpass SDK: `https://mp-test-sdk.masterpassturkiye.com`
- `test`: Test environment
    - Paywall API: `https://test-payment-api.itspaywall.com`
    - Masterpass SDK: `https://mp-test-sdk.masterpassturkiye.com`
- `prod`: Production environment
    - Paywall API: `https://payment-api.itspaywall.com`
    - Masterpass SDK: `https://mp-sdk.masterpassturkiye.com`

## Önemli Notlar

- SDK global olarak `window.PaywallJsSdk` üzerinden erişilebilir
- Tüm API çağrıları Promise döner
- **Session oluşturma merchant backend tarafından yapılır**
- **`InitPaywallSdk` kullanarak** tek adımda SDK + Session hazır
- Session bilgileri otomatik SDK'ya taşınır ve yönetilir
- Action required durumlarında kullanıcı etkileşimi gerekebilir
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
- OTP doğrulama `verifyOtp` fonksiyonu ile yapılır
- Kart bilgileri (PAN, CVV) RSA ile şifrelenir ve sadece Masterpass SDK'ya gönderilir
- Yeni kullanıcılar için önce `merchantLink()` yapılmalıdır
- `expiryDate` formatı: MMYY (örn: '2612' = Aralık 2026)
- `registerAndPurchase` için `cardAlias` zorunludur
- `userId` parametresi `getCardList` için zorunludur

## Güvenlik

- Kart bilgileri PCI-DSS uyumlu şekilde işlenir
- PAN ve CVV bilgileri RSA-2048 ile şifrelenir
- Kart bilgileri SDK state'inde veya loglarda tutulmaz
- Token'lar merchant backend tarafından yönetilir
- SDK token üretmez veya refresh etmez
