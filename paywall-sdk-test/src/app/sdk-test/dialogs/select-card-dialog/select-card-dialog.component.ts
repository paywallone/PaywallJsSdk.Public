import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterpassFlowRunnerService } from '../../services/masterpass-flow-runner.service';
import { CardInfo } from '../../models/sdk-types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-card-dialog',
  standalone: false,
  templateUrl: './select-card-dialog.component.html',
  styleUrls: ['./select-card-dialog.component.scss']
})
export class SelectCardDialogComponent implements OnInit, OnDestroy {
  show = false;
  title = 'Select Card';
  cards: CardInfo[] = [];
  selectedCard: CardInfo | null = null;
  private subscription?: Subscription;

  constructor(private flowRunner: MasterpassFlowRunnerService) {}

  ngOnInit() {
    this.subscription = this.flowRunner.getSelectCardRequired$().subscribe((cards) => {
      this.cards = cards;
      this.selectedCard = null;
      this.show = true;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  selectCard(card: CardInfo) {
    this.selectedCard = card;
  }

  confirm() {
    this.flowRunner.submitSelectedCard(this.selectedCard);
    this.show = false;
  }

  cancel() {
    this.flowRunner.submitSelectedCard(null);
    this.show = false;
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      this.cancel();
    }
  }

  formatCardMasked(card: CardInfo): string {
    return card.cardMasked || card.alias || 'Unknown Card';
  }
}
