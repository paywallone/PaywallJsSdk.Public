import { Component, OnInit, AfterViewInit } from '@angular/core';
import mermaid from 'mermaid';

@Component({
  selector: 'app-sdk-flow-diagram',
  standalone: false,
  templateUrl: './sdk-flow-diagram.component.html',
  styleUrls: ['./sdk-flow-diagram.component.scss']
})
export class SdkFlowDiagramComponent implements OnInit, AfterViewInit {
  sdkFlowDiagram = `
    graph TB
      Start([Start]) --> Docs["🔗 DETAYLI DÖKÜMANTASYON<br/>👉 Buraya Tıklayın 👈"]
      Docs --> Backend["Merchant Backend<br/>Session + Token oluştur"]
      Backend --> BackendNote["Backend session bilgilerini<br/>token içine ekler"]
      BackendNote --> InitPaywallSdk[1. PaywallJsSdk.InitPaywallSdk<br/>SDK + Session hazırlama]
      
      click Docs "https://developer.paywall.one/client-side-servisler/2.-yetkilendirme-sdk" "SDK Yetkilendirme Dokümantasyonu" _blank
      InitPaywallSdk --> SdkParams["Params:<br/>- environment: 'test'/'prod'<br/>- token: Backend'den token<br/>- includeMasterpassSession: true"]
      SdkParams --> SdkNote["SDK otomatik parse eder:<br/>- SessionId<br/>- MasterpassToken<br/>- UserId<br/>- UserPhone<br/>(Otomatik SDK'da!)"]
      SdkNote --> InitCheck{Success?}
      
      InitCheck -->|Yes| ProviderInit[2. PaywallJsSdk.providers<br/>.masterpass.init<br/>Provider hazırlama]
      InitCheck -->|No| Error1[Init Failed]
      
      ProviderInit --> ProviderCheck{Success?}
      ProviderCheck -->|Yes| SessionData["✅ Session Bilgileri Hazır:<br/>Tüm bilgiler SDK'da<br/>Manuel set GEREKMEZ!"]
      ProviderCheck -->|No| Error2[Provider Init Failed]
      
      SessionData --> Operations[3. İşlemler]
      
      Operations --> AccountAccess["accountAccess<br/>Masterpass hesap kontrolü"]
      Operations --> MerchantLink["merchantLink<br/>Kart bağlama"]
      Operations --> AddCard["addCard<br/>Yeni kart ekleme"]
      Operations --> DeleteCard["deleteCard<br/>Kart silme"]
      
      AccountAccess --> Payment[4. Ödeme İşlemleri]
      MerchantLink --> Payment
      AddCard --> Payment
      DeleteCard --> Payment
      
      Payment --> PayRegistered["payment.init<br/>Kayıtlı kart ile ödeme<br/>(sessionId otomatik kullanılır)"]
      Payment --> PayManual["payment.init<br/>Manuel kart ile ödeme<br/>(sessionId otomatik kullanılır)"]
      Payment --> RegisterPurchase["registerAndPurchase<br/>Kart kaydet ve öde<br/>(sessionId otomatik kullanılır)"]
      
      PayRegistered --> ResponseCheck{Response<br/>Code?}
      PayManual --> ResponseCheck
      RegisterPurchase --> ResponseCheck
      
      ResponseCheck -->|5001| VerifyOtp["verifyOtp<br/>OTP doğrulama"]
      ResponseCheck -->|5010| ThreeDRedirect["3D Secure<br/>Redirect to URL"]
      ResponseCheck -->|SUCCESS| Success[✅ Ödeme Başarılı]
      
      VerifyOtp --> FinalCheck{Success?}
      ThreeDRedirect --> FinalCheck
      
      FinalCheck -->|Yes| Success
      FinalCheck -->|No| Failed[❌ Ödeme Başarısız]
      
      style Docs fill:#FF6B6B,stroke:#C92A2A,stroke-width:4px,color:#fff
      style Backend fill:#FFA726,stroke:#F57C00,stroke-width:3px,color:#fff
      style BackendNote fill:#FFE082,stroke:#FFB300,stroke-width:2px,color:#333
      style InitPaywallSdk fill:#E67E22,stroke:#A04000,stroke-width:4px,color:#fff
      style SdkParams fill:#F39C12,stroke:#D68910,stroke-width:3px,color:#fff
      style SdkNote fill:#52C41A,stroke:#389E0D,stroke-width:3px,color:#fff
      style ProviderInit fill:#50C878,stroke:#2E7D4E,stroke-width:3px,color:#fff
      style Operations fill:#9B59B6,stroke:#6C3483,stroke-width:3px,color:#fff
      style Payment fill:#3498DB,stroke:#2874A6,stroke-width:3px,color:#fff
      style Success fill:#27AE60,stroke:#1E8449,stroke-width:3px,color:#fff
      style Failed fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style Error1 fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style Error2 fill:#E74C3C,stroke:#C0392B,stroke-width:3px,color:#fff
      style SessionData fill:#1ABC9C,stroke:#148F77,stroke-width:3px,color:#fff
  `;

  codeExample = `// Backend'den token al (içinde session bilgileri var)
// Backend: Session + Temp Token oluşturur
const tokenFromBackend = await getTokenFromMerchantBackend();

// 1. SDK + Session bilgilerini tek adımda hazırla
const result = await PaywallJsSdk.InitPaywallSdk({
  environment: 'test',
  token: tokenFromBackend,
  includeMasterpassSession: true
});

// 2. Provider'ı hazırla
await PaywallJsSdk.providers.masterpass.init();

// 3. SessionId'yi al (otomatik SDK'da)
const sessionId = result.data.body.Masterpass.SessionId;

// 4. Ödeme yap
const payment = await PaywallJsSdk.payment.init({
  sessionId: sessionId,
  paymentSource: 'REGISTERED_CARD',
  // ... diğer parametreler
});

// ✅ AVANTAJ: SessionId otomatik SDK'da, manuel set gerekmez!`;

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
    }, 200);
  }

  async renderDiagram(): Promise<void> {
    try {
      const element = document.getElementById('mermaid-diagram');
      
      if (element) {
        element.innerHTML = this.sdkFlowDiagram;
        element.removeAttribute('data-processed');
        
        await mermaid.run({
          nodes: [element],
        });
      }
    } catch (error) {
      console.error('Mermaid render error:', error);
    }
  }
}
