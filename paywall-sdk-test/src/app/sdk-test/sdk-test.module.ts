import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SdkTestRoutingModule } from './sdk-test-routing.module';
import { SdkTestComponent } from './sdk-test.component';
import { PaywallApiService } from './paywall-api.service';
import { MasterpassSdkTestPageComponent } from './components/masterpass-sdk-test-page/masterpass-sdk-test-page.component';
import { OtpDialogComponent } from './dialogs/otp-dialog/otp-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { SelectCardDialogComponent } from './dialogs/select-card-dialog/select-card-dialog.component';
import { ErrorCodesModalComponent } from './components/error-codes-modal/error-codes-modal.component';
import { ErrorActionGuideModalComponent } from './components/error-action-guide-modal/error-action-guide-modal.component';

@NgModule({
  declarations: [
    SdkTestComponent,
    MasterpassSdkTestPageComponent,
    OtpDialogComponent,
    ConfirmDialogComponent,
    SelectCardDialogComponent,
    ErrorCodesModalComponent,
    ErrorActionGuideModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SdkTestRoutingModule
  ],
  providers: [PaywallApiService]
})
export class SdkTestModule { }
