# Paywall SDK Test Project

Bu proje, Paywall JavaScript SDK'nın test edilmesi ve doğru kullanımının gösterilmesi için oluşturulmuş bir Angular test uygulamasıdır.

## Ne İşe Yarar?

Bu test projesi:
- SDK'nın doğru şekilde yüklenip yüklenmediğini test eder
- **InitPaywallSdk** akışını test eder
- Masterpass entegrasyonunu test eder
- SDK API'lerinin doğru kullanımını gösterir
- Hata durumlarını ve action required senaryolarını test eder
- **Mermaid akış diyagramı** ile SDK kullanımını görselleştirir

## Gereksinimler

- Node.js 18+
- npm veya yarn
- Angular CLI 19+

## Kurulum

```bash
cd paywall-sdk-test
npm install
```

## Çalıştırma

```bash
ng serve
```

Tarayıcıda `http://localhost:4200/sdk-test` adresine gidin.

## Proje Yapısı

```
paywall-sdk-test/
├── public/
│   └── sdk/
│       └── paywall-jssdk.1.0.4.umd.js  ← SDK UMD dosyası
├── src/
│   ├── index.html                      ← SDK script tag burada
│   ├── app/
│   │   └── sdk-test/                   ← Test component'leri
│   └── paywall-sdk.d.ts                ← TypeScript type definitions
└── angular.json                         ← Public klasörü assets olarak tanımlı
```

## SDK Yükleme

SDK, `index.html` içinde script tag ile yüklenir:

```html
<script src="/sdk/paywall-jssdk.1.0.4.umd.js"></script>
<script>
  if (window.PaywallSDK && window.PaywallSDK.PaywallJsSdk) {
    window.PaywallJsSdk = window.PaywallSDK.PaywallJsSdk;
  }
</script>
```

SDK global olarak `window.PaywallJsSdk` üzerinden erişilebilir.

---

## SDK Kullanım Akışları

### 🎯 SDK Kullanım Akışı

**📚 Dokümantasyon:** https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk

Backend'de session oluştur → Token içine ekle → SDK otomatik parse etsin

```
🏢 Merchant Backend
  ↓ (Session + Token oluştur, token içine session bilgilerini ekle)
1️⃣ PaywallJsSdk.InitPaywallSdk()
  ↓ (Token'dan session bilgilerini parse et - OTOMATİK)
2️⃣ PaywallJsSdk.providers.masterpass.init()
  ↓
3️⃣ Account/Card İşlemleri
  ↓
4️⃣ Payment İşlemleri (SessionId otomatik kullanılır!)
```

**✅ AVANTAJLAR:**
- ✅ Tek SDK çağrısı ile session bilgileri hazır
- ✅ SessionId, userId, userPhone **otomatik SDK'da** - elle set etmeye gerek yok
- ✅ **Her payment çağrısında sessionId'yi kod tarafında manuel geçmenize GEREK YOK!**
- ✅ Daha az kod, daha az hata riski
- ✅ Backend'den gelen tüm data otomatik parse edilir
- ✅ Session parametrelerini unutma/yanlış geçme riski yok

**🎯 ÖZELLİK:**
Tüm session yönetimi SDK tarafından otomatik yapılır. **Manuel kod yazmanıza gerek yoktur!**

---

### 📊 Akış Diyagramları

Test uygulamasında **Mermaid ile hazırlanmış detaylı akış diyagramları** bulunmaktadır:

```
http://localhost:4200/sdk-test/flow-diagram
```

Bu sayfada:
- ✅ InitPaywallSdk akışı görselleştirilmiş
- ✅ Her adım detaylı açıklanmış
- ✅ Response code'lar (5001 OTP, 5010 3D Secure) gösterilmiş
- ✅ Dokümantasyon linklerine hızlı erişim

---

## SDK Fonksiyonları ve Kullanımı

### 1. PaywallJsSdk.InitPaywallSdk()

SDK'yı initialize eder ve backend'den gelen session bilgilerini otomatik parse eder.

#### Request

```javascript
await PaywallJsSdk.InitPaywallSdk({
  token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // İçinde session bilgileri var
  environment: "test",
  includeMasterpassSession: true
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `token` | string | Backend'den alınan token (içinde session bilgileri var, zorunlu) |
| `environment` | string | Ortam tipi: 'dev', 'test' veya 'prod' (zorunlu) |
| `includeMasterpassSession` | boolean | true olmalı (session bilgilerini almak için) |

#### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "data": {
    "sdkInitialized": true,
    "hasMasterpassSession": true,
    "body": {
      "Token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "Masterpass": {
        "SessionId": "session-xxxx",
        "MasterpassToken": "mp-token-xxxx",
        "UserId": "USER_123",
        "UserPhone": "905437892802"
      }
    }
  }
}
```

