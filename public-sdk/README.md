# Paywall JS SDK - Dokümantasyon

Paywall JavaScript SDK, Masterpass ödeme entegrasyonu için geliştirilmiş, PCI-DSS uyumlu bir JavaScript kütüphanesidir. Bu SDK, kart bilgilerini güvenli bir şekilde işleyerek ödeme işlemlerini gerçekleştirmenizi sağlar.

## İçindekiler

1. [Genel Bakış](#1-genel-bakış)
2. [Kurulum](#2-kurulum)
3. [Hızlı Başlangıç](#3-hızlı-başlangıç)
4. [API Referansı](#4-api-referansı)
5. [Response Formatları](#5-response-formatları)
6. [Güvenlik ve PCI-DSS Uyumluluğu](#6-güvenlik-ve-pci-dss-uyumluluğu)
7. [Hata Yönetimi](#7-hata-yönetimi)
8. [Best Practices](#8-best-practices)
9. [Örnekler](#9-örnekler)
10. [TypeScript Desteği](#10-typescript-desteği)
11. [Debugging](#11-debugging)
12. [Sürüm Notları](#12-sürüm-notları)
13. [Destek ve İletişim](#13-destek-ve-iletişim)

---

## 1. Genel Bakış

### 1.1. SDK'nın Amacı ve Kullanım Alanları

Paywall JS SDK, e-ticaret sitelerinde ve web uygulamalarında Masterpass ödeme işlemlerini gerçekleştirmek için tasarlanmıştır. SDK şu özellikleri sunar:

- **Kart Kaydı**: Kullanıcıların kartlarını güvenli bir şekilde kaydetmesi
- **Ödeme İşlemleri**: Manuel kart veya kayıtlı kart ile ödeme yapılması
- **Kart Yönetimi**: Kayıtlı kartların listelenmesi, silinmesi
- **Merchant Link**: Kullanıcıların merchant'a bağlanması
- **3D Secure Desteği**: 3D Secure doğrulama akışı
- **OTP Desteği**: Banka OTP doğrulama akışı

### 1.2. PCI-DSS Uyumluluğu ve Güvenlik Özellikleri

SDK, PCI-DSS (Payment Card Industry Data Security Standard) uyumludur ve aşağıdaki güvenlik özelliklerini sağlar:

- **Kart Bilgileri Şifreleme**: Kart numarası ve CVV bilgileri RSA ile şifrelenir
- **Güvenli İletişim**: Tüm API çağrıları HTTPS üzerinden yapılır
- **Veri Saklama**: Kart bilgileri SDK state'inde, loglarda veya storage'da tutulmaz
- **Token Yönetimi**: Token'lar merchant backend'den alınır, SDK token üretmez

### 1.3. Desteklenen Ödeme Yöntemleri

- **Masterpass**: Masterpass ödeme yöntemi tam olarak desteklenmektedir

---

## 2. Kurulum

### 2.1. CDN Kullanımı

SDK'yı CDN üzerinden yüklemek için HTML dosyanıza aşağıdaki script tag'ini ekleyin:

```html
<script src="https://cdn.example.com/paywall-jssdk.1.0.4.umd.js"></script>
<script>
  if (window.PaywallSDK && window.PaywallSDK.PaywallJsSdk) {
    window.PaywallJsSdk = window.PaywallSDK.PaywallJsSdk;
  }
</script>
```

### 2.2. Local Dosya Kullanımı

SDK dosyasını projenize indirip local olarak kullanabilirsiniz:

```html
<script src="/path/to/paywall-jssdk.1.0.4.umd.js"></script>
<script>
  if (window.PaywallSDK && window.PaywallSDK.PaywallJsSdk) {
    window.PaywallJsSdk = window.PaywallSDK.PaywallJsSdk;
  }
</script>
```

### 2.3. TypeScript Desteği

TypeScript kullanıyorsanız, type definitions dosyasını projenize ekleyin:

```typescript
// paywall-sdk.d.ts
declare global {
  interface Window {
    PaywallJsSdk: PaywallJsSdkType;
  }
}

interface PaywallJsSdkType {
   InitPaywallSdk: (params: {
      token: string;
      environment: 'dev' | 'test' | 'prod';
      includeMasterpassSession?: boolean;
  }) => Promise<SdkResponse>;// ... diğer metodlar
}

export {};
```

---

## 3. Hızlı Başlangıç

### 3.1. Minimum Çalışan Kod Örneği

```typescript
// 1. Tek adımda SDK, Session ve Provider'ı hazırla
const result = await PaywallJsSdk.InitPaywallSdk({
  environment: 'test',
  token: 'TOKEN_FROM_BACKEND',  // Backend'den temp token + Masterpass session
  includeMasterpassSession: true
});

// 2. Provider'ı initialize et
await PaywallJsSdk.providers.masterpass.init();

// 3. Ödeme yap (kayıtlı kart ile)
const payment = await PaywallJsSdk.payment.init({
  sessionId: result.data.body.Masterpass.SessionId,
  paymentSource: 'REGISTERED_CARD',
  paymentDetail: {
    amount: 100.00,
    currencyId: 949,
    merchantUniqueCode: 'ORDER-001',
    trackingCode: 'TRACK-001',
    successUrl: 'https://merchant.com/success',
    failUrl: 'https://merchant.com/fail',
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
    cardAlias: 'MyCard'
  },
  products: [
    {
      productId: 'PROD-001',
      productName: 'Product 1',
      productAmount: 100.00
    }
  ]
});

// 4. Response handling
if (payment.success && payment.data.status === 'SUCCESS') {
  console.log('Ödeme başarılı!');
} else if (payment.data.status === 'ACTION_REQUIRED') {
  if (payment.data.actionType === '3D') {
    window.location.href = payment.data.redirectUrl;
  }
}
```

### 3.2. Temel Ödeme Akışı

1. **Backend**: Merchant backend'de Masterpass session oluştur, token içine ekle
2. **SDK Init**: `PaywallJsSdk.InitPaywallSdk()` ile SDK başlat + Session bilgilerini otomatik al
3. **Provider Init**: `PaywallJsSdk.providers.masterpass.init()` ile provider'ı initialize et
4. **Payment**: `PaywallJsSdk.payment.init()` veya `PaywallJsSdk.payment.registerAndPurchase()` ile ödeme yap
5. **Response Handling**: Response'u kontrol edip gerekli aksiyonları al

**✅ AVANTAJ:** Session bilgileri otomatik SDK'da, manuel işlem gerekmez!

**⚠️ Önemli:** Session oluşturma işlemi **merchant backend tarafından** yapılmalıdır.

---

## 4. API Referansı

### 4.1. Initialization

#### `PaywallJsSdk.InitPaywallSdk(config)`

**📚 Detaylı Dokümantasyon:** https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk

Backend'den alınan temp token ile SDK'yı tek adımda başlatır. **Merchant backend'de oluşturulan Masterpass session bilgilerini** otomatik olarak SDK'ya taşır.

**🎯 ÖZELLİKLER:**

✅ **Otomatik Session Yönetimi:** SessionId, userId, userPhone otomatik SDK'da hazır
✅ **Daha Az Kod:** Manuel session taşıma kodları gereksiz
✅ **Daha Az Hata:** Session bilgilerini elle set etme hatası riski yok
✅ **Hızlı Entegrasyon:** Tek adımda SDK + Session hazır
✅ **Bakım Kolaylığı:** Session parametrelerini her yerde manuel geçmenize gerek yok

**📌 ÖNEMLİ:** Tüm session bilgileri otomatik olarak SDK tarafından yönetilir. **Manuel kod yazmaya gerek yoktur!**

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `environment` | `'dev' \| 'test' \| 'prod'` | ✅ | SDK ortamı |
| `token` | string | ✅ | Backend'den alınan temp token |
| `includeMasterpassSession` | boolean | ❌ | `true` ise backend'den Masterpass session bilgileri de beklenir (default: `false`) |

**Response:**

```typescript
{
  success: true,
  data: {
    sdkInitialized: true,
    hasMasterpassSession: true,  // includeMasterpassSession=true ise
    body: {
      Token: string,
      Masterpass: {
        SessionId: string,
        MasterpassToken: string,
        UserId: string,
        UserPhone: string
      }
    }
  }
}
```

**Kullanım Örneği:**

```typescript
// 1. Backend'den temp token al (Masterpass session dahil)
const backendResponse = await fetch('https://your-backend.com/api/paywall/temptoken/sdk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    IncludeMasterpassSession: true,
    MasterpassSession: {
      ReferenceCode: Date.now().toString(),
      UserId: 'USER_123',
      UserPhone: '905437892802',
      Force3D: false,
      PhoneVerifiedByMerchant: true
    }
  })
});

const backendData = await backendResponse.json();
const token = backendData.body.Token;

// 2. SDK'yı tek adımda başlat - SESSION BİLGİLERİ OTOMATİK GELİR!
const result = await PaywallJsSdk.InitPaywallSdk({
  environment: 'test',
  token: token,
  includeMasterpassSession: true
});

if (!result.success) {
  console.error('Init hatası:', result.message);
  return;
}

// 3. Provider init
await PaywallJsSdk.providers.masterpass.init();

// 4. Artık ödeme yapılabilir - SessionId'yi elle geçmenize gerek yok!
console.log('SDK hazır! SessionId:', result.data.body.Masterpass.SessionId);

// ✅ AVANTAJ: Her payment çağrısında sessionId'yi manuel set etmenize GEREK YOK!
// SDK otomatik olarak session bilgilerini kullanır.
```

**ÖNEMLİ NOTLAR:**

1. **Temp token backend'den alınmalıdır** - SDK token üretmez
2. **`includeMasterpassSession: true`** olmalıdır:
   - Backend'den Masterpass session bilgileri gelir
   - SDK otomatik olarak session state'ini set eder
   - **Artık sessionId'yi kod tarafında manuel set etmenize GEREK YOK!**
   - `providers.masterpass.init()` manuel olarak çağrılmalıdır (SDK otomatik çağırmaz)
3. **Response'ta `userId` ve `userPhone` bilgileri varsa**: SDK test uygulamasında bu değerler otomatik form alanlarına doldurulur

---

### 4.2. Masterpass Provider

**Session Yönetimi:**

1. **Session oluşturma** **merchant backend tarafından** yapılmalıdır
2. Session bilgileri `InitPaywallSdk()` ile otomatik olarak SDK'ya taşınır

**Kullanım:**

```typescript
// 1. Merchant backend'de session oluştur ve token içine ekle
// 2. Backend'den token al (içinde session bilgileri var)
const tokenFromBackend = await fetch('/api/create-session-with-token');

// 3. SDK'yı başlat - Session bilgileri otomatik gelir
const result = await PaywallJsSdk.InitPaywallSdk({
  environment: 'test',
  token: tokenFromBackend,
  includeMasterpassSession: true
});

// 4. Session bilgileri otomatik parse edilir - ELLE SET ETMEYE GEREK YOK!
const sessionId = result.data.body.Masterpass.SessionId;
const masterpassToken = result.data.body.Masterpass.MasterpassToken;
```

#### Kart İşlemleri

##### `PaywallJsSdk.providers.masterpass.AddCard(params)`

Kart ekler. Kart bilgileri RSA ile şifrelenerek gönderilir.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `accountKey` | string | ✅ | Kullanıcı account key (genellikle telefon numarası) |
| `accountKeyType` | string | ✅ | Account key tipi: `'Msisdn'` |
| `userId` | string | ✅ | Kullanıcı ID (maksimum 101 karakter) |
| `accountAliasName` | string | ✅ | Kart için alias adı (maksimum 41 karakter) |
| `cardHolderName` | string | ✅ | Kart sahibi adı (maksimum 51 karakter) |
| `cardNumber` | string | ✅ | Kart numarası (RSA ile şifrelenecek) |
| `expiryDate` | string | ✅ | Son kullanma tarihi (MMYY formatında, örn: `'2612'`) |
| `cvv` | string | ✅ | CVV kodu (RSA ile şifrelenecek) |
| `requestReferenceNumber` | string | ✅ | İstek referans numarası (benzersiz) |
| `deviceFingerPrint` | string | ❌ | Cihaz parmak izi (opsiyonel, boş string olabilir) |

**Örnek:**

```typescript
const result = await PaywallJsSdk.providers.masterpass.AddCard({
  accountKey: '905437892802',
  accountKeyType: 'Msisdn',
  userId: 'USER_123',
  accountAliasName: 'My Card',
  cardHolderName: 'John Doe',
  cardNumber: '5528790000000008',
  expiryDate: '2612', // MMYY formatında
  cvv: '123',
  requestReferenceNumber: '111111111111',
  deviceFingerPrint: ''
});
```

**Response (OTP Gerekli):**

```typescript
{
  success: true,
  status: 'ACTION_REQUIRED',
  source: 'MASTERPASS',
  actionType: 'BANK_OTP',
  message: 'Bank OTP verification is required...',
  data: {
    sessionId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    retrievalReferenceNumber: '111111111111'
  }
}
```

##### `PaywallJsSdk.providers.masterpass.getCardList(params)`

Kayıtlı kartları listeler.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `accountKey` | string | ✅ | Kullanıcı account key |
| `accountKeyType` | string | ✅ | Account key tipi: `'Msisdn'` |
| `userId` | string | ✅ | Kullanıcı ID |

**Örnek:**

```typescript
const cards = await PaywallJsSdk.providers.masterpass.getCardList({
  accountKey: '905437892802',
  accountKeyType: 'Msisdn',
  userId: 'USER_123'
});
```

**Response:**

```typescript
{
  success: true,
  status: 'SUCCESS',
  source: 'MASTERPASS',
  message: 'Cards fetched successfully',
  data: {
    cards: [
      {
        cardId: 1111111111111,
        cardAlias: 'MyCard',
        cardState: 'Activated',
        maskedCardNumber: '540667******0001',
        uniqueCardNumber: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        cardType: 'Credit',
        productName: 'Maximum',
        cardBin: '540667',
        cardIssuerIcaNumber: '1111',
        cardValidationType: 'OTP',
        isDefaultCard: false,
        isExpired: false,
        isMasterpassMember: true
      }
    ],
    accountInformation: {
      isAccountLinked: true
    }
  }
}
```

##### `PaywallJsSdk.providers.masterpass.removeCard(params)`

Kayıtlı kartı siler.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `accountKey` | string | ✅ | Kullanıcı account key |
| `cardAlias` | string | ✅ | Silinecek kartın alias'ı |

**Örnek:**

```typescript
const result = await PaywallJsSdk.providers.masterpass.removeCard({
  accountKey: '905437892802',
  cardAlias: 'MyCard'
});
```

#### Merchant Link İşlemleri

##### `PaywallJsSdk.providers.masterpass.accountAccess(params)`

Hesap erişimi sağlar ve kayıtlı kartları listeler. **userId ZORUNLU**.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `accountKey` | string | ✅ | Kullanıcı account key |
| `accountKeyType` | string | ✅ | Account key tipi: `'Msisdn'` |
| `userId` | string | ✅ | Kullanıcı ID (ZORUNLU) |

**Örnek:**

```typescript
const account = await PaywallJsSdk.providers.masterpass.accountAccess({
  accountKey: '905437892802',
  accountKeyType: 'Msisdn',
  userId: 'USER_123'
});
```

##### `PaywallJsSdk.providers.masterpass.merchantLink(params)`

Kullanıcıyı merchant'a bağlar.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `accountKey` | string | ✅ | Kullanıcı account key |

**Örnek:**

```typescript
const result = await PaywallJsSdk.providers.masterpass.merchantLink({
  accountKey: '905437892802'
});
```

**Response (OTP Gerekli):**

```typescript
{
  success: true,
  status: 'ACTION_REQUIRED',
  source: 'MASTERPASS',
  actionType: 'BANK_OTP',
  message: 'Bank OTP verification is required...',
  data: {
    token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  }
}
```

##### `PaywallJsSdk.providers.masterpass.merchantUnlink(params)`

Merchant bağlantısını kaldırır.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `accountKey` | string | ✅ | Kullanıcı account key |

**Örnek:**

```typescript
const result = await PaywallJsSdk.providers.masterpass.merchantUnlink({
  accountKey: '905437892802'
});
```

##### `PaywallJsSdk.providers.masterpass.verifyOtp(params)`

OTP kodunu doğrular.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `otpCode` | string | ✅ | OTP kodu |

**Örnek:**

```typescript
const result = await PaywallJsSdk.providers.masterpass.verifyOtp({
  otpCode: '123456'
});
```

**Response:**

```typescript
{
  success: true,
  status: 'SUCCESS',
  source: 'MASTERPASS',
  message: 'OTP verified successfully',
  data: {
    isVerified: true,
    token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    cardUniqueNumber: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    retrievalReferenceNumber: '222222222222'
  }
}
```

##### `PaywallJsSdk.providers.masterpass.resendOtp()`

OTP kodunu yeniden gönderir.

**Parametreler:**

Bu fonksiyon parametre almaz. OTP token'ı session state'inden otomatik alınır.

**Örnek:**

```typescript
const result = await PaywallJsSdk.providers.masterpass.resendOtp();
```

---

### 4.3. Payment İşlemleri

#### Payment Init

##### `PaywallJsSdk.payment.init(params)`

Ödeme işlemini başlatır. Manuel kart veya kayıtlı kart ile ödeme yapılabilir.

**Parametreler:**

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `sessionId` | string | ✅ | Session ID (`InitAutomatic` response'undan alınan) |
| `paymentSource` | string | ✅ | Ödeme kaynağı: `'MANUAL_CARD'` veya `'REGISTERED_CARD'` |
| `paymentDetail` | object | ✅ | Ödeme detayları |
| `paymentDetail.amount` | number | ✅ | Ödeme tutarı |
| `paymentDetail.currencyId` | number | ✅ | Para birimi ID (949: TRY) |
| `paymentDetail.merchantUniqueCode` | string | ✅ | Benzersiz sipariş kodu |
| `paymentDetail.trackingCode` | string | ✅ | Takip kodu |
| `paymentDetail.successUrl` | string | ✅ | Başarı URL'i |
| `paymentDetail.failUrl` | string | ✅ | Hata URL'i |
| `paymentDetail.clientIp` | string | ✅ | İstemci IP adresi |
| `paymentDetail.installment` | number | ✅ | Taksit sayısı |
| `paymentDetail.channelId` | number | ❌ | Kanal ID |
| `paymentDetail.tagId` | number | ❌ | Tag ID |
| `card` | object | ✅ | Paywall'a gönderilecek masked kart bilgileri |
| `card.cardBin` | string | ✅ | Kart BIN (ilk 6 hane) |
| `card.cardMasked` | string | ✅ | Maskelenmiş kart numarası |
| `card.ownerName` | string | ✅ | Kart sahibi adı |
| `card.cardAlias` | string | ❌ | Kayıtlı kart alias'ı (kayıtlı kart için) |
| `cardData` | object | ✅ | Masterpass'e gönderilecek hassas kart bilgileri |
| `cardData.cardNumber` | string | ❌ | Kart numarası (manuel kart için) |
| `cardData.expiryDate` | string | ❌ | Son kullanma tarihi (MMYY formatında, manuel kart için) |
| `cardData.cvv` | string | ❌ | CVV kodu (manuel kart için) |
| `cardData.cardAlias` | string | ❌ | Kayıtlı kart alias'ı (kayıtlı kart için) |
| `customer` | object | ❌ | Müşteri bilgileri |
| `products` | array | ✅ | Ürün listesi |

**Örnek (Manuel Kart):**

```typescript
const payment = await PaywallJsSdk.payment.init({
  sessionId: session.data.sessionId,
  paymentSource: 'MANUAL_CARD',
  paymentDetail: {
    amount: 100.00,
    currencyId: 949,
    merchantUniqueCode: 'ORDER-001',
    trackingCode: 'TRACK-001',
    successUrl: 'https://merchant.com/success',
    failUrl: 'https://merchant.com/fail',
    clientIp: '192.168.1.1',
    installment: 1
  },
  card: {
    cardBin: '540667',
    cardMasked: '540667******0001',
    ownerName: 'John Doe'
  },
  cardData: {
    cardNumber: '5528790000000008',
    expiryDate: '2612',
    cvv: '123'
  },
  products: [
    {
      productId: 'PROD-001',
      productName: 'Product 1',
      productAmount: 100.00
    }
  ]
});
```

**Response:**

```typescript
{
  success: true,
  status: 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED',
  source: 'PAYWALL' | 'MASTERPASS',
  actionType?: 'BANK_OTP' | '3D',
  message?: string,
  data: {
    sessionId: string,
    status: 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED',
    actionType?: 'BANK_OTP' | '3D',
    token?: string, // OTP için token
    redirectUrl?: string, // 3D Secure için URL
    retrievalReferenceNumber?: string,
    paymentId?: number,
    masterpassPaymentId?: string,
    activityId?: number,
    uniqueCode?: string,
    merchantUniqueCode?: string
  }
}
```

#### Register and Purchase (YENİ ÖZELLİK)

##### `PaywallJsSdk.payment.registerAndPurchase(params)`

Kart kaydı ve ödeme işlemini tek seferde yapar. Bu fonksiyon hem kart kaydı hem de ödeme işlemini gerçekleştirir.

**ÖNEMLİ ÖZELLİKLER:**

- Hem kart kaydı hem de ödeme işlemini tek seferde yapar
- Paywall init endpoint'ine istek atar (`POST /api/paywall/masterpass/by/sdk/payment/init`)
- Paywall'dan gelen `MasterpassRequestBody` içindeki placeholder'ları gerçek kart bilgileriyle değiştirir
- Masterpass SDK'ya `registerAndPurchase` çağrısı yapar
- `markAsStarted` endpoint'ine bildirim gönderir
- **cardAlias ZORUNLU** - Kart kaydı için alias gereklidir
- Kart bilgileri RSA ile şifrelenir ve sadece Masterpass SDK'ya gönderilir (Paywall'a gitmez)

**Parametreler:**

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
| `customer.fullName` | string | ❌ | Müşteri tam adı |
| `customer.phone` | string | ❌ | Müşteri telefonu |
| `customer.customerId` | string | ❌ | Müşteri ID |
| `customer.email` | string | ❌ | Müşteri e-posta |
| `customer.identityNumber` | string | ❌ | Müşteri TC kimlik no |
| `force3D` | boolean | ❌ | 3D Secure zorunlu mu? (default: `false`) |
| `secure3DModel` | string | ❌ | `'3D'` veya `'NON_SECURE'` |
| `isMsisdnValidatedByMerchant` | boolean | ❌ | Telefon merchant tarafından doğrulandı mı? (default: `true`) |

**Response:**

```typescript
{
  success: boolean,
  status: 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED',
  actionType?: 'BANK_OTP' | '3D',
  token?: string, // OTP için token
  redirectUrl?: string, // 3D Secure için URL
  retrievalReferenceNumber?: string, // İşlem referans numarası
  message?: string,
  data: {
    sessionId: string,
    status: 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED',
    actionType?: 'BANK_OTP' | '3D',
    token?: string,
    redirectUrl?: string,
    retrievalReferenceNumber?: string,
    paymentId?: number,
    masterpassPaymentId?: string,
    activityId?: number,
    uniqueCode?: string,
    merchantUniqueCode?: string
  },
  providerMeta?: {
    httpStatus?: number,
    responseCode?: string,
    raw?: any
  }
}
```

**Response Code Handling:**

- `responseCode 0000` → `SUCCESS` (Ödeme başarılı)
- `responseCode 5001` → `ACTION_REQUIRED`, `actionType: 'BANK_OTP'` (OTP doğrulama gerekiyor)
- `responseCode 5010` → `ACTION_REQUIRED`, `actionType: '3D'` (3D Secure doğrulama gerekiyor)
- Diğer kodlar → `FAILED`

**Kullanım Örneği:**

```typescript
// 1. SDK + Session hazırla
const initResult = await PaywallJsSdk.InitAutomatic({
  environment: 'test',
  token: 'TOKEN_FROM_BACKEND',
  includeMasterpassSession: true
});

// 2. Provider init
await PaywallJsSdk.providers.masterpass.init();

// 3. Register and Purchase
const result = await PaywallJsSdk.payment.registerAndPurchase({
  sessionId: initResult.data.body.Masterpass.SessionId,
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

## 5. Response Formatları

### 5.1. SdkResponse

Tüm SDK fonksiyonları `SdkResponse<T>` formatında response döner:

```typescript
interface SdkResponse<T> {
  success: boolean;
  status: 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED';
  source: 'SDK' | 'PAYWALL' | 'MASTERPASS';
  message?: string;
  errorCode?: string;
  actionType?: 'BANK_OTP' | '3D' | 'MASTERPASS_OTP' | 'MERCHANT_LINK_REQUIRED';
  data?: T;
  providerMeta?: {
    httpStatus?: number;
    responseCode?: string;
    raw?: any;
  };
}
```

### 5.2. OTP Response

OTP gerektiren işlemlerde:

```typescript
{
  success: false,
  status: 'ACTION_REQUIRED',
  actionType: 'BANK_OTP',
  data: {
    token: string; // OTP doğrulama için token
    isVerified: false; // OTP henüz doğrulanmadı
  }
}
```

OTP doğrulandıktan sonra:

```typescript
{
  success: true,
  status: 'SUCCESS',
  data: {
    isVerified: true; // OTP doğrulandı
    cardUniqueNumber?: string;
    retrievalReferenceNumber?: string;
  }
}
```

### 5.3. 3D Secure Response

```typescript
{
  success: false,
  status: 'ACTION_REQUIRED',
  actionType: '3D',
  data: {
    redirectUrl: string; // 3D Secure form URL'i
    successUrl?: string;
    failUrl?: string;
  }
}
```

---

## 6. Güvenlik ve PCI-DSS Uyumluluğu

### 6.1. Kart Bilgileri

- **Kart bilgileri (PAN, CVV) ASLA Paywall backend'e gönderilmez**
- Kart bilgileri RSA ile şifrelenir ve sadece Masterpass SDK'ya iletilir
- SDK state'inde, loglarda veya storage'da kart bilgileri tutulmaz
- Kart bilgileri sadece local function scope içinde yaşar

### 6.2. Token Yönetimi

- SDK token üretmez, refresh etmez
- Token merchant backend'den alınmalıdır
- Merchant secret key SDK'ya verilmez

### 6.3. Güvenli İletişim

- Tüm API çağrıları HTTPS üzerinden yapılır
- Kart bilgileri RSA-2048 ile şifrelenir

---

## 7. Hata Yönetimi

### 7.1. Hata Kodları

| Hata Kodu | Açıklama |
|-----------|----------|
| `MISSING_CARD_DATA` | Kart bilgileri eksik |
| `MISSING_CARD_ALIAS` | cardAlias eksik (registerAndPurchase için) |
| `INVALID_CARD_NUMBER_FORMAT` | Kart numarası formatı geçersiz |
| `INVALID_EXPIRY_DATE_FORMAT` | Son kullanma tarihi formatı geçersiz |
| `INVALID_CVV_FORMAT` | CVV formatı geçersiz |
| `ACCOUNT_NOT_FOUND` | Hesap bulunamadı |
| `MASTERPASS_ERROR` | Masterpass hatası |
| `SESSION_EXPIRED` | Session süresi dolmuş |
| `MISSING_TOKEN` | Token eksik |
| `MISSING_SESSION_ID` | Session ID eksik |
| `4004` | Kart zaten kayıtlı (Masterpass) |
| `4005` | User ID zaten kullanımda (Masterpass) |
| `5001` | OTP doğrulama gerekli (Masterpass) |
| `5010` | 3D Secure doğrulama gerekli (Masterpass) |

### 7.2. Hata Handling

```typescript
try {
  const result = await PaywallJsSdk.payment.registerAndPurchase(params);
  
  if (!result.success) {
    console.error('Hata:', result.message);
    console.error('Hata kodu:', result.errorCode);
    
    // Hata koduna göre işlem yap
    if (result.errorCode === 'MISSING_CARD_ALIAS') {
      // cardAlias eksik, kullanıcıdan al
    } else if (result.errorCode === 'SESSION_EXPIRED') {
      // Session süresi dolmuş, yeni session oluştur
    }
  }
} catch (error) {
  console.error('Beklenmeyen hata:', error);
}
```

---

## 8. Best Practices

### 8.1. Session Yönetimi

- Her ödeme işlemi için yeni session oluştur
- Session'ı güvenli bir şekilde sakla
- Session timeout'larını handle et

```typescript
// Session kontrolü
if (!isSessionValid()) {
  // InitPaywallSdk ile yeni session oluştur
  const newSession = await PaywallJsSdk.InitPaywallSdk({
    environment: 'test',
    token: await getTokenFromBackend(),
    includeMasterpassSession: true
  });
  await PaywallJsSdk.providers.masterpass.init();
}
```

### 8.2. Error Handling

- Tüm SDK çağrılarını try-catch ile sarmala
- Response success kontrolü yap
- Kullanıcıya anlamlı hata mesajları göster

```typescript
async function makePayment() {
  try {
    const result = await PaywallJsSdk.payment.init(params);
    
    if (!result.success) {
      // Hata durumunu handle et
      showErrorToUser(result.message);
      return;
    }
    
    // Başarılı durumu handle et
    handlePaymentSuccess(result.data);
  } catch (error) {
    // Beklenmeyen hataları handle et
    console.error('Payment error:', error);
    showErrorToUser('Ödeme işlemi sırasında bir hata oluştu.');
  }
}
```

### 8.3. 3D Secure Handling

- SDK otomatik redirect yapmaz
- Merchant UI redirectUrl'i kendisi açmalıdır
- 3D callback'leri handle et

```typescript
if (result.data.actionType === '3D') {
  // 3D Secure redirect
  window.location.href = result.data.redirectUrl;
  
  // Veya yeni pencerede aç
  // window.open(result.data.redirectUrl, '_blank');
}
```

### 8.4. OTP Handling

- SDK OTP doğrulaması yapmaz
- Merchant backend OTP doğrulamasını yapar
- Token'ı merchant backend'e gönder

```typescript
if (result.data.actionType === 'BANK_OTP') {
  // OTP token'ı backend'e gönder
  const otpToken = result.data.token;
  
  // Kullanıcıdan OTP al
  const otpCode = await getUserInput('OTP kodunu girin:');
  
  // Backend'e OTP doğrulama isteği gönder
  const verifyResult = await verifyOtpOnBackend(otpToken, otpCode);
  
  if (verifyResult.success) {
    // Ödeme tamamlandı
  }
}
```

---

## 9. Örnekler

### 9.1. Tam Ödeme Akışı

```typescript
async function completePaymentFlow() {
  try {
    // 1. SDK + Session + Provider Hazırla
    const initResult = await PaywallJsSdk.InitPaywallSdk({
      environment: 'test',
      token: await getTokenFromBackend(),
      includeMasterpassSession: true
    });
    
    if (!initResult.success) {
      throw new Error('SDK initialization failed');
    }
    
    // 2. Provider Init
    await PaywallJsSdk.providers.masterpass.init();
    
    const sessionId = initResult.data.body.Masterpass.SessionId;
    
    // 3. Payment
    const payment = await PaywallJsSdk.payment.init({
      sessionId: sessionId,
      paymentSource: 'REGISTERED_CARD',
      paymentDetail: {
        amount: 100.00,
        currencyId: 949,
        merchantUniqueCode: 'ORDER-001',
        trackingCode: 'TRACK-001',
        successUrl: 'https://merchant.com/success',
        failUrl: 'https://merchant.com/fail',
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
        cardAlias: 'MyCard'
      },
      products: [
        {
          productId: 'PROD-001',
          productName: 'Product 1',
          productAmount: 100.00
        }
      ]
    });
    
    // 4. Response Handling
    if (payment.success && payment.data.status === 'SUCCESS') {
      console.log('Ödeme başarılı!');
      return { success: true, data: payment.data };
    } else if (payment.data.status === 'ACTION_REQUIRED') {
      if (payment.data.actionType === '3D') {
        window.location.href = payment.data.redirectUrl;
        return { success: true, requires3D: true };
      } else if (payment.data.actionType === 'BANK_OTP') {
        return { success: true, requiresOTP: true, token: payment.data.token };
      }
    } else {
      throw new Error(payment.message || 'Payment failed');
    }
  } catch (error) {
    console.error('Payment flow error:', error);
    return { success: false, error: error.message };
  }
}
```

### 9.2. Merchant Link Akışı

```typescript
async function merchantLinkFlow() {
  try {
    // 1. SDK + Session Hazırla
    const initResult = await PaywallJsSdk.InitPaywallSdk({
      environment: 'test',
      token: await getTokenFromBackend(),
      includeMasterpassSession: true
    });
    
    // 2. Provider Init
    await PaywallJsSdk.providers.masterpass.init();
    
    // 4. Account Access
    const account = await PaywallJsSdk.providers.masterpass.accountAccess({
      accountKey: '905437892802',
      accountKeyType: 'Msisdn',
      userId: 'USER_123'
    });
    
    if (account.data.status === 'ACTION_REQUIRED' && account.data.actionType === 'MERCHANT_LINK_REQUIRED') {
      // 5. Merchant Link
      const link = await PaywallJsSdk.providers.masterpass.merchantLink({
        accountKey: '905437892802'
      });
      
      if (link.data.status === 'ACTION_REQUIRED' && link.data.actionType === 'BANK_OTP') {
        // 6. OTP Doğrulama
        const otpCode = await getUserInput('OTP kodunu girin:');
        const verify = await PaywallJsSdk.providers.masterpass.verifyOtp({
          otpCode: otpCode
        });
        
        if (verify.success) {
          console.log('Merchant link başarılı!');
        }
      }
    }
    
    // 7. Kart Listesi
    const cards = await PaywallJsSdk.providers.masterpass.getCardList({
      accountKey: '905437892802',
      accountKeyType: 'Msisdn',
      userId: 'USER_123'
    });
    
    return cards.data.cards;
  } catch (error) {
    console.error('Merchant link flow error:', error);
    throw error;
  }
}
```

### 9.3. Register and Purchase Akışı

```typescript
async function registerAndPurchaseFlow() {
  try {
    // 1. SDK + Session Hazırla
    const initResult = await PaywallJsSdk.InitPaywallSdk({
      environment: 'test',
      token: await getTokenFromBackend(),
      includeMasterpassSession: true
    });
    
    // 2. Provider Init
    await PaywallJsSdk.providers.masterpass.init();
    
    // 3. Register and Purchase
    const result = await PaywallJsSdk.payment.registerAndPurchase({
      sessionId: initResult.data.body.Masterpass.SessionId,
      accountKey: '905437892802',
      accountKeyType: 'Msisdn',
      merchantUserId: 'USER_123',
      paymentDetail: {
        amount: 10000, // 100.00 TRY
        currencyId: 949,
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
        expiryDate: '2612',
        cvv: '123',
        cardAlias: 'My Card' // ZORUNLU
      },
      products: [
        {
          productId: 'PROD-001',
          productName: 'Product 1',
          productAmount: 10000
        }
      ]
    });
    
    // 4. Response Handling
    if (result.success) {
      if (result.data.status === 'SUCCESS') {
        console.log('Kart kaydedildi ve ödeme başarılı!');
        return { success: true, data: result.data };
      } else if (result.data.status === 'ACTION_REQUIRED') {
        if (result.data.actionType === 'BANK_OTP') {
          // OTP doğrulama gerekiyor
          const otpCode = await getUserInput('OTP kodunu girin:');
          // OTP doğrulaması merchant backend'de yapılmalı
          return { success: true, requiresOTP: true, token: result.data.token };
        } else if (result.data.actionType === '3D') {
          // 3D Secure gerekiyor
          window.location.href = result.data.redirectUrl;
          return { success: true, requires3D: true };
        }
      }
    } else {
      throw new Error(result.message || 'Register and purchase failed');
    }
  } catch (error) {
    console.error('Register and purchase flow error:', error);
    return { success: false, error: error.message };
  }
}
```

---

## 10. TypeScript Desteği

SDK TypeScript ile kullanılabilir. Type definitions dosyası şu şekilde tanımlanabilir:

```typescript
// paywall-sdk.d.ts
declare global {
  interface Window {
    PaywallJsSdk: PaywallJsSdkType;
    PaywallSDK: {
      PaywallJsSdk: PaywallJsSdkType;
    };
  }
}

interface SdkResponse<T = any> {
  success: boolean;
  status: 'SUCCESS' | 'ACTION_REQUIRED' | 'FAILED';
  source: 'SDK' | 'PAYWALL' | 'MASTERPASS';
  message?: string;
  errorCode?: string;
  actionType?: 'BANK_OTP' | '3D' | 'MASTERPASS_OTP' | 'MERCHANT_LINK_REQUIRED';
  data?: T;
  providerMeta?: {
    httpStatus?: number;
    responseCode?: string;
    raw?: any;
  };
}

interface PaywallJsSdkType {
  InitPaywallSdk: (params: {
    token: string;
    environment: 'dev' | 'test' | 'prod';
    includeMasterpassSession?: boolean;
  }) => Promise<SdkResponse>;
  
  providers: {
    masterpass: {
      init: (params?: { accountKey?: string }) => Promise<SdkResponse>;
      AddCard: (params: {
        accountKey: string;
        accountKeyType: string;
        userId: string;
        accountAliasName: string;
        cardHolderName: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
        requestReferenceNumber: string;
        deviceFingerPrint?: string;
      }) => Promise<SdkResponse>;
      getCardList: (params: {
        accountKey: string;
        accountKeyType: string;
        userId: string;
      }) => Promise<SdkResponse>;
      removeCard: (params: {
        accountKey: string;
        cardAlias: string;
      }) => Promise<SdkResponse>;
      accountAccess: (params: {
        accountKey: string;
        accountKeyType: string;
        userId: string;
      }) => Promise<SdkResponse>;
      merchantLink: (params: {
        accountKey: string;
      }) => Promise<SdkResponse>;
      merchantUnlink: (params: {
        accountKey: string;
      }) => Promise<SdkResponse>;
      verifyOtp: (params: {
        otpCode: string;
      }) => Promise<SdkResponse>;
      resendOtp: () => Promise<SdkResponse>;
    };
  };
  
  payment: {
    init: (params: any) => Promise<SdkResponse>;
    registerAndPurchase: (params: {
      sessionId: string;
      accountKey: string;
      accountKeyType: string;
      merchantUserId: string;
      paymentDetail: {
        amount: number;
        currencyId: number;
        merchantUniqueCode: string;
        trackingCode: string;
        successUrl: string;
        failUrl: string;
        clientIp: string;
        installment: number;
        channelId?: number;
        tagId?: number;
      };
      cardData: {
        cardNumber: string;
        cardHolderName: string;
        expiryDate: string;
        cvv: string;
        cardAlias: string;
      };
      products: Array<{
        productId: string;
        productName: string;
        productCategory?: string;
        productDescription?: string;
        productAmount: number;
      }>;
      customer?: {
        fullName?: string;
        phone?: string;
        customerId?: string;
        email?: string;
        identityNumber?: string;
      };
      force3D?: boolean;
      secure3DModel?: string;
      isMsisdnValidatedByMerchant?: boolean;
    }) => Promise<SdkResponse>;
  };
}

export {};
```

---

## 11. Debugging

### 11.1. Log Seviyeleri

SDK, farklı log seviyeleri destekler:

- `'none'`: Log yok
- `'error'`: Sadece hatalar (default)
- `'info'`: Bilgilendirme mesajları
- `'debug'`: Detaylı debug bilgileri

**Örnek:**

```typescript
await PaywallJsSdk.InitPaywallSdk({
  environment: 'test',
  token: 'TOKEN',
  includeMasterpassSession: true
});
```

### 11.2. Debug Mode Aktifleştirme

Debug mode aktifleştirildiğinde, `providerMeta.raw` içinde detaylı response bilgileri bulunur:

```typescript
const result = await PaywallJsSdk.payment.init(params);

if (result.providerMeta?.raw) {
  console.log('Raw response:', result.providerMeta.raw);
}
```

### 11.3. Provider Meta Bilgileri

Tüm response'larda `providerMeta` içinde HTTP status ve response code bilgileri bulunur:

```typescript
{
  success: true,
  status: 'SUCCESS',
  data: { ... },
  providerMeta: {
    httpStatus: 200,
    responseCode: '0000',
    raw: { ... } // debug mode aktifse
  }
}
```

---

## 12. Sürüm Notları

### Version 1.0.4

**Yeni Özellikler:**

- `registerAndPurchase()` metodu eklendi - Kart kaydı ve ödeme tek seferde
- Geliştirilmiş hata mesajları
- TypeScript type definitions iyileştirildi

**Breaking Changes:**

- Yok

**Deprecated Fonksiyonlar:**

- Yok

---

## 13. Destek ve İletişim

### 13.1. GitHub Repository

SDK'nın kaynak kodları ve dokümantasyonu GitHub'da bulunmaktadır.

### 13.2. Issue Reporting

Sorun bildirmek veya özellik isteği yapmak için GitHub Issues kullanabilirsiniz.

### 13.3. Dokümantasyon Linkleri

- [API Referansı](#4-api-referansı)
- [Örnekler](#9-örnekler)
- [Best Practices](#8-best-practices)

---

## Ek Notlar

- Tüm fonksiyonlar Promise döner
- **Session oluşturma merchant backend tarafından yapılmalıdır**
- SDK initialize edilmeden fonksiyonlar çağrılamaz
- Session bilgileri `InitPaywallSdk()` ile otomatik SDK'ya taşınır
- Kart bilgileri RSA ile şifrelenerek gönderilir
- 3D Secure akışında `redirectUrl`'e yönlendirme yapılmalıdır
- OTP doğrulama merchant backend tarafından yapılmalıdır
- `registerAndPurchase` için `cardAlias` zorunludur
- Response code `5001` → OTP gerekiyor
- Response code `5010` → 3D Secure gerekiyor

---

**Son Güncelleme:** 2024
