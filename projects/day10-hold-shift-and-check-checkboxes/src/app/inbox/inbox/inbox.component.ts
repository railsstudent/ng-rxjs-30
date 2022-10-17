import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '../services';

@Component({
  selector: 'app-inbox',
  template: `
    <div class="inbox" *ngIf="messages$ | async as messages">
      <app-inbox-item *ngFor="let message of messages; last as isLast" [data]="message" [isLast]="isLast">
      </app-inbox-item>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
    }

    .inbox {
        max-width: 400px;
        margin: 50px auto;
        background: white;
        border-radius: 5px;
        box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxComponent implements OnInit {

  messages$ = this.messageService.getMessages();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }
}
