import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChildren, inject } from '@angular/core';
import { Observable, Subject, firstValueFrom, map, merge } from 'rxjs';
import { InboxItemComponent } from '../inbox-item/inbox-item.component';
import { CheckboxClickState, Message } from '../interfaces';
import { createMessagesFn } from './message-service.inject';

const initialMessage = () => {
  const httpClient = inject(HttpClient);
  const url = 'https://gist.githubusercontent.com/railsstudent/ccda9a9d5c0761791d58c7edc3bce406/raw/7469e6c86372bd864a9995603663a719586c1701/messages.json';
  const messages$ = httpClient.get<{ messages: Message[] }>(url).pipe(
    map(({ messages }) => messages),
  );

  return firstValueFrom(messages$);
}

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
export class InboxComponent implements AfterViewInit  {

  @ViewChildren(InboxItemComponent)
  inboxItems!: InboxItemComponent[];

  createMessages = createMessagesFn();
  initialMessage$ = initialMessage();

  checkboxClickedSub$ = new Subject<CheckboxClickState>();
  messages$ = merge(this.initialMessage$);

  async ngAfterViewInit(): Promise<void> {
    // const initMessages = await this.initialMessagesPromise();
    // this.messages$ = this.createMessages(this.checkboxClickedSub$, initMessages);
  }
}