**✅ AVANTAJ:** Session bilgileri otomatik gelir, kod tarafında manuel set etmenize GEREK YOK!

---

### 2. ~~PaywallJsSdk.ExternalService.Masterpass.startSession()~~

**❌ KALDIRILDI:** Bu metod artık SDK'da bulunmuyor. Session oluşturma **merchant backend** tarafından yapılmalıdır.

**Kullanım:**

```javascript
// Merchant backend'de session oluştur ve token içine ekle
const result = await PaywallJsSdk.InitPaywallSdk({
  environment: 'test',
  token: tokenFromBackend, // İçinde session bilgileri var
  includeMasterpassSession: true
});

// Session bilgileri otomatik gelir
const sessionId = result.data.body.Masterpass.SessionId;
const userId = result.data.body.Masterpass.UserId;
const userPhone = result.data.body.Masterpass.UserPhone;
```

---

### 3. PaywallJsSdk.providers.masterpass.init()

Masterpass provider'ı initialize eder. Session başlatıldıktan sonra çağrılmalıdır.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.init();
```

**Not:** Bu fonksiyon parametresiz çağrılır. Session state'inden otomatik olarak token ve merchantId alınır.

#### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "Masterpass provider initialized successfully",
  "data": {
    "initialized": true,
    "masterpassSdkInitialized": true
  }
}
```

---

### 4. PaywallJsSdk.providers.masterpass.AddCard()

Kart ekler. Kart bilgileri RSA ile şifrelenerek gönderilir.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.AddCard({
  userId: "user-12345",
  accountKey: "905437892802",
  accountKeyType: "Msisdn",
  accountAliasName: "MyCard",
  cardHolderName: "John Doe",
  cardNumber: "5528790000000008",
  expiryDate: "2612", // MMYY formatında (Aralık 2026)
  cvv: "123",
  requestReferenceNumber: "111111111111",
  deviceFingerPrint: ""
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `userId` | string | Kullanıcı ID (zorunlu, maksimum 101 karakter) |
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu) |
| `accountKeyType` | string | Account key tipi: "Msisdn" (zorunlu) |
| `accountAliasName` | string | Kart için alias adı (zorunlu, maksimum 41 karakter) |
| `cardHolderName` | string | Kart sahibi adı (zorunlu, maksimum 51 karakter) |
| `cardNumber` | string | Kart numarası (RSA ile şifrelenecek, zorunlu) |
| `expiryDate` | string | Son kullanma tarihi (MMYY formatında, örn: "2612", zorunlu) |
| `cvv` | string | CVV kodu (RSA ile şifrelenecek, zorunlu) |
| `requestReferenceNumber` | string | İstek referans numarası (benzersiz, zorunlu) |
| `deviceFingerPrint` | string | Cihaz parmak izi (opsiyonel, boş string olabilir) |

**⚠️ ÖNEMLİ:** `expiryDate` formatı MMYY'dir (MM/YY değil). Örnek: "2612" = Aralık 2026

#### Başarılı Response (OTP Gerekli)

```json
{
  "success": true,
  "status": "ACTION_REQUIRED",
  "source": "MASTERPASS",
  "actionType": "BANK_OTP",
  "message": "Bank OTP verification is required. Please enter the OTP code sent by your bank.",
  "data": {
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "retrievalReferenceNumber": "111111111111"
  }
}
```

#### Başarısız Response (Kart Zaten Kayıtlı)

```json
{
  "success": false,
  "status": "FAILED",
  "source": "MASTERPASS",
  "message": "This card is already registered. Please try adding a different card.",
  "errorCode": "4004",
  "data": {
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "errorCode": "CARD_ALREADY_EXISTS"
  }
}
```

---

### 5. PaywallJsSdk.providers.masterpass.removeCard()

Kayıtlı kartı siler.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.removeCard({
  accountKey: "905437892802",
  cardAlias: "MyCard"
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu) |
| `cardAlias` | string | Silinecek kartın alias'ı (zorunlu) |

#### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "Card deleted successfully",
  "data": {
    "success": true
  }
}
```

---

### 6. PaywallJsSdk.providers.masterpass.getCardList()

Kayıtlı kartları listeler.

**⚠️ ÖNEMLİ:** Bu fonksiyon arka planda Masterpass SDK'nın `accountService.accountAccess` metodunu çağırır. Hem kullanıcının merchant'a bağlı olup olmadığını kontrol eder, hem de kayıtlı kartları listeler.

**📌 NOT:** SDK'da `accountAccess` adında ayrı bir public fonksiyon yoktur. Sadece `getCardList` kullanılmalıdır.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.getCardList({
  accountKey: "905437892802",
  accountKeyType: "Msisdn",
  userId: "user-12345"
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu, maksimum 21 karakter) |
| `accountKeyType` | string | Account key tipi: "Msisdn" (zorunlu) |
| `userId` | string | Kullanıcı ID (ZORUNLU, maksimum 101 karakter) |

#### Başarılı Response (Kullanıcı Merchant'a Bağlı)

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "Cards fetched successfully",
  "data": {
    "cards": [
      {
        "cardId": 1111111111111,
        "cardAlias": "MyCard",
        "cardState": "Activated",
        "maskedCardNumber": "540667******0001",
        "uniqueCardNumber": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "cardType": "Credit",
        "productName": "Maximum",
        "cardBin": "540667",
        "cardIssuerIcaNumber": "1111",
        "cardValidationType": "OTP",
        "isDefaultCard": false,
        "isExpired": false,
        "isMasterpassMember": true
      }
    ],
    "accountInformation": {
      "isAccountLinked": true
    }
  }
}
```

#### Action Required Response (Merchant Link Gerekli)

```json
{
  "success": false,
  "status": "ACTION_REQUIRED",
  "source": "MASTERPASS",
  "actionType": "MERCHANT_LINK_REQUIRED",
  "message": "User is not linked to merchant. Please call merchantLink() first.",
  "data": {
    "accountInformation": {
      "isAccountLinked": false
    }
  }
}
```

**İŞ AKIŞI:**
1. `getCardList()` çağrıldığında önce kullanıcının merchant'a bağlı olup olmadığı kontrol edilir
2. Eğer `isAccountLinked: false` ise, `merchantLink()` çağrılmalıdır
3. Merchant link başarılı olduktan sonra tekrar `getCardList()` çağrılabilir

---

### 7. PaywallJsSdk.providers.masterpass.merchantLink()

Kullanıcıyı merchant'a bağlar. Yeni kullanıcılar için `getCardList()` çağrısından önce yapılması gerekir.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.merchantLink({
  accountKey: "905437892802"
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu) |

