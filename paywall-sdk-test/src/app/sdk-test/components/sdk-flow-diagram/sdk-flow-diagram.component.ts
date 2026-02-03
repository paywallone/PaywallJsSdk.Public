import { Component, OnInit, AfterViewInit } from '@angular/core';
import mermaid from 'mermaid';

@Component({
  selector: 'app-sdk-flow-diagram',
  standalone: false,
  templateUrl: './sdk-flow-diagram.component.html',
  styleUrls: ['./sdk-flow-diagram.component.scss']
})
export class SdkFlowDiagramComponent implements OnInit, AfterViewInit {
  activeTab: 'manual' | 'automatic' = 'automatic';

  initManualDiagram = `
    graph TB
      Start([Start]) --> Docs["DETAYLI DÖKÜMANTASYON<br/>Buraya Tıklayın"]
      Docs --> Backend["Merchant Backend<br/>Session oluştur"]
      Backend --> InitManual[1. PaywallJsSdk.InitManual<br/>SDK başlatma]
      
      click Docs "https://developer.paywall.one/client-side-servisler/1.-yetkilendirme" "Manuel Yetkilendirme Dokümantasyonu" _blank
      InitManual --> InitManualParams["Params:<br/>- environment: 'test'/'prod'<br/>- token: Backend'den token<br/>(Session bilgisi YOK)"]
      InitManualParams --> InitManualCheck{Success?}
      
      InitManualCheck -->|Yes| ProviderInit[2. PaywallJsSdk.providers<br/>.masterpass.init<br/>Provider hazırlama]
      InitManualCheck -->|No| Error1[Init Failed]
      
      ProviderInit --> ProviderCheck{Success?}
      ProviderCheck -->|Yes| Operations[3. İşlemler]
      ProviderCheck -->|No| Error2[Provider Init Failed]
      
      Operations --> AccountAccess["accountAccess<br/>Masterpass hesap kontrolü"]
      Operations --> MerchantLink["merchantLink<br/>Kart bağlama"]
      Operations --> AddCard["addCard<br/>Yeni kart ekleme"]
      
      AccountAccess --> Payment[4. Ödeme İşlemleri]
      MerchantLink --> Payment
      AddCard --> Payment
      
      Payment --> PayRegistered["payment.init<br/>Kayıtlı kart ile ödeme"]
      Payment --> PayManual["payment.init<br/>Manuel kart ile ödeme"]
      Payment --> RegisterPurchase["registerAndPurchase<br/>Kart kaydet ve öde"]
      
      PayRegistered --> ResponseCheck{Response<br/>Code?}
      PayManual --> ResponseCheck
      RegisterPurchase --> ResponseCheck
      
      ResponseCheck -->|5001| VerifyOtp["verifyOtp<br/>OTP doğrulama"]
      ResponseCheck -->|5010| ThreeDRedirect["3D Secure<br/>Redirect to URL"]
      ResponseCheck -->|SUCCESS| Success[Ödeme Başarılı]
      
      VerifyOtp --> FinalCheck{Success?}
      ThreeDRedirect --> FinalCheck
      
      FinalCheck -->|Yes| Success
      FinalCheck -->|No| Failed[Ödeme Başarısız]
      
      style Docs fill:#FF6B6B,stroke:#C92A2A,stroke-width:4px,color:#fff
      style Backend fill:#FFA726,stroke:#F57C00,stroke-width:3px,color:#fff
      style InitManual fill:#4A90E2,stroke:#2E5C8A,stroke-width:3px,color:#fff
      style ProviderInit fill:#50C878,stroke:#2E7D4E,stroke-width:3px,color:#fff
      style Operations fill:#9B59B6,stroke:#6C3483,stroke-width:3px,color:#fff
      style Payment fill:#E67E22,stroke:#A04000,stroke-width:3px,color:#fff
      style Success fill:#27AE60,stroke:#1E8449,stroke-width:3px,color:#fff
      style Failed fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style Error1 fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style Error2 fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
  `;

