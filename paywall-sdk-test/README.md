# Paywall SDK Test Project

Bu proje, Paywall JavaScript SDK'nın test edilmesi ve doğru kullanımının gösterilmesi için oluşturulmuş bir Angular test uygulamasıdır.

## Ne İşe Yarar?

Bu test projesi:
- SDK'nın doğru şekilde yüklenip yüklenmediğini test eder
- SDK lifecycle'ını (Init → Session → Provider Init → Payment) test eder
- Masterpass entegrasyonunu test eder
- SDK API'lerinin doğru kullanımını gösterir
- Hata durumlarını ve action required senaryolarını test eder

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

## SDK Fonksiyonları ve Kullanımı

### 1. PaywallJsSdk.InitManual()

SDK'yı initialize eder. Bu fonksiyon network isteği atmaz, sadece config validation ve state set eder.

#### Request

```javascript
await PaywallJsSdk.InitManual({
  token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  environment: "dev", // veya "test" veya "prod"
  logLevel: "debug" // opsiyonel
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `token` | string | Geçici access token (GUID formatında, zorunlu) |
| `environment` | string | Ortam tipi: 'dev', 'test' veya 'prod' (zorunlu) |
| `logLevel` | string | Log seviyesi (opsiyonel, default: 'error') |

#### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "SDK",
  "message": "SDK initialized successfully",
  "data": {
    "environment": "dev",
    "sdkInitialized": true
  }
}
```

#### Başarısız Response

```json
{
  "success": false,
  "status": "FAILED",
  "source": "SDK",
  "message": "Token is required and cannot be empty. Please provide a valid token.",
  "data": {
    "environment": "dev",
    "sdkInitialized": false,
    "providerMeta": {
      "responseCode": "MISSING_TOKEN"
    }
  }
}
```

---

### 2. PaywallJsSdk.ExternalService.Masterpass.startSession()

Masterpass session başlatır. Bu fonksiyon Paywall API'ye istek atarak session oluşturur.

#### Request

```javascript
await PaywallJsSdk.ExternalService.Masterpass.startSession({
  referenceCode: "1737123456789",
  userId: "user123",
  userPhone: "5551234567",
  force3D: false,
  phoneVerifiedByMerchant: true
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `referenceCode` | string | Benzersiz referans kodu (sadece sayı olmalı, zorunlu) |
| `userId` | string | Kullanıcı ID (zorunlu) |
| `userPhone` | string | Kullanıcı telefon numarası (zorunlu) |
| `force3D` | boolean | 3D Secure zorunlu mu? (opsiyonel, default: false) |
| `phoneVerifiedByMerchant` | boolean | Telefon merchant tarafından doğrulandı mı? (opsiyonel, default: true) |

#### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "PAYWALL",
  "message": "Masterpass session created successfully.",
  "data": {
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "sessionExpiryDate": "2026-01-14T14:25:13+03:00",
    "masterpassToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.xxxxxxxxxx...",
    "masterpassMerchantId": "11111111",
    "masterpassTerminalGroupId": "11111111111111111111111",
    "isProd": false,
    "isTest": true,
    "isUat": false
  }
}
```

#### Başarısız Response

```json
{
  "success": false,
  "status": "FAILED",
  "source": "SDK",
  "message": "referenceCode is required and cannot be empty.",
  "errorCode": "MISSING_REFERENCE_CODE",
  "data": {
    "field": "referenceCode"
  }
}
```

---

### 3. PaywallJsSdk.providers.masterpass.init()