#### Başarılı Response (OTP Gerekli)

```json
{
  "success": true,
  "status": "ACTION_REQUIRED",
  "source": "MASTERPASS",
  "actionType": "BANK_OTP",
  "message": "Bank OTP verification is required...",
  "data": {
    "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }
}
```

---

### 8. PaywallJsSdk.providers.masterpass.verifyOtp()

OTP kodunu doğrular.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.verifyOtp({
  otpCode: "123456"
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `otpCode` | string | OTP kodu (zorunlu) |

**⚠️ ÖNEMLİ:** OTP token'ı parametre olarak verilmez, session state'inden otomatik alınır.

#### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "OTP verified successfully",
  "data": {
    "isVerified": true,
    "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "cardUniqueNumber": "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    "retrievalReferenceNumber": "222222222222"
  }
}
```

#### Başarısız Response

```json
{
  "success": false,
  "status": "FAILED",
  "source": "MASTERPASS",
  "message": "OTP verification failed",
  "errorCode": "INVALID_OTP",
  "data": {
    "providerMeta": {
      "httpStatus": 400,
      "responseCode": "INVALID_OTP"
    }
  }
}
```

---

### 9. PaywallJsSdk.providers.masterpass.resendOtp()

OTP kodunu yeniden gönderir.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.resendOtp();
```

#### Parametreler

Bu fonksiyon parametre almaz. OTP token'ı session state'inden otomatik alınır.

#### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "OTP resent successfully",
  "data": {
    "resent": true
  }
}
```

---

### 10. PaywallJsSdk.payment.init()

Ödeme işlemini başlatır. Manuel kart veya kayıtlı kart ile ödeme yapılabilir.

#### Request (Manuel Kart)

```javascript
await PaywallJsSdk.payment.init({
  sessionId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  paymentSource: "MANUAL_CARD",
  paymentDetail: {
    amount: 100.00,
    currencyId: 949, // TRY
    merchantUniqueCode: "MERCHANT-1111111111111",
    trackingCode: "TRACK-1111111111111",
    successUrl: "https://merchant.com/success",
    failUrl: "https://merchant.com/fail",
    clientIp: "192.168.1.1",
    installment: 1
  },
  card: {
    cardBin: "540667",
    cardMasked: "540667******0001",
    ownerName: "John Doe"
  },
  cardData: {
    cardNumber: "5528790000000008",
    ownerName: "John Doe",
    expiryDate: "2612", // MMYY formatında
    cvv: "123"
  },
  customer: {
    fullName: "John Doe",
    phone: "905437892802",
    email: "john@example.com",
    identityNumber: "12345678901"
  },
  products: [
    {
      productId: "PROD-001",
      productCode: "PROD-001",
      productName: "Test Product",
      productAmount: 100,
      quantity: 1,
      price: 100,
      totalPrice: 100,
      vatRate: 0,
      vatAmount: 0
    }
  ]
});
```

#### Request (Kayıtlı Kart)

```javascript
await PaywallJsSdk.payment.init({
  sessionId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  paymentSource: "REGISTERED_CARD",
  paymentDetail: {
    amount: 100.00,
    currencyId: 949, // TRY
    merchantUniqueCode: "MERCHANT-2222222222222",
    trackingCode: "TRACK-2222222222222",
    successUrl: "https://merchant.com/success",
    failUrl: "https://merchant.com/fail",
    clientIp: "192.168.1.1",
    installment: 1
  },
  card: {
    cardAlias: "MyCard",
    cardBin: "540667",
    cardMasked: "540667******0001",
    ownerName: "John Doe"
  },
  cardData: {
    cardAlias: "MyCard"
  },
  customer: {
    fullName: "John Doe",
    phone: "905437892802",
    email: "john@example.com",
    identityNumber: "12345678901"
  },
  products: [
    {
      productId: "PROD-001",
      productCode: "PROD-001",
      productName: "Test Product",
      productAmount: 100,
      quantity: 1,
      price: 100,
      totalPrice: 100,
      vatRate: 0,
      vatAmount: 0
    }
  ]
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `sessionId` | string | Session ID (InitPaywallSdk response'dan alınan, zorunlu) |
| `paymentSource` | string | Ödeme kaynağı: "MANUAL_CARD" veya "REGISTERED_CARD" (zorunlu) |
| `paymentDetail` | object | Ödeme detayları (zorunlu) |
| `paymentDetail.amount` | number | Ödeme tutarı (zorunlu) |
| `paymentDetail.currencyId` | number | Para birimi ID (949: TRY, zorunlu) |
| `paymentDetail.merchantUniqueCode` | string | Benzersiz sipariş kodu (zorunlu) |
| `paymentDetail.trackingCode` | string | Takip kodu (zorunlu) |
| `paymentDetail.successUrl` | string | Başarı URL'i (zorunlu) |
| `paymentDetail.failUrl` | string | Hata URL'i (zorunlu) |
| `paymentDetail.clientIp` | string | İstemci IP adresi (zorunlu) |
| `paymentDetail.installment` | number | Taksit sayısı (zorunlu) |
| `card` | object | Paywall'a gönderilecek masked kart bilgileri (zorunlu) |
| `card.cardBin` | string | Kart BIN (ilk 6 hane, zorunlu) |
| `card.cardMasked` | string | Maskelenmiş kart numarası (zorunlu) |
| `card.ownerName` | string | Kart sahibi adı (zorunlu) |
| `card.cardAlias` | string | Kayıtlı kart alias'ı (kayıtlı kart için, manuel kart için boş) |
| `cardData` | object | Masterpass'e gönderilecek hassas kart bilgileri (zorunlu) |
| `cardData.cardNumber` | string | Kart numarası (manuel kart için, RSA ile şifrelenecek) |
| `cardData.expiryDate` | string | Son kullanma tarihi (MMYY formatında, manuel kart için) |
| `cardData.cvv` | string | CVV kodu (manuel kart için, RSA ile şifrelenecek) |
| `cardData.cardAlias` | string | Kayıtlı kart alias'ı (kayıtlı kart için) |
| `customer` | object | Müşteri bilgileri (opsiyonel) |
| `products` | array | Ürün listesi (zorunlu) |

#### Başarılı Response (NonSecure Ödeme)

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "PAYWALL",
  "message": "Payment completed successfully.",
  "data": {
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "status": "SUCCESS",
    "message": "Payment completed successfully.",
    "nextActionHint": "Please commit the payment.",
    "retrievalReferenceNumber": "333333333333",
    "successUrl": "https://merchant.com/success",
    "failUrl": "https://merchant.com/fail",
    "paymentId": 11111111,
    "masterpassPaymentId": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    "activityId": 22222222,
    "uniqueCode": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "merchantUniqueCode": "MERCHANT-3333333333333"
  }
}
```

#### Action Required Response (3D Secure)

```json
{
  "success": true,
  "status": "ACTION_REQUIRED",
  "source": "MASTERPASS",
  "actionType": "3D",
  "message": "3D Secure verification is required. You will be redirected to the 3D Secure screen.",
  "data": {
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "status": "ACTION_REQUIRED",
    "actionType": "3D",
    "redirectUrl": "https://mp-test-sdk.masterpassturkiye.com/user-authorization/mp-3d-acs-form?token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "successUrl": "https://merchant.com/success",
    "failUrl": "https://merchant.com/fail",
    "paymentId": 33333333,
    "masterpassPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "activityId": 44444444,
    "uniqueCode": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "merchantUniqueCode": "MERCHANT-4444444444444"
  }
}
```

**Not:** 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır.

---

### 11. PaywallJsSdk.payment.registerAndPurchase()

Kart kaydı ve ödeme işlemini tek seferde yapar. Bu fonksiyon hem kart kaydı hem de ödeme işlemini gerçekleştirir.

**ÖNEMLİ ÖZELLİKLER:**

- Hem kart kaydı hem de ödeme işlemini tek seferde yapar
- Paywall init endpoint'ine istek atar (`POST /api/paywall/masterpass/by/sdk/payment/init`)
- Paywall'dan gelen `MasterpassRequestBody` içindeki placeholder'ları gerçek kart bilgileriyle değiştirir
- Masterpass SDK'ya `registerAndPurchase` çağrısı yapar
- `markAsStarted` endpoint'ine bildirim gönderir
- **cardAlias ZORUNLU** - Kart kaydı için alias gereklidir
- Kart bilgileri RSA ile şifrelenir ve sadece Masterpass SDK'ya gönderilir (Paywall'a gitmez)

#### Request

```javascript
await PaywallJsSdk.payment.registerAndPurchase({
  sessionId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  accountKey: "905437892802",
  accountKeyType: "Msisdn",
  merchantUserId: "USER_123",
  paymentDetail: {
    amount: 10000, // 100.00 TRY (kuruş cinsinden)
    currencyId: 949, // TRY
    merchantUniqueCode: "ORDER-001",
    trackingCode: "TRACK-001",
    successUrl: "https://merchant.com/success",
    failUrl: "https://merchant.com/fail",
    clientIp: "192.168.1.1",
    installment: 1
  },
  cardData: {
    cardNumber: "5528790000000008",
    cardHolderName: "John Doe",
    expiryDate: "2612", // MMYY formatında
    cvv: "123",
    cardAlias: "My Card" // ZORUNLU
  },
  products: [
    {
      productId: "PROD-001",
      productName: "Product 1",
      productAmount: 10000
    }
  ],
  customer: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "905437892802"
  },
  force3D: false
});
```

#### Parametreler

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `sessionId` | string | ✅ | Masterpass session ID |
| `accountKey` | string | ✅ | Kullanıcı telefon numarası veya account key |
| `accountKeyType` | string | ✅ | Genellikle `'Msisdn'` |
| `merchantUserId` | string | ✅ | Merchant'ın kullanıcı ID'si |
| `paymentDetail` | object | ✅ | Ödeme detayları |
| `paymentDetail.amount` | number | ✅ | Ödeme tutarı (kuruş cinsinden) |
| `paymentDetail.currencyId` | number | ✅ | Para birimi ID (949: TRY) |
| `paymentDetail.merchantUniqueCode` | string | ✅ | Benzersiz sipariş kodu |
| `paymentDetail.trackingCode` | string | ✅ | Takip kodu |
| `paymentDetail.successUrl` | string | ✅ | Başarı URL'i |
| `paymentDetail.failUrl` | string | ✅ | Hata URL'i |
| `paymentDetail.clientIp` | string | ✅ | İstemci IP adresi |
| `paymentDetail.installment` | number | ✅ | Taksit sayısı |
| `cardData` | object | ✅ | Kart bilgileri |
| `cardData.cardNumber` | string | ✅ | Gerçek PAN (ZORUNLU) |
| `cardData.cardHolderName` | string | ✅ | Kart sahibi adı (ZORUNLU) |
| `cardData.expiryDate` | string | ✅ | MMYY formatında (ZORUNLU) |
| `cardData.cvv` | string | ✅ | CVV (ZORUNLU) |
| `cardData.cardAlias` | string | ✅ | Kart alias'ı (ZORUNLU - registerAndPurchase için) |
| `products` | array | ✅ | Ürün listesi |
| `customer` | object | ❌ | Müşteri bilgileri |
| `force3D` | boolean | ❌ | 3D Secure zorunlu mu? (default: `false`) |

#### Response

```json
{
  "success": true,
  "status": "SUCCESS" | "ACTION_REQUIRED" | "FAILED",
  "actionType": "BANK_OTP" | "3D",
  "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // OTP için token
  "redirectUrl": "https://...", // 3D Secure için URL
  "retrievalReferenceNumber": "111111111111", // İşlem referans numarası
  "message": "Payment completed successfully.",
  "data": {
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "status": "SUCCESS" | "ACTION_REQUIRED" | "FAILED",
    "actionType": "BANK_OTP" | "3D",
    "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "redirectUrl": "https://...",
    "retrievalReferenceNumber": "111111111111",
    "paymentId": 11111111,
    "masterpassPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "activityId": 22222222,
    "uniqueCode": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "merchantUniqueCode": "ORDER-001"
  },
  "providerMeta": {
    "httpStatus": 200,
    "responseCode": "0000"
  }
}
```

#### Response Code Handling

- `responseCode 0000` → `SUCCESS` (Ödeme başarılı)
- `responseCode 5001` → `ACTION_REQUIRED`, `actionType: 'BANK_OTP'` (OTP doğrulama gerekiyor)
- `responseCode 5010` → `ACTION_REQUIRED`, `actionType: '3D'` (3D Secure doğrulama gerekiyor)
- Diğer kodlar → `FAILED`

---

## Test Senaryoları

### Senaryo 1: Temel Ödeme Akışı

1. **Backend'den Token Alın**: Merchant backend'den session içeren token alın
2. **SDK Init**: `PaywallJsSdk.InitPaywallSdk()` ile SDK + Session bilgilerini hazırlayın
3. **Provider Init**: `PaywallJsSdk.providers.masterpass.init()` ile provider'ı initialize edin
4. **Payment**: `PaywallJsSdk.payment.init()` ile ödeme işlemini başlatın
  - **✅ AVANTAJ:** SessionId'yi manuel geçmenize GEREK YOK! SDK otomatik kullanır.

### Senaryo 2: Kart Ekleme ve Ödeme

1. InitPaywallSdk → Provider Init adımlarını tamamlayın
2. **Kart Ekle**: `PaywallJsSdk.providers.masterpass.AddCard()` ile kart ekleyin
3. OTP doğrulaması gerekirse `PaywallJsSdk.providers.masterpass.verifyOtp()` ile doğrulayın
4. **Payment**: Kayıtlı kart ile `PaywallJsSdk.payment.init()` çağırın

### Senaryo 3: Kayıtlı Kartları Listeleme ve Merchant Link

1. InitPaywallSdk → Provider Init adımlarını tamamlayın
2. **Kartları Listele**: `PaywallJsSdk.providers.masterpass.getCardList()` ile kayıtlı kartları listeleyin
3. Eğer `MERCHANT_LINK_REQUIRED` hatası alırsanız:
  - `PaywallJsSdk.providers.masterpass.merchantLink()` ile merchant link işlemi yapın
  - OTP doğrulaması yapın
  - Tekrar `getCardList()` çağırın
4. Listelenen kartlardan biri ile ödeme yapın

### Senaryo 4: Register and Purchase (Kart Kaydı ve Ödeme Tek Seferde)

1. InitPaywallSdk → Provider Init adımlarını tamamlayın
2. **Register and Purchase**: `PaywallJsSdk.payment.registerAndPurchase()` ile kart kaydedip ödeme yapın
3. OTP veya 3D Secure gerekiyorsa ilgili akışı tamamlayın
4. Ödeme sonucunu kontrol edin

**⚠️ ÖNEMLİ:** `registerAndPurchase` için `cardAlias` zorunludur.

---

### ⚠️ Önemli Değişiklikler

**✅ YENİ YAPI:**
- **`InitPaywallSdk` kullanın!** Session bilgileri otomatik SDK'ya taşınır
- **Manuel kod yazmanıza GEREK YOK:** SessionId, userId, userPhone otomatik SDK'da
- **Her işlemde session parametrelerini geçmenize GEREK YOK**

**❌ KALDIRILDI:**
- `startSession()` metodu kaldırıldı - Session oluşturma artık **merchant backend** tarafından yapılmalıdır
- **userId** ve **userPhone** inputları kaldırıldı - Bu bilgiler backend'den otomatik gelir
- `accessAccount()` fonksiyonu yok - Sadece `getCardList()` kullanın
- `deleteCard()` fonksiyonu yok - `removeCard()` kullanın

---

## Kullanım Notları

- SDK sadece UMD dosyasından yüklenir, npm package kullanılmaz
- Tüm SDK çağrıları global `window.PaywallJsSdk` üzerinden yapılır
- TypeScript type definitions `paywall-sdk.d.ts` dosyasında tanımlıdır
- Kart bilgileri RSA ile şifrelenerek gönderilir
- **Kart bilgileri (PAN, CVV) ASLA Paywall backend'e gönderilmez**
- Kart bilgileri sadece Masterpass SDK'ya iletilir
- SDK state'inde, loglarda veya storage'da kart bilgileri tutulmaz
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
- OTP doğrulama `verifyOtp()` fonksiyonu ile yapılır
- Session başlatılmadan provider fonksiyonları kullanılamaz
- Provider initialize edilmeden payment fonksiyonları kullanılamaz
- `registerAndPurchase` için `cardAlias` zorunludur
- `getCardList` için `userId` zorunludur
- `expiryDate` formatı MMYY'dir (MM/YY değil)
- Response code `5001` → OTP gerekiyor
- Response code `5010` → 3D Secure gerekiyor

---

## Response Formatları

### Genel Response Yapısı

Tüm fonksiyonlar aşağıdaki genel response formatını kullanır:

```json
{
  "success": boolean,
  "status": "SUCCESS" | "ACTION_REQUIRED" | "FAILED",
  "source": "SDK" | "PAYWALL" | "MASTERPASS",
  "message": string,
  "data": object,
  "errorCode": string, // Hata durumunda
  "actionType": string // ACTION_REQUIRED durumunda
}
```

### Status Değerleri

- `SUCCESS`: İşlem başarılı
- `ACTION_REQUIRED`: Kullanıcı etkileşimi gerekli (OTP, 3D Secure, Merchant Link vb.)
- `FAILED`: İşlem başarısız

### Action Type Değerleri

- `3D`: 3D Secure doğrulama gerekli
- `BANK_OTP`: Banka OTP doğrulama gerekli
- `MERCHANT_LINK_REQUIRED`: Merchant link işlemi gerekli

---

## Hata Kodları

| Hata Kodu | Açıklama |
|-----------|----------|
| `MISSING_TOKEN` | Token eksik veya boş |
| `MISSING_CARD_DATA` | Kart bilgileri eksik |
| `MISSING_CARD_ALIAS` | cardAlias eksik (registerAndPurchase için) |
| `MISSING_USER_ID` | User ID eksik (getCardList için) |
| `INVALID_CARD_NUMBER_FORMAT` | Kart numarası formatı geçersiz |
| `INVALID_EXPIRY_DATE_FORMAT` | Son kullanma tarihi formatı geçersiz |
| `INVALID_CVV_FORMAT` | CVV formatı geçersiz |
| `SESSION_EXPIRED` | Session süresi dolmuş |
| `MISSING_REFERENCE_CODE` | Reference code eksik |
| `MISSING_USER_PHONE` | User phone eksik |
| `ACCOUNT_NOT_FOUND` | Hesap bulunamadı |
| `ACCOUNT_NOT_LINKED_TO_MERCHANT` | Hesap merchant'a bağlı değil |
| `CARD_ALREADY_EXISTS` | Kart zaten kayıtlı |
| `MASTERPASS_ERROR` | Masterpass hatası |
| `4004` | Kart zaten kayıtlı (Masterpass) |
| `4005` | User ID zaten kullanımda (Masterpass) |
| `5001` | OTP doğrulama gerekli (Masterpass) |
| `5010` | 3D Secure doğrulama gerekli (Masterpass) |

---

## Masterpass SDK Test Page - Kod Değişiklikleri Rehberi

Bu rehber, masterpass-sdk-test-page component'inde yapılan tüm değişiklikleri adım adım açıklar.

---

### DEĞİŞİKLİK 1: Force3D Checkbox'ı Session Alanına Taşıma

**Amaç:** Force3D parametresini backend'de session oluşturulurken kullanmak.

**Not:** `startSession()` metodu SDK'dan kaldırılmıştır. Force3D parametresi artık backend'de session oluşturulurken kullanılmalıdır.

---

### DEĞİŞİKLİK 2: Customer Bilgileri Ekranı Ekleme

**Amaç:** Customer bilgilerini her koşulda ekranda göstermek ve otomatik değerlerle doldurmak (telefon hariç). Bu bilgiler her payment adımında gönderilir.

#### TypeScript Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.ts`

**ngOnInit metoduna customer form otomatik değerleri ekle:**

```typescript
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
```

#### HTML Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.html`

**Payment Test Area'nın başına (Product List'ten önce) ekle:**