  initAutomaticDiagram = `
    graph TB
      Start([Start]) --> Backend["Merchant Backend<br/>Session + Token oluştur"]
      Backend --> Docs["DETAYLI DÖKÜMANTASYON<br/>Buraya Tıklayın"]
      
      click Docs "https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk" "SDK Yetkilendirme Dokümantasyonu" _blank
      
      Docs --> InitAutomatic[1. PaywallJsSdk.InitAutomatic<br/>Tek adımda hazırlık]
      InitAutomatic --> InitAutoParams["Params:<br/>- environment: 'test'/'prod'<br/>- token: Backend'den token<br/>- includeMasterpassSession: true"]
      
      InitAutoParams --> AutoProcess["SDK İşlemleri:<br/>Token Verify"]
      
      AutoProcess --> AutoCheck{Success?}
      AutoCheck -->|No| Error1[Init Failed]
      
      AutoCheck -->|Yes| SessionData["Response'ta:<br/>- SessionId (Backend'den)<br/>- MasterpassToken (Backend'den)<br/>- userId, userPhone"]
      
      SessionData --> ProviderInit[2. PaywallJsSdk.providers<br/>.masterpass.init<br/>Provider hazırlama]
      
      ProviderInit --> ProviderCheck{Success?}
      ProviderCheck -->|No| Error2[Provider Init Failed]
      
      ProviderCheck -->|Yes| Operations[3. İşlemler]
      
      Operations --> AccountAccess["accountAccess<br/>Masterpass hesap kontrolü"]
      Operations --> MerchantLink["merchantLink<br/>Kart bağlama"]
      Operations --> AddCard["addCard<br/>Yeni kart ekleme"]
      Operations --> DeleteCard["deleteCard<br/>Kart silme"]
      
      AccountAccess --> Payment[4. Ödeme İşlemleri]
      MerchantLink --> Payment
      AddCard --> Payment
      DeleteCard --> Payment
      
      Payment --> PayRegistered["payment.init<br/>Kayıtlı kart ile ödeme<br/>sessionId gerekli"]
      Payment --> PayManual["payment.init<br/>Manuel kart ile ödeme<br/>sessionId gerekli"]
      Payment --> RegisterPurchase["registerAndPurchase<br/>Kart kaydet ve öde<br/>sessionId gerekli"]
      
      PayRegistered --> ResponseCheck{Response<br/>Code?}
      PayManual --> ResponseCheck
      RegisterPurchase --> ResponseCheck
      
      ResponseCheck -->|5001| VerifyOtp["verifyOtp<br/>OTP doğrulama"]
      ResponseCheck -->|5010| ThreeDRedirect["3D Secure<br/>Redirect to URL"]
      ResponseCheck -->|SUCCESS| Success[Ödeme Başarılı]
      
      VerifyOtp --> FinalCheck{Success?}
      ThreeDRedirect --> FinalCheck
      
      FinalCheck -->|Yes| Success
      FinalCheck -->|No| Failed[Ödeme Başarısız]
      
      style Docs fill:#FF6B6B,stroke:#C92A2A,stroke-width:4px,color:#fff
      style Backend fill:#FFA726,stroke:#F57C00,stroke-width:3px,color:#fff
      style InitAutomatic fill:#E67E22,stroke:#A04000,stroke-width:4px,color:#fff
      style AutoProcess fill:#F39C12,stroke:#D68910,stroke-width:3px,color:#fff
      style ProviderInit fill:#50C878,stroke:#2E7D4E,stroke-width:3px,color:#fff
      style Operations fill:#9B59B6,stroke:#6C3483,stroke-width:3px,color:#fff
      style Payment fill:#3498DB,stroke:#2874A6,stroke-width:3px,color:#fff
      style Success fill:#27AE60,stroke:#1E8449,stroke-width:3px,color:#fff
      style Failed fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style Error1 fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style Error2 fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style SessionData fill:#1ABC9C,stroke:#148F77,stroke-width:3px,color:#fff
  `;

