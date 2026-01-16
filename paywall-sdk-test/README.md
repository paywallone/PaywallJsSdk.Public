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

### 1. PaywallJsSdk.Init()

SDK'yı initialize eder. Bu fonksiyon network isteği atmaz, sadece config validation ve state set eder.

#### Request

```javascript
await PaywallJsSdk.Init({
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

## Test Senaryoları

### Senaryo 1: Temel Ödeme Akışı

1. **Token Alın**: Backend'inizden geçici token alın
2. **SDK Init**: `PaywallJsSdk.Init()` ile SDK'yı başlatın
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

---

## Kullanım Notları

- SDK sadece UMD dosyasından yüklenir, npm package kullanılmaz
- Tüm SDK çağrıları global `window.PaywallJsSdk` üzerinden yapılır
- TypeScript type definitions `paywall-sdk.d.ts` dosyasında tanımlıdır
- Kart bilgileri RSA ile şifrelenerek gönderilir
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
- OTP doğrulama merchant backend tarafından yapılmalıdır
- Session başlatılmadan provider fonksiyonları kullanılamaz
- Provider initialize edilmeden payment fonksiyonları kullanılamaz

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
| `SESSION_EXPIRED` | Session süresi dolmuş |
| `MISSING_REFERENCE_CODE` | Reference code eksik |
| `MISSING_USER_ID` | User ID eksik |
| `MISSING_USER_PHONE` | User phone eksik |
| `ACCOUNT_NOT_FOUND` | Hesap bulunamadı |
| `ACCOUNT_NOT_LINKED_TO_MERCHANT` | Hesap merchant'a bağlı değil |
| `CARD_ALREADY_EXISTS` | Kart zaten kayıtlı |
| `4004` | Kart zaten kayıtlı (Masterpass) |
| `5001` | OTP doğrulama gerekli (Masterpass) |
| `5010` | 3D Secure doğrulama gerekli (Masterpass) |