```html
<!-- Customer Information -->
<div class="customer-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background: #f8f9fa;">
  <h3>Customer Information</h3>
  <div class="form-row">
    <div class="form-group">
      <label>Full Name: <span style="color: red;">*</span></label>
      <input type="text" [(ngModel)]="customerForm.fullName" placeholder="Full Name" class="form-control" required />
    </div>
    <div class="form-group">
      <label>Phone:</label>
      <input type="text" [(ngModel)]="customerForm.phone" placeholder="905551234567" class="form-control" />
    </div>
    <div class="form-group">
      <label>Email: <span style="color: red;">*</span></label>
      <input type="email" [(ngModel)]="customerForm.email" placeholder="email@example.com" class="form-control" required />
    </div>
    <div class="form-group">
      <label>Identity Number: <span style="color: red;">*</span></label>
      <input type="text" [(ngModel)]="customerForm.identityNumber" placeholder="12345678901" class="form-control" required />
    </div>
  </div>
  <small style="color: #666; font-size: 12px; display: block; margin-top: 10px;">
    * These fields are required and will be sent with every payment request. Phone is optional.
  </small>
</div>
```

---

### DEĞİŞİKLİK 3: RegisterAndPurchase Fonksiyonu Ekleme

**Amaç:** Manuel kartla ödeme alırken, kullanıcının "Kartımı Kaydet ve Öde" seçeneğini işaretlemesi durumunda `registerAndPurchase` fonksiyonunu kullanmak.

