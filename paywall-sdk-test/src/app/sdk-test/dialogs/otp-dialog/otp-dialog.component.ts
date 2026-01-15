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
  private subscription?: Subscription;

  constructor(private flowRunner: MasterpassFlowRunnerService) {}

  ngOnInit() {
    this.subscription = this.flowRunner.getOtpRequired$().subscribe((data) => {
      this.title = data.title;
      this.message = data.message || '';
      this.otpCode = '';
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

  resendOtp() {
    // Placeholder - if SDK has resend OTP function, call it here
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      this.cancel();
    }
  }
}
