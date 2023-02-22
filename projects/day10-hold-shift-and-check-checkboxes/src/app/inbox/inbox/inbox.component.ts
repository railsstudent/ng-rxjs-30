import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChildren } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { InboxItemComponent } from '../inbox-item/inbox-item.component';
import { CheckboxClickState } from '../interfaces';
import { createCheckedMessagesFn, initialMessage } from './message-service.inject';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    InboxItemComponent,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
  template: `
    <div class="inbox" *ngIf="messages$ | async as messages">
      <app-inbox-item *ngFor="let message of messages; index as i; last as isLast" [data]="message" [isLast]="isLast" 
        (checkboxClicked)="checkboxClickedSub$.next($event)">
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
export class InboxComponent  {

  @ViewChildren(InboxItemComponent)
  inboxItems!: InboxItemComponent[];

  createChckedMessages = createCheckedMessagesFn();

  checkboxClickedSub$ = new Subject<CheckboxClickState>();
  messages$ = merge(initialMessage(), this.createChckedMessages(this.checkboxClickedSub$));
}