#### TypeScript Değişiklikleri

**1. manualCardForm'a saveCardOnPayment ekle:**

```typescript
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
```

**2. payWithManualCard metodunu güncelle** - kart validasyonundan sonra, mevcut payment.init çağrısından önce ekle.

**3. registerAndPurchase metodunu ekle** (payWithManualCard metodundan sonra) - Detaylı kod yukarıda verilmiştir.

#### HTML Değişiklikleri

**Manual Card Payment bölümünde, Card Alias input'undan sonra, "Kart Kaydet" butonundan önce ekle:**

```html
<div class="form-row" style="margin-top: 15px; padding: 10px; background: #f0f8ff; border-radius: 4px; border: 1px solid #b3d9ff;">
  <div class="form-group checkbox-group" style="flex-direction: row; align-items: center; padding-top: 0;">
    <label style="display: flex; align-items: center; cursor: pointer; margin: 0;">
      <input type="checkbox" [(ngModel)]="manualCardForm.saveCardOnPayment" style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;" />
      <span style="font-weight: 500; color: #004085;">Kartımı Kaydet ve Öde</span>
    </label>
    <small style="margin-left: 10px; color: #666; font-size: 12px;">
      (Kart kaydı ve ödeme işlemi tek seferde yapılacak)
    </small>
  </div>
</div>
```

