import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterpassFlowRunnerService } from '../../services/masterpass-flow-runner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otp-dialog',
  standalone: false,
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent implements OnInit, OnDestroy {
  show = false;
  title = 'OTP Required';
  message = '';
  otpCode = '';
  resendLoading = false;
  resendMessage = ''; // success veya hata mesajı
  private subscription?: Subscription;

  constructor(private flowRunner: MasterpassFlowRunnerService) {}

  ngOnInit() {
    this.subscription = this.flowRunner.getOtpRequired$().subscribe((data) => {
      this.title = data.title;
      this.message = data.message || '';
      this.otpCode = '';
      this.resendMessage = '';
      this.show = true;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  confirm() {
    if (this.otpCode.trim()) {
      this.flowRunner.submitOtp(this.otpCode.trim());
      this.show = false;
    }
  }

  cancel() {
    this.flowRunner.submitOtp(null);
    this.show = false;
  }

  async resendOtp() {
    this.resendMessage = '';
    this.resendLoading = true;
    try {
      const result = await this.flowRunner.resendOtp();
      if (result?.success) {
        this.resendMessage = 'OTP tekrar gönderildi. Lütfen yeni kodu girin.';
      } else {
        this.resendMessage = result?.message || 'OTP tekrar gönderilemedi.';
      }
    } catch {
      this.resendMessage = 'OTP tekrar gönderilirken hata oluştu.';
    } finally {
      this.resendLoading = false;
    }
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      this.cancel();
    }
  }
}
