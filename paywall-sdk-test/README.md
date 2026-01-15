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

## Test Senaryoları

### 1. Core SDK Init
- Merchant ID ve token ile SDK'yı başlatır
- Environment seçimi (dev/test/prod)

### 2. Session Start
- Masterpass session başlatır
- User ID ve phone number ile session oluşturur

### 3. Provider Init
- Masterpass provider'ı initialize eder
- Kart ekleme işlemlerini test eder

### 4. Payment Init
- Ödeme işlemini başlatır
- 3D Secure akışını test eder
- Action required durumlarını handle eder

## Kullanım

1. **Token Alın**: Backend'inizden geçici token alın
2. **SDK Init**: Environment ve token ile SDK'yı başlatın
3. **Session Başlat**: User bilgileri ile session oluşturun
4. **Provider Init**: Masterpass provider'ı initialize edin
5. **Payment**: Ödeme işlemini başlatın

## Notlar

- SDK sadece UMD dosyasından yüklenir, npm package kullanılmaz
- Tüm SDK çağrıları global `window.PaywallJsSdk` üzerinden yapılır
- TypeScript type definitions `paywall-sdk.d.ts` dosyasında tanımlıdır