---

### ÖZET

#### Yapılan Değişiklikler:

1. ✅ **Force3D**: Backend'de session oluşturulurken kullanılmalı
2. ✅ **Customer Bilgileri**: Ekrana eklendi, otomatik değerler atandı (telefon hariç)
3. ✅ **RegisterAndPurchase**: Yeni fonksiyon eklendi, checkbox ile kontrol ediliyor
4. ✅ **CardAlias Zorunlu**: RegisterAndPurchase için cardAlias zorunlu kontrolü eklendi
5. ✅ **CurrencyId**: RegisterAndPurchase'da 949 (TRY) olarak ayarlandı
6. ✅ **OTP Handling**: ResponseCode 5010 kontrolü ve OTP popup açılması eklendi
7. ✅ **Fonksiyon İsimleri**: `accessAccount` → `getCardList`, `deleteCard` → `removeCard`
8. ✅ **ExpiryDate Formatı**: MMYY formatı (MM/YY değil)

#### Önemli Notlar:

- `startSession()` metodu SDK'dan kaldırılmıştır
- Session oluşturma merchant backend tarafından yapılmalıdır
- `accessAccount` fonksiyonu yoktur, sadece `getCardList` kullanın
- `deleteCard` fonksiyonu yoktur, `removeCard` kullanın
- `userId` parametresi `getCardList` için zorunludur
- `cardAlias` parametresi `registerAndPurchase` için zorunludur
- `expiryDate` formatı MMYY'dir (örn: "2612" = Aralık 2026)