  comparisonDiagram = `
    graph LR
      subgraph Manual["InitManual (Manuel Yöntem)"]
        M0[Backend: Session oluştur] --> M1[1. InitManual<br/>Session bilgisi yok]
        M1 --> M2[2. Provider Init]
        M2 --> M3[3. İşlemler]
      end
      
      subgraph Auto["InitAutomatic (Önerilen)"]
        A0[Backend: Session + Token oluştur] --> A1[1. InitAutomatic<br/>Token içinde Session var]
        A1 --> A2[2. Provider Init]
        A2 --> A3[3. İşlemler]
      end
      
      Manual -.->|Session manuel taşınır| Comparison[Karşılaştırma]
      Auto -.->|Session otomatik gelir| Comparison
      
      style Manual fill:#E8F4F8,stroke:#4A90E2,stroke-width:2px
      style Auto fill:#E8F8F0,stroke:#27AE60,stroke-width:3px
      style Comparison fill:#FFF3CD,stroke:#F39C12,stroke-width:2px
      style A1 fill:#27AE60,stroke:#1E8449,color:#fff
  `;

  codeExampleAutomatic = `// Backend'den token al (içinde session bilgileri var)
// Backend: Session + Temp Token oluşturur
const tokenFromBackend = await getTokenFromMerchantBackend();

// 1. SDK + Session bilgilerini tek adımda hazırla
const result = await PaywallJsSdk.InitAutomatic({
  environment: 'test',
  token: tokenFromBackend, // Backend'den gelen token (session içerir)
  includeMasterpassSession: true
});

// 2. Provider'ı hazırla
await PaywallJsSdk.providers.masterpass.init();

// 3. SessionId'yi al (Backend'den gelen)
const sessionId = result.data.body.Masterpass.SessionId;

// 4. Ödeme yap
const payment = await PaywallJsSdk.payment.init({
  sessionId: sessionId,
  paymentSource: 'REGISTERED_CARD',
  // ... diğer parametreler
});`;

  codeExampleManual = `// Backend'de session oluştur (SDK dışında)
// Backend: Masterpass session oluşturur
// Merchant: SessionId'yi backend'den alır ve saklar

// 1. SDK'yı başlat (session bilgisi olmadan)
const tokenFromBackend = await getTokenFromMerchantBackend();
await PaywallJsSdk.InitManual({
  environment: 'test',
  token: tokenFromBackend // Sadece token, session bilgisi yok
});

// 2. SDK'nın startSession() metodu KALDIRILDI
// Artık merchant backend'de session oluşturulmalı

// 3. Provider'ı hazırla
await PaywallJsSdk.providers.masterpass.init();

// 4. SessionId'yi merchant backend'den manuel al
const sessionId = await getSessionIdFromBackend();

// 5. Ödeme yap
const payment = await PaywallJsSdk.payment.init({
  sessionId: sessionId,
  // ...
});`;

  constructor() {}

  ngOnInit(): void {
    try {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis'
        }
      });
    } catch (error) {
      console.error('Mermaid initialization error:', error);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderDiagram();
      this.renderComparison();
    }, 200);
  }

  switchTab(tab: 'manual' | 'automatic'): void {
    this.activeTab = tab;
    setTimeout(() => {
      this.renderDiagram();
    }, 100);
  }

  async renderDiagram(): Promise<void> {
    try {
      const diagramId = this.activeTab === 'manual' ? 'mermaid-manual' : 'mermaid-automatic';
      const element = document.getElementById(diagramId);
      
      if (element) {
        element.innerHTML = this.activeTab === 'manual' ? this.initManualDiagram : this.initAutomaticDiagram;
        element.removeAttribute('data-processed');
        
        await mermaid.run({
          nodes: [element],
        });
      }
    } catch (error) {
      console.error('Mermaid render error:', error);
    }
  }

  async renderComparison(): Promise<void> {
    try {
      const element = document.getElementById('mermaid-comparison');
      if (element) {
        element.innerHTML = this.comparisonDiagram;
        element.removeAttribute('data-processed');
        
        await mermaid.run({
          nodes: [element],
        });
      }
    } catch (error) {
      console.error('Mermaid comparison render error:', error);
    }
  }
}
