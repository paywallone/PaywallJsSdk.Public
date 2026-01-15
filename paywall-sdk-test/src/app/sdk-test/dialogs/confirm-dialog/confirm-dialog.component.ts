import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterpassFlowRunnerService } from '../../services/masterpass-flow-runner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  show = false;
  title = 'Confirm';
  message = '';
  private subscription?: Subscription;

  constructor(private flowRunner: MasterpassFlowRunnerService) {}

  ngOnInit() {
    this.subscription = this.flowRunner.getConfirmRequired$().subscribe((data) => {
      this.title = data.title;
      this.message = data.message;
      this.show = true;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  confirm() {
    this.flowRunner.submitConfirm(true);
    this.show = false;
  }

  cancel() {
    this.flowRunner.submitConfirm(false);
    this.show = false;
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      this.cancel();
    }
  }
}
