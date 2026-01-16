# Paywall JavaScript SDK - API Dokümantasyonu

Bu dokümantasyon, Paywall JavaScript SDK'nın tüm fonksiyonlarını, parametrelerini ve response formatlarını içermektedir.

## İçindekiler

1. [PaywallJsSdk.Init()](#paywalljssdkinit)
2. [PaywallJsSdk.ExternalService.Masterpass.startSession()](#start-session)
3. [PaywallJsSdk.providers.masterpass.init()](#masterpass-provider-init)
4. [PaywallJsSdk.providers.masterpass.addCard()](#add-card)
5. [PaywallJsSdk.providers.masterpass.deleteCard()](#delete-card)
6. [PaywallJsSdk.providers.masterpass.accessAccount()](#access-account)
7. [PaywallJsSdk.providers.masterpass.merchantLink()](#merchant-link)
8. [PaywallJsSdk.providers.masterpass.verifyOtp()](#verify-otp)
9. [PaywallJsSdk.providers.masterpass.resendOtp()](#resend-otp)
10. [PaywallJsSdk.providers.masterpass.unlinkMerchant()](#unlink-merchant)
11. [PaywallJsSdk.payment.init()](#payment-init)

---

## PaywallJsSdk.Init() {#paywalljssdkinit}

SDK'yı initialize eder. Bu fonksiyon network isteği atmaz, sadece config validation ve state set eder.

### Request

```javascript
await PaywallJsSdk.Init({
  token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  environment: "dev" // veya "test" veya "prod"
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `token` | string | Geçici access token (GUID formatında, zorunlu) |
| `environment` | string | Ortam tipi: 'dev', 'test' veya 'prod' (zorunlu) |
| `merchantId` | string | Merchant ID (opsiyonel, session'dan da alınabilir) |
| `timeoutMs` | number | Request timeout süresi (opsiyonel, default: 10000) |
| `logLevel` | string | Log seviyesi (opsiyonel, default: 'error') |

### Başarılı Response

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

### Başarısız

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

## PaywallJsSdk.ExternalService.Masterpass.startSession() {#start-session}

Masterpass session başlatır. Bu fonksiyon Paywall API'ye istek atarak session oluşturur.

### Request

```javascript
await PaywallJsSdk.ExternalService.Masterpass.startSession({
  referenceCode: "1737123456789",
  userId: "user123",
  userPhone: "5551234567",
  force3D: false,
  phoneVerifiedByMerchant: true
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `referenceCode` | string | Benzersiz referans kodu (sadece sayı olmalı, zorunlu) |
| `userId` | string | Kullanıcı ID (zorunlu) |
| `userPhone` | string | Kullanıcı telefon numarası (zorunlu) |
| `force3D` | boolean | 3D Secure zorunlu mu? (opsiyonel, default: false) |
| `phoneVerifiedByMerchant` | boolean | Telefon merchant tarafından doğrulandı mı? (opsiyonel, default: true) |

### Başarılı Response

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
    "isUat": false,
    "providerMeta": {
      "httpStatus": 200,
      "responseCode": "SUCCESS",
      "raw": { ... }
    }
  }
}
```

### Başarısız

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

### Session Süresi Bittiğinde

```json
{
  "success": false,
  "status": "FAILED",
  "source": "SDK",
  "message": "Masterpass session not found or expired.",
  "errorCode": "SESSION_EXPIRED",
  "data": {
    "actionHint": "Please start a new session."
  }
}
```

---

## PaywallJsSdk.providers.masterpass.init() {#masterpass-provider-init}

Masterpass provider'ı initialize eder. Session başlatıldıktan sonra çağrılmalıdır.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.init({
  accountKey: "5555555555"
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu) |

**Not:** Bu fonksiyon parametresiz de çağrılabilir. Session state'inden otomatik olarak token ve merchantId alınır.

### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "Masterpass provider initialized successfully",
  "data": {
    "initialized": true
  }
}
```

---

## PaywallJsSdk.providers.masterpass.addCard() {#add-card}

Kart ekler. Kart bilgileri RSA ile şifrelenerek gönderilir.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.addCard({
  accountKey: "5555555555",
  accountKeyType: "Msisdn",
  userId: "user-12345",
  accountAliasName: "MyCard",
  cardHolderName: "John Doe",
  cardNumber: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6...", // Şifrelenmiş (RSA)
  expiryDate: "2612",
  cvv: "x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4...", // Şifrelenmiş (RSA)
  requestReferenceNumber: "111111111111",
  deviceFingerPrint: ""
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (zorunlu) |
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu) |
| `accountKeyType` | string | Account key tipi: "Msisdn" (zorunlu) |
| `userId` | string | Kullanıcı ID (zorunlu, maksimum 101 karakter) |
| `accountAliasName` | string | Kart için alias adı (zorunlu, maksimum 41 karakter) |
| `cardHolderName` | string | Kart sahibi adı (zorunlu, maksimum 51 karakter, kart numarası içeremez) |
| `cardNumber` | string | Şifrelenmiş kart numarası (RSA ile şifrelenmiş, zorunlu) |
| `expiryDate` | string | Son kullanma tarihi (YYMM formatında, örn: "2612", zorunlu) |
| `cvv` | string | Şifrelenmiş CVV kodu (RSA ile şifrelenmiş, zorunlu) |
| `requestReferenceNumber` | string | İstek referans numarası (benzersiz, zorunlu) |
| `deviceFingerPrint` | string | Cihaz parmak izi (opsiyonel, boş string olabilir) |

### Başarılı Response (OTP Gerekli)

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
    "retrievalReferenceNumber": "111111111111",
    "providerMeta": {
      "httpStatus": 202,
      "responseCode": "5001"
    }
  }
}
```

### Başarısız (Kart Zaten Kayıtlı)

```json
{
  "success": false,
  "status": "FAILED",
  "source": "MASTERPASS",
  "message": "This card is already registered. Please try adding a different card.",
  "errorCode": "4004",
  "data": {
    "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "errorCode": "CARD_ALREADY_EXISTS",
    "errorDetails": [ ... ]
  }
}
```

---

## PaywallJsSdk.providers.masterpass.deleteCard() {#delete-card}

Kayıtlı kartı siler.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.deleteCard({
  accountKey: "5555555555",
  cardAlias: "MyCard"
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (zorunlu) |
| `cardAlias` | string | Silinecek kartın alias'ı (zorunlu) |

### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "Card deleted successfully",
  "data": {
    "success": true,
    "providerMeta": {
      "httpStatus": 200,
      "responseCode": "200"
    }
  }
}
```

---

## PaywallJsSdk.providers.masterpass.accessAccount() {#access-account}

Kayıtlı kartları listeler.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.accessAccount({
  accountKey: "5555555555",
  accountKeyType: "Msisdn",
  userId: "user-12345"
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (genellikle telefon numarası, zorunlu, maksimum 21 karakter) |
| `accountKeyType` | string | Account key tipi: "Msisdn" (zorunlu) |
| `userId` | string | Kullanıcı ID (zorunlu, maksimum 101 karakter) |

### Başarılı Response

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
        "cardAuthorityUrl": "./assets/icon/Mastercard.svg",
        "isDefaultCard": false,
        "expireSoon": false,
        "isExpired": false,
        "isEightDigit": false,
        "isMasterpassMember": true,
        "isCardCreditOrSupportedDebit": true,
        "isIssuerOtpSupported": true
      }
    ],
    "accountInformation": {
      "isAccountLinked": true
    },
    "providerMeta": {
      "httpStatus": 200,
      "responseCode": "0000"
    }
  }
}
```

### Başarısız (Hesap Bulunamadı)

```json
{
  "success": false,
  "status": "FAILED",
  "source": "MASTERPASS",
  "message": "Hesap bulunamadı.",
  "errorCode": "ACCOUNT_NOT_FOUND",
  "data": {
    "providerMeta": {
      "httpStatus": 404,
      "responseCode": "ACCOUNT_NOT_FOUND"
    }
  }
}
```

### Action Required Response (Merchant Link Gerekli)

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

## PaywallJsSdk.providers.masterpass.merchantLink() {#merchant-link}

Kullanıcıyı merchant'a bağlar.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.merchantLink({
  accountKey: "5555555555"
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (zorunlu) |

### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "Merchant link successful",
  "data": {
    "linked": true
  }
}
```

### Action Required Response (OTP Gerekli)

```json
{
  "success": true,
  "status": "ACTION_REQUIRED",
  "source": "MASTERPASS",
  "actionType": "BANK_OTP",
  "message": "Bank OTP verification is required. Please enter the OTP code sent by your bank. OTP verification is handled by merchant backend.",
  "data": {
    "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "providerMeta": {
      "httpStatus": 202,
      "responseCode": "5001"
    }
  }
}
```

### Başarısız (Zaten Linkli)

```json
{
  "success": false,
  "status": "FAILED",
  "source": "MASTERPASS",
  "message": "User ID is already in use. Please use a different user ID.",
  "errorCode": "4005",
  "data": {
    "providerMeta": {
      "httpStatus": 403,
      "responseCode": "4005"
    }
  }
}
```

---

## PaywallJsSdk.providers.masterpass.verifyOtp() {#verify-otp}

OTP kodunu doğrular.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.verifyOtp({
  otpCode: "123456"
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `otpCode` | string | OTP kodu (zorunlu) |

### Başarılı Response

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
    "retrievalReferenceNumber": "222222222222",
    "providerMeta": {
      "httpStatus": 200,
      "responseCode": "0000"
    }
  }
}
```

---

## PaywallJsSdk.providers.masterpass.resendOtp() {#resend-otp}

OTP kodunu yeniden gönderir.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.resendOtp();
```

### Parametreler

Bu fonksiyon parametre almaz.

### Başarılı Response

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

## PaywallJsSdk.providers.masterpass.unlinkMerchant() {#unlink-merchant}

Kullanıcıyı merchant'tan ayırır.

### Request

```javascript
await PaywallJsSdk.providers.masterpass.unlinkMerchant({
  accountKey: "5555555555"
});
```

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `accountKey` | string | Kullanıcı account key (zorunlu) |

### Başarılı Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "source": "MASTERPASS",
  "message": "Merchant unlinked successfully",
  "data": {
    "unlinked": true
  }
}
```

---

## PaywallJsSdk.payment.init() {#payment-init}

Ödeme işlemini başlatır. Manuel kart veya kayıtlı kart ile ödeme yapılabilir. Bu fonksiyon önce Paywall API'ye ödeme kaydı oluşturur, sonra Masterpass SDK'ya ödeme isteği gönderir.

### Request (Manuel Kart)

```javascript
await PaywallJsSdk.payment.init({
  amount: 100.00,
  currencyId: 1,
  merchantUniqueCode: "MERCHANT-1111111111111",
  trackingCode: "TRACK-1111111111111",
  successUrl: "https://merchant.com/success",
  failUrl: "https://merchant.com/fail",
  clientIp: "192.168.1.1",
  installment: 1,
  card: {
    cardBin: "540667",
    cardMasked: "540667******0001",
    ownerName: "John Doe"
  },
  customer: {
    fullName: "",
    phone: "",
    email: "",
    identityNumber: ""
  },
  products: [
    {
      productId: "TEST-PRODUCT-001",
      productCode: "TEST-PRODUCT-001",
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

### Request (Kayıtlı Kart)

```javascript
await PaywallJsSdk.payment.init({
  amount: 100.00,
  currencyId: 1,
  merchantUniqueCode: "MERCHANT-2222222222222",
  trackingCode: "TRACK-2222222222222",
  successUrl: "https://merchant.com/success",
  failUrl: "https://merchant.com/fail",
  clientIp: "192.168.1.1",
  installment: 1,
  card: {
    cardAlias: "MyCard",
    cardBin: "540667",
    cardMasked: "540667******0001",
    ownerName: "John Doe"
  },
  customer: {
    fullName: "",
    phone: "",
    email: "",
    identityNumber: ""
  },
  products: [
    {
      productId: "TEST-PRODUCT-001",
      productCode: "TEST-PRODUCT-001",
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

### Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `amount` | number | Ödeme tutarı (zorunlu) |
| `currencyId` | number | Para birimi ID (1: TRY, zorunlu) |
| `merchantUniqueCode` | string | Benzersiz sipariş kodu (zorunlu) |
| `trackingCode` | string | Takip kodu (zorunlu) |
| `successUrl` | string | Başarı URL'i (zorunlu) |
| `failUrl` | string | Hata URL'i (zorunlu) |
| `clientIp` | string | İstemci IP adresi (zorunlu) |
| `installment` | number | Taksit sayısı (zorunlu) |
| `channelId` | number | Kanal ID (opsiyonel) |
| `tagId` | number | Tag ID (opsiyonel) |
| `card` | object | Kart bilgileri (zorunlu) |
| `card.cardBin` | string | Kart BIN (ilk 6 hane, zorunlu) |
| `card.cardMasked` | string | Maskelenmiş kart numarası (zorunlu) |
| `card.ownerName` | string | Kart sahibi adı (zorunlu) |
| `card.cardAlias` | string | Kayıtlı kart alias'ı (kayıtlı kart için, manuel kart için boş) |
| `card.isSavedCard` | boolean | Kayıtlı kart mı? (SDK otomatik belirler) |
| `customer` | object | Müşteri bilgileri (opsiyonel) |
| `customer.fullName` | string | Müşteri tam adı (opsiyonel) |
| `customer.phone` | string | Müşteri telefonu (opsiyonel) |
| `customer.email` | string | Müşteri e-posta (opsiyonel) |
| `customer.identityNumber` | string | Müşteri TC kimlik no (opsiyonel) |
| `products` | array | Ürün listesi (zorunlu) |
| `products[].productId` | string | Ürün ID (zorunlu) |
| `products[].productCode` | string | Ürün kodu (zorunlu) |
| `products[].productName` | string | Ürün adı (zorunlu) |
| `products[].productAmount` | number | Ürün tutarı (zorunlu) |
| `products[].quantity` | number | Ürün miktarı (zorunlu) |
| `products[].price` | number | Ürün birim fiyatı (zorunlu) |
| `products[].totalPrice` | number | Ürün toplam fiyatı (zorunlu) |
| `products[].vatRate` | number | KDV oranı (opsiyonel) |
| `products[].vatAmount` | number | KDV tutarı (opsiyonel) |

### Başarılı Response (NonSecure Ödeme)

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
    "merchantUniqueCode": "MERCHANT-3333333333333",
    "providerMeta": {
      "httpStatus": 200,
      "responseCode": "0000",
      "raw": {
        "statusCode": 200,
        "response": {
          "version": null,
          "buildId": "1",
          "statusCode": 200,
          "message": "OK",
          "correlationId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "requestId": null,
          "result": {
            "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "retrievalReferenceNumber": "333333333333",
            "maskedNumber": "540667******0001",
            "terminalGroupId": "11111111111111111111111",
            "url3d": null,
            "url3dSuccess": null,
            "url3dFail": null,
            "responseCode": "0000",
            "description": "Yetkilendirme gerekli değil"
          },
          "exception": null
        }
      }
    }
  }
}
```

**Not:** NonSecure ödeme başarılı olduğunda, merchant backend'de ödemenin durumunu güncellemek için mark as started endpoint'ine istek atılmalıdır.

### Action Required Response (3D Secure)

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
    "message": "3D Secure verification is required. You will be redirected to the 3D Secure screen.",
    "retrievalReferenceNumber": "444444444444",
    "redirectUrl": "https://mp-test-sdk.masterpassturkiye.com/user-authorization/mp-3d-acs-form?token=hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh&returnUrl=https://dev-payment-agent.itspaywall.com/masterpass/vposcallback?uniqueCode=iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii",
    "successUrl": "https://merchant.com/success",
    "failUrl": "https://merchant.com/fail",
    "paymentId": 33333333,
    "masterpassPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "activityId": 44444444,
    "uniqueCode": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "merchantUniqueCode": "MERCHANT-4444444444444",
    "maskedCard": {
      "bin": "540667",
      "last4": "0001",
      "masked": "540667******0001"
    },
    "providerMeta": {
      "httpStatus": 202,
      "responseCode": "5010",
      "raw": {
        "statusCode": 202,
        "response": {
          "version": null,
          "buildId": "1",
          "statusCode": 202,
          "message": "Accepted",
          "correlationId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "requestId": null,
          "result": {
            "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "retrievalReferenceNumber": "444444444444",
            "maskedNumber": "540667******0001",
            "terminalGroupId": "11111111111111111111111",
            "url3d": "https://mp-test-sdk.masterpassturkiye.com/user-authorization/mp-3d-acs-form?token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "url3dSuccess": "https://mp-test-sdk.masterpassturkiye.com/user-authorization/mp-3d-client-success",
            "url3dFail": "https://mp-test-sdk.masterpassturkiye.com/user-authorization/mp-3d-client-error",
            "responseCode": "5010",
            "description": "Telefonunuza gelen tek kullanımlık şifreyi girerek işleminizi tamamlayınız"
          },
          "exception": null,
          "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "url3d": "https://mp-test-sdk.masterpassturkiye.com/user-authorization/mp-3d-acs-form?token=mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm",
          "responseCode": "5010"
        }
      }
    }
  }
}
```

**Not:** 3D Secure akışında:
1. `redirectUrl`'e yönlendirme yapılmalıdır
2. Ödeme durumunu güncellemek için mark as started endpoint'ine istek atılmalıdır
3. 3D doğrulama tamamlandıktan sonra Paywall callback URL'ine yönlendirilir

---

## Ödeme İşlem Akışı

### 1. Paywall API'ye Ödeme Kaydı Oluşturma

`payment.init()` fonksiyonu çağrıldığında, SDK önce Paywall API'ye ödeme kaydı oluşturur.

**Request (Paywall API'ye):**
```json
{
  "SessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "Force3D": false,
  "PaymentDetail": {
    "Amount": 100,
    "CurrencyId": 1,
    "MerchantUniqueCode": "MERCHANT-5555555555555",
    "TrackingCode": "TRACK-5555555555555",
    "MerchantSuccessBackUrl": "https://merchant.com/success",
    "MerchantFailBackUrl": "https://merchant.com/fail",
    "ClientIP": "192.168.1.1",
    "Installment": 1,
    "ChannelId": 0,
    "TagId": 0
  },
  "Card": {
    "IsSavedCard": false,
    "CardBin": "540667",
    "CardMasked": "540667******0001",
    "OwnerName": "John Doe"
  },
  "Customer": {
    "fullName": "",
    "phone": "",
    "email": "",
    "identityNumber": ""
  },
  "Products": [
    {
      "productId": "TEST-PRODUCT-001",
      "productCode": "TEST-PRODUCT-001",
      "productName": "Test Product",
      "productAmount": 100,
      "quantity": 1,
      "price": 100,
      "totalPrice": 100,
      "vatRate": 0,
      "vatAmount": 0
    }
  ]
}
```

**Response (Paywall API'den):**
```json
{
  "ErrorCodeType": 1,
  "ErrorMessage": null,
  "ErrorCode": 0,
  "Result": true,
  "Message": "Success",
  "Body": {
    "Session": {
      "SessionRenewed": false,
      "SessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    },
    "Masterpass": {
      "Paywall": {
        "MasterpassPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "MasterpassReturnQueryString": "&returnUrl=https://dev-payment-agent.itspaywall.com/masterpass/vposcallback?uniqueCode=oooooooo-oooo-oooo-oooo-oooooooooooo",
        "PaymentId": 55555555,
        "ActivityId": 66666666,
        "UniqueCode": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "MerchantUniqueKey": "MERCHANT-6666666666666",
        "PaymentGatewayId": 1111,
        "PaymentGatewayName": "MasterPassIyzico",
        "PaymentGatewayProviderName": "Masterpass",
        "Products": [ ... ]
      },
      "MasterpassRequestBody": { ... }
    }
  }
}
```

### 2. Masterpass SDK'ya Ödeme İsteği

Paywall API'den başarılı response alındıktan sonra, SDK Masterpass SDK'ya ödeme isteği gönderir.

**Request (Masterpass SDK'ya - Manuel Kart):**
```json
{
  "accountKey": "5555555555",
  "paymentType": "Sale",
  "requestReferenceNo": "777777777777",
  "cardNumber": "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq...",
  "cardHolderName": "John Doe",
  "expiryDate": "2612",
  "cvc": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr...",
  "installmentCount": 1,
  "amount": 10000,
  "currencyCode": "TRY",
  "orderNo": "ssssssssssssssssssssssssssssssssssssssss",
  "terminalGroupId": "11111111111111111111111",
  "authenticationMethod": "None",
  "secure3DModel": "NotDefined",
  "orderDetails": { ... },
  "orderProductsDetails": { ... },
  "billDetails": { ... },
  "deliveryDetails": { ... },
  "buyerDetails": { ... },
  "otherDetails": { ... },
  "merchantId": "34878516",
  "sdkVersion": "1.0.4",
  "sourceChannel": "Web"
}
```

**Request (Masterpass SDK'ya - Kayıtlı Kart):**
```json
{
  "accountKey": "5555555555",
  "paymentType": "Sale",
  "requestReferenceNo": "888888888888",
  "cardAlias": "MyCard",
  "cvc": "",
  "installmentCount": 1,
  "amount": 10000,
  "currencyCode": "TRY",
  "orderNo": "tttttttttttttttttttttttttttttttttttttttt",
  "terminalGroupId": "11111111111111111111111",
  "authenticationMethod": "None",
  "secure3DModel": "NotDefined",
  "orderDetails": { ... },
  "orderProductsDetails": { ... },
  "billDetails": { ... },
  "deliveryDetails": { ... },
  "buyerDetails": { ... },
  "otherDetails": { ... },
  "merchantId": "34878516",
  "sdkVersion": "1.0.4",
  "sourceChannel": "Web"
}
```

### 3. Ödeme Durumunu Güncelleme (Mark as Started)

Ödeme başlatıldıktan sonra, merchant backend'de ödemenin durumunu güncellemek için Paywall API'ye mark as started isteği gönderilmelidir.

**Request (Paywall API'ye - 3D Ödeme için):**
```json
{
  "MasterpassPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "PaymentType": 2,
  "PaymentStatus": 1,
  "MasterpassPaymentToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "ThreeDAddress": "https://mp-test-sdk.masterpassturkiye.com/user-authorization/mp-3d-acs-form?token=wwwwwwww-wwww-wwww-wwww-wwwwwwwwwwww",
  "MasterpassOrderId": "999999999999",
  "Response": "{ ... }"
}
```

**Request (Paywall API'ye - NonSecure Ödeme için):**
```json
{
  "MasterpassPaymentId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "PaymentType": 1,
  "PaymentStatus": 3,
  "MasterpassPaymentToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "MasterpassOrderId": "000000000000",
  "Response": "{ ... }"
}
```

**Not:** Bu istek merchant backend tarafından yapılmalıdır. SDK bu isteği otomatik olarak atmaz.

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
| `INVALID_TOKEN_FORMAT` | Token GUID formatında değil |
| `SESSION_EXPIRED` | Session süresi dolmuş |
| `MISSING_REFERENCE_CODE` | Reference code eksik |
| `MISSING_USER_ID` | User ID eksik |
| `MISSING_USER_PHONE` | User phone eksik |
| `ACCOUNT_NOT_FOUND` | Hesap bulunamadı |
| `ACCOUNT_NOT_LINKED_TO_MERCHANT` | Hesap merchant'a bağlı değil |
| `CARD_ALREADY_EXISTS` | Kart zaten kayıtlı |
| `4004` | Kart zaten kayıtlı (Masterpass) |
| `4005` | User ID zaten kullanımda (Masterpass) |
| `5001` | OTP doğrulama gerekli (Masterpass) |
| `5010` | 3D Secure doğrulama gerekli (Masterpass) |

---

## Notlar

- Tüm fonksiyonlar Promise döner
- SDK initialize edilmeden fonksiyonlar çağrılamaz
- Session başlatılmadan provider fonksiyonları kullanılamaz
- Kart bilgileri RSA ile şifrelenerek gönderilir
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
- OTP doğrulama merchant backend tarafından yapılmalıdır