Masterpass provider'ı initialize eder. Session başlatıldıktan sonra çağrılmalıdır.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.init({
  accountKey: "5555555555"
});
```

**Not:** Bu fonksiyon parametresiz de çağrılabilir. Session state'inden otomatik olarak token ve merchantId alınır.

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, opsiyonel) |

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

### 4. PaywallJsSdk.providers.masterpass.addCard()

Kart ekler. Kart bilgileri RSA ile şifrelenerek gönderilir.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.addCard({
  token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  userId: "user-12345",
  accountKey: "5555555555",
  accountKeyType: "Msisdn",
  accountAliasName: "MyCard",
  cardHolderName: "John Doe",
  cardNumber: "5406670000000001",
  expiryDate: "2612",
  cvv: "123",
  requestReferenceNumber: "111111111111",
  deviceFingerPrint: ""
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `token` | string | Masterpass token (session'dan alınan, zorunlu) |
| `userId` | string | Kullanıcı ID (zorunlu, maksimum 101 karakter) |
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu) |
| `accountKeyType` | string | Account key tipi: "Msisdn" (zorunlu) |
| `accountAliasName` | string | Kart için alias adı (opsiyonel, maksimum 41 karakter) |
| `cardHolderName` | string | Kart sahibi adı (zorunlu, maksimum 51 karakter) |
| `cardNumber` | string | Kart numarası (RSA ile şifrelenecek, zorunlu) |
| `expiryDate` | string | Son kullanma tarihi (YYMM formatında, örn: "2612", zorunlu) |
| `cvv` | string | CVV kodu (RSA ile şifrelenecek, zorunlu) |
| `requestReferenceNumber` | string | İstek referans numarası (benzersiz, zorunlu) |
| `deviceFingerPrint` | string | Cihaz parmak izi (opsiyonel, boş string olabilir) |

#### Başarılı Response (OTP Gerekli)

```json
{
  "success": true,
  "status": "ACTION_REQUIRED",
  "source": "MASTERPASS",
  "actionType": "BANK_OTP",
  "message": "Bank OTP verification is required. Please enter the OTP code sent by your bank. OTP verification is handled by merchant backend.",
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

### 5. PaywallJsSdk.providers.masterpass.deleteCard()

Kayıtlı kartı siler.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.deleteCard({
  accountKey: "5555555555",
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

### 6. PaywallJsSdk.providers.masterpass.accessAccount()

Kayıtlı kartları listeler.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.accessAccount({
  accountKey: "5555555555",
  accountKeyType: "Msisdn",
  userId: "user-12345"
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu, maksimum 21 karakter) |
| `accountKeyType` | string | Account key tipi: "Msisdn" (zorunlu) |
| `userId` | string | Kullanıcı ID (zorunlu, maksimum 101 karakter) |

#### Başarılı Response

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
  "success": true,
  "status": "ACTION_REQUIRED",
  "source": "MASTERPASS",
  "actionType": "MERCHANT_LINK_REQUIRED",
  "message": "Account is not linked to merchant",
  "data": {
    "providerMeta": {
      "httpStatus": 404,
      "responseCode": "ACCOUNT_NOT_LINKED_TO_MERCHANT"
    }
  }
}
```

---

### 7. PaywallJsSdk.providers.masterpass.verifyOtp()

OTP kodunu doğrular.

#### Request

```javascript
await PaywallJsSdk.providers.masterpass.verifyOtp({
  otpCode: "123456",
  token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
});
```

#### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `otpCode` | string | OTP kodu (zorunlu) |
| `token` | string | OTP token'ı (addCard veya merchantLink response'undan alınan, zorunlu) |

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

### 8. PaywallJsSdk.providers.masterpass.resendOtp()

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

### 9. PaywallJsSdk.payment.init()

Ödeme işlemini başlatır. Manuel kart veya kayıtlı kart ile ödeme yapılabilir.

#### Request (Manuel Kart)

```javascript
await PaywallJsSdk.payment.init({
  sessionId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  paymentSource: "MANUAL_CARD",
  paymentDetail: {
    amount: 100.00,
    currencyId: 1,
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
    cardNumber: "5406670000000001",
    ownerName: "John Doe",
    expiryDate: "2612",
    cvv: "123"
  },
  customer: {
    fullName: "John Doe",
    phone: "5555555555",
    email: "john@example.com",
    identityNumber: ""
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
    currencyId: 1,
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
    phone: "5555555555",
    email: "john@example.com",
    identityNumber: ""
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
| `sessionId` | string | Session ID (startSession'dan alınan, zorunlu) |
| `paymentSource` | string | Ödeme kaynağı: "MANUAL_CARD" veya "REGISTERED_CARD" (zorunlu) |
| `paymentDetail` | object | Ödeme detayları (zorunlu) |
| `paymentDetail.amount` | number | Ödeme tutarı (zorunlu) |
| `paymentDetail.currencyId` | number | Para birimi ID (1: TRY, zorunlu) |
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
| `cardData.expiryDate` | string | Son kullanma tarihi (YYMM formatında, manuel kart için) |
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

### 10. PaywallJsSdk.payment.registerAndPurchase()

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
  }
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
| `paymentDetail.channelId` | number | ❌ | Kanal ID |
| `paymentDetail.tagId` | number | ❌ | Tag ID |
| `cardData` | object | ✅ | Kart bilgileri |
| `cardData.cardNumber` | string | ✅ | Gerçek PAN (ZORUNLU) |
| `cardData.cardHolderName` | string | ✅ | Kart sahibi adı (ZORUNLU) |
| `cardData.expiryDate` | string | ✅ | MMYY formatında (ZORUNLU) |
| `cardData.cvv` | string | ✅ | CVV (ZORUNLU) |
| `cardData.cardAlias` | string | ✅ | Kart alias'ı (ZORUNLU - registerAndPurchase için) |
| `products` | array | ✅ | Ürün listesi |
| `products[].productId` | string | ✅ | Ürün ID |
| `products[].productName` | string | ✅ | Ürün adı |
| `products[].productCategory` | string | ❌ | Ürün kategorisi |
| `products[].productDescription` | string | ❌ | Ürün açıklaması |
| `products[].productAmount` | number | ✅ | Ürün tutarı |
| `customer` | object | ❌ | Müşteri bilgileri |
| `force3D` | boolean | ❌ | 3D Secure zorunlu mu? (default: `false`) |
| `secure3DModel` | string | ❌ | `'3D'` veya `'NON_SECURE'` |
| `isMsisdnValidatedByMerchant` | boolean | ❌ | Telefon merchant tarafından doğrulandı mı? (default: `true`) |

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

#### Kullanım Örneği

```javascript
// 1. SDK'yı initialize et
await PaywallJsSdk.InitManual({
  environment: 'test',
  token: 'TOKEN_FROM_MERCHANT_BACKEND'
});

// 2. Session başlat
const session = await PaywallJsSdk.ExternalService.Masterpass.startSession({
  referenceCode: Date.now().toString(),
  userId: 'USER_123',
  userPhone: '905437892802'
});

// 3. Register and Purchase
const result = await PaywallJsSdk.payment.registerAndPurchase({
  sessionId: session.data.sessionId,
  accountKey: '905437892802',
  accountKeyType: 'Msisdn',
  merchantUserId: 'USER_123',
  paymentDetail: {
    amount: 10000, // 100.00 TRY (kuruş cinsinden)
    currencyId: 949, // TRY
    merchantUniqueCode: 'ORDER-001',
    trackingCode: 'TRACK-001',
    successUrl: 'https://merchant.com/success',
    failUrl: 'https://merchant.com/fail',
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

// 4. Response handling
if (result.success) {
  if (result.data.status === 'SUCCESS') {
    console.log('Ödeme başarılı!');
  } else if (result.data.status === 'ACTION_REQUIRED') {
    if (result.data.actionType === 'BANK_OTP') {
      // OTP doğrulama ekranı göster
      // Token'ı merchant backend'e gönder
      console.log('OTP token:', result.data.token);
    } else if (result.data.actionType === '3D') {
      // 3D Secure redirect
      window.location.href = result.data.redirectUrl;
    }
  }
} else {
  console.error('Ödeme başarısız:', result.message);
}
```

---

## Test Senaryoları

### Senaryo 1: Temel Ödeme Akışı

1. **Token Alın**: Backend'inizden geçici token alın
2. **SDK Init**: `PaywallJsSdk.InitManual()` ile SDK'yı başlatın
3. **Session Başlat**: `PaywallJsSdk.ExternalService.Masterpass.startSession()` ile session oluşturun
4. **Provider Init**: `PaywallJsSdk.providers.masterpass.init()` ile provider'ı initialize edin
5. **Payment**: `PaywallJsSdk.payment.init()` ile ödeme işlemini başlatın

### Senaryo 2: Kart Ekleme ve Ödeme

1. SDK Init → Session Start → Provider Init adımlarını tamamlayın
2. **Kart Ekle**: `PaywallJsSdk.providers.masterpass.addCard()` ile kart ekleyin
3. OTP doğrulaması gerekirse `PaywallJsSdk.providers.masterpass.verifyOtp()` ile doğrulayın
4. **Payment**: Kayıtlı kart ile `PaywallJsSdk.payment.init()` çağırın

### Senaryo 3: Kayıtlı Kartları Listeleme

1. SDK Init → Session Start → Provider Init adımlarını tamamlayın
2. **Kartları Listele**: `PaywallJsSdk.providers.masterpass.accessAccount()` ile kayıtlı kartları listeleyin
3. Gerekirse merchant link işlemi yapın
4. Listelenen kartlardan biri ile ödeme yapın

### Senaryo 4: Register and Purchase (Kart Kaydı ve Ödeme Tek Seferde)

1. SDK Init → Session Start adımlarını tamamlayın
2. **Register and Purchase**: `PaywallJsSdk.payment.registerAndPurchase()` ile kart kaydedip ödeme yapın
3. OTP veya 3D Secure gerekiyorsa ilgili akışı tamamlayın
4. Ödeme sonucunu kontrol edin

**Not:** `registerAndPurchase` için `cardAlias` zorunludur.

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
- OTP doğrulama merchant backend tarafından yapılmalıdır
- Session başlatılmadan provider fonksiyonları kullanılamaz
- Provider initialize edilmeden payment fonksiyonları kullanılamaz
- `registerAndPurchase` için `cardAlias` zorunludur
- Response code `5001` → OTP gerekiyor
- Response code `5010` → 3D Secure gerekiyor

---

## Response Formatları

### Genel Response Yapısı

Tüm fonksiyonlar aşağıdaki genel response formatını kullanır:

```json
{
  "success": boolean,
  "status": "SUCCESS" | "ACTION_REQUIRED" | "FAILED" | "ERROR",
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
- `ERROR`: Sistem hatası

### Action Type Değerleri

- `3D`: 3D Secure doğrulama gerekli
- `BANK_OTP`: Banka OTP doğrulama gerekli
- `MASTERPASS_OTP_REQUIRED`: Masterpass OTP doğrulama gerekli
- `MERCHANT_LINK_REQUIRED`: Merchant link işlemi gerekli

---

## Hata Kodları

| Hata Kodu | Açıklama |
|-----------|----------|
| `MISSING_TOKEN` | Token eksik veya boş |
| `MISSING_CARD_DATA` | Kart bilgileri eksik |
| `MISSING_CARD_ALIAS` | cardAlias eksik (registerAndPurchase için) |
| `INVALID_CARD_NUMBER_FORMAT` | Kart numarası formatı geçersiz |
| `INVALID_EXPIRY_DATE_FORMAT` | Son kullanma tarihi formatı geçersiz |
| `INVALID_CVV_FORMAT` | CVV formatı geçersiz |
| `SESSION_EXPIRED` | Session süresi dolmuş |
| `MISSING_REFERENCE_CODE` | Reference code eksik |
| `MISSING_USER_ID` | User ID eksik |
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

**Amaç:** Force3D parametresini session başlatma alanına taşıyarak daha merkezi bir kontrol sağlamak.

#### TypeScript Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.ts`

Değişiklik yok - `force3D` zaten mevcut (satır 104).

#### HTML Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.html`

**1. Session alanına force3D checkbox ekle (Start Session butonunun yanına):**

```html
<div class="action-group">
  <button 
    class="btn btn-primary" 
    (click)="startSession()" 
    [disabled]="!sdkInitSuccess || sessionLoading || sessionSuccess"
  >
    <span *ngIf="sessionLoading">⏳ Loading...</span>
    <span *ngIf="!sessionLoading">Start Session</span>
  </button>
  <label class="force3d-checkbox">
    <input type="checkbox" [(ngModel)]="force3D" />
    Force 3D
  </label>
  <span class="badge" 
        [class.success]="sessionSuccess" 
        [class.error]="sessionError"
        [class.pending]="!sessionSuccess && !sessionError">
    {{ sessionSuccess ? '✔ Success' : (sessionError ? '✖ Failed' : '○ Pending') }}
  </span>
</div>
```

**2. Registered Card Payment bölümünden force3D checkbox'ını kaldır:**

Bu bölümü bulun ve kaldırın:
```html
<div class="form-group checkbox-group">
  <label>
    <input type="checkbox" [(ngModel)]="force3D" />
    Force 3D
  </label>
</div>
```

#### SCSS Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.scss`

`.action-group` tanımından sonra ekleyin:

```scss
.force3d-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  user-select: none;

  input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
}
```

---

### DEĞİŞİKLİK 2: Customer Bilgileri Ekranı Ekleme

**Amaç:** Customer bilgilerini her koşulda ekranda göstermek ve otomatik değerlerle doldurmak (telefon hariç). Bu bilgiler her payment adımında gönderilir.

#### TypeScript Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.ts`

**1. ngOnInit metoduna customer form otomatik değerleri ekle:**

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

**Not:** Customer form zaten mevcut (satır 147-152), sadece ngOnInit'e otomatik değer ataması eklendi.

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

**Not:** Customer bilgileri zaten `payWithRegisteredCard()` ve `payWithManualCard()` metodlarında gönderiliyor, değişiklik yok.

---

### DEĞİŞİKLİK 3: RegisterAndPurchase Fonksiyonu Ekleme

**Amaç:** Manuel kartla ödeme alırken, kullanıcının "Kartımı Kaydet ve Öde" seçeneğini işaretlemesi durumunda `registerAndPurchase` fonksiyonunu kullanmak.

#### TypeScript Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.ts`

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

**2. payWithManualCard metodunu güncelle:**

`payWithManualCard()` metodunda, kart validasyonundan sonra, mevcut payment.init çağrısından önce ekle:

```typescript
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
```

Ayrıca `payWithManualCard()` metodunun başına şu kontrolleri ekle:

```typescript
if (!this.userPhone) {
  this.manualPaymentError = 'UserPhone (accountKey) is required for registerAndPurchase';
  return;
}

if (!this.userId || !this.userId.trim()) {
  this.manualPaymentError = 'UserId is required for registerAndPurchase';
  return;
}
```

**3. registerAndPurchase metodunu ekle (payWithManualCard metodundan sonra):**

```typescript
async registerAndPurchase(cardNumber: string) {
  try {
    // Prepare registerAndPurchase request payload
    const requestPayload: any = {
      sessionId: this.sessionId!,
      accountKey: this.userPhone,
      accountKeyType: 'Msisdn',
      merchantUserId: this.userId.trim(),
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
    const response = await PaywallJsSdk.payment.registerAndPurchase(requestPayload);
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
    const responseAny = response as any;
    const result = responseAny.result || responseAny.data?.result || responseAny.data;
    const responseCode = result?.responseCode || responseAny.data?.providerMeta?.responseCode || responseAny.providerMeta?.responseCode;
    const statusCode = responseAny.statusCode || responseAny.data?.statusCode;
    const has3DUrl = result?.url3d || responseAny.data?.redirectUrl;
    const otpToken = result?.token || responseAny.data?.token || responseAny.token;
    
    // Check OTP requirement first (5010 for payment)
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
        } else if (data.actionType === 'BANK_OTP') {
          // OTP verification required
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
```

#### HTML Değişiklikleri

**Dosya:** `masterpass-sdk-test-page.component.html`

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

1. ✅ **Force3D Checkbox**: Session alanına taşındı, payment alanlarından kaldırıldı
2. ✅ **Customer Bilgileri**: Ekrana eklendi, otomatik değerler atandı (telefon hariç)
3. ✅ **RegisterAndPurchase**: Yeni fonksiyon eklendi, checkbox ile kontrol ediliyor
4. ✅ **CardAlias Zorunlu**: RegisterAndPurchase için cardAlias zorunlu kontrolü eklendi
5. ✅ **CurrencyId**: RegisterAndPurchase'da 1 olarak ayarlandı
6. ✅ **OTP Handling**: ResponseCode 5010 kontrolü ve OTP popup açılması eklendi

#### Dosyalar:

- `masterpass-sdk-test-page.component.ts` - TypeScript değişiklikleri
- `masterpass-sdk-test-page.component.html` - HTML değişiklikleri  
- `masterpass-sdk-test-page.component.scss` - SCSS değişiklikleri

#### Notlar:

- Customer bilgileri zaten payment metodlarında gönderiliyor, ek değişiklik gerekmedi
- OTP handling için mevcut `onOtpSubmit` metodu kullanılıyor
- `registerAndPurchase` fonksiyonu SDK'da mevcut olmalı (PaywallJsSdk.payment.registerAndPurchase)
