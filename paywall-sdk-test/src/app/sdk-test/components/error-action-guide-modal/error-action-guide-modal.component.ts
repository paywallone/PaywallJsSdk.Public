import { Component } from '@angular/core';

interface ErrorAction {
  code: string;
  meaning: string;
  actions: string[];
  relatedFlow?: string;
  note?: string;
}

@Component({
  selector: 'app-error-action-guide-modal',
  standalone: false,
  templateUrl: './error-action-guide-modal.component.html',
  styleUrls: ['./error-action-guide-modal.component.scss']
})
export class ErrorActionGuideModalComponent {
  showModal = false;
  
  // Accordion states - track which errors are expanded
  expandedErrors: Set<string> = new Set();

  errorActions: ErrorAction[] = [
    {
      code: 'ACCOUNT_NOT_FOUND',
      meaning: 'Kullanıcı Masterpass sisteminde kayıtlı değil.',
      actions: [
        'Kullanıcının Masterpass\'te account oluşturması gerekir',
        'Bunun için kullanıcı en az 1 adet kart ekleyerek başarılı bir ödeme veya kart kayıt işlemi yapmalıdır'
      ],
      note: 'Masterpass hesabı otomatik oluşmaz, ilk kart kaydı ile oluşur.'
    },
    {
      code: 'ACCOUNT_NOT_LINKED_TO_MERCHANT',
      meaning: 'Kullanıcının Masterpass hesabı var ama merchant ile linkli değil.',
      actions: [
        'Ödeme akışına devam etmeden önce masterpassLinkToMerchant servisi çağrılmalıdır',
        'Kullanıcıya OTP veya onay popup\'ı gösterilir',
        'Linkleme tamamlandıktan sonra kartlar tekrar çekilir'
      ],
      relatedFlow: 'masterpassAccountAccess, masterpassLinkToMerchant()'
    },
    {
      code: 'USER_NOT_FOUND',
      meaning: 'Masterpass tarafında kullanıcı bulunamadı.',
      actions: [
        'Eğer alternatif provider VAR ise: Masterpass kaydı zorunlu tutulmaz, kart kaydetme devre dışı bırakılabilir',
        'Eğer alternatif provider YOK ise: Ödeme reddedilir, kullanıcı bilgilendirme popup\'ı gösterilir'
      ]
    },
    {
      code: 'CARD_ALREADY_EXISTS',
      meaning: 'Eklenmek istenen kart Masterpass\'te zaten mevcut.',
      actions: [
        'Kart tekrar eklenmeye çalışılmamalı',
        'Kullanıcı bilgilendirilir',
        'Mevcut kartlar listelenir',
        'Ödeme mevcut kart üzerinden devam edebilir'
      ]
    },
    {
      code: 'FRAUD_DETECTED_DUE_TO_REPETITIVE_DELETION',
      meaning: 'Art arda yapılan kart silme işlemleri fraud olarak algılandı.',
      actions: [
        'Kullanıcıya kritik uyarı gösterilir',
        'Kart ekleme / silme işlemleri durdurulur',
        'Manuel destek veya bekleme süresi önerilir'
      ]
    },
    {
      code: 'OTP_IS_NOT_VALID',
      meaning: 'Girilen OTP geçersiz.',
      actions: [
        'Kullanıcı tekrar OTP girmeye yönlendirilir',
        'Limit aşımı varsa işlem sonlandırılır',
        'Çoklu hatada ödeme akışı iptal edilir'
      ]
    },
    {
      code: 'TOKEN_HAS_EXPIRED',
      meaning: 'Masterpass token süresi dolmuş.',
      actions: [
        'Yeni token üretilmeli',
        'generateNewToken veya ilgili init servisi çağrılır',
        'Sonrasında ödeme yeniden başlatılır'
      ]
    },
    {
      code: 'MERCHANT_USER_ID_ALREADY_IN_USE',
      meaning: 'Merchant user id daha önce kullanılmış.',
      actions: [
        'Kullanıcı bilgilendirilir',
        'Alternatif bir kullanıcı id ile tekrar denenmesi gerekir',
        'Ödeme akışı durdurulur'
      ]
    },
    {
      code: 'PAYMENT_IS_NOT_VERIFIED',
      meaning: 'Ödeme doğrulaması tamamlanamadı.',
      actions: [
        '3D / OTP / Bank OTP adımlarının tamamlandığından emin olunmalı',
        'Gerekirse ödeme yeniden başlatılmalı'
      ]
    },
    {
      code: 'BANK_DOES_NOT_SUPPORT_OTP',
      meaning: 'Banka OTP doğrulamasını desteklemiyor.',
      actions: [
        'Alternatif doğrulama yöntemi denenmeli',
        '3D Secure akışına yönlendirme yapılabilir',
        'Alternatif provider varsa fallback yapılır'
      ]
    },
    {
      code: '5001',
      meaning: 'BANK_OTP_REQUIRED - Bankanın, Masterpass işlemi için ek bir Bank OTP doğrulaması talep ettiğini belirtir. Bu OTP, Masterpass OTP\'den farklıdır ve banka tarafından gönderilir.',
      actions: [
        'Kullanıcıya Bank OTP popup\'ı açılmalıdır',
        'Kullanıcı OTP\'yi girene kadar ödeme akışı bekletilir',
        'OTP doğrulaması başarılı olursa: Ödeme akışı kaldığı yerden devam eder',
        'OTP başarısız olursa: Kullanıcı bilgilendirilir, ödeme süreci durdurulur'
      ],
      relatedFlow: 'masterpassBankOTP(), ConfirmationDialogComponent (type: "bank")',
      note: '5001 genellikle kart bankasının ek güvenlik gereksinimi nedeniyle döner.'
    },
    {
      code: '5008',
      meaning: 'MASTERPASS_OTP_REQUIRED - Masterpass sisteminin, kullanıcıdan tek seferlik SMS doğrulaması (OTP) talep ettiğini belirtir.',
      actions: [
        'Kullanıcıya Masterpass OTP popup\'ı açılmalıdır',
        'OTP girişi zorunludur',
        'OTP doğrulaması başarılı olursa: Kart ekleme / ödeme / linkleme işlemi devam eder',
        'OTP hatalıysa: Kullanıcı uyarılır, limit aşımı varsa işlem iptal edilir'
      ],
      relatedFlow: 'masterpassOTP(), ConfirmationDialogComponent (type: "masterpass")',
      note: '5008 genellikle: İlk kart ekleme, Merchant linkleme, Yeni cihaz / riskli işlem durumlarında döner.'
    }
  ];

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.expandedErrors.clear();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  toggleError(errorCode: string) {
    if (this.expandedErrors.has(errorCode)) {
      this.expandedErrors.delete(errorCode);
    } else {
      this.expandedErrors.add(errorCode);
    }
  }

  isExpanded(errorCode: string): boolean {
    return this.expandedErrors.has(errorCode);
  }
}
