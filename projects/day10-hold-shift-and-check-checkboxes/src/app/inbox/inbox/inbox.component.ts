import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChildren, inject } from '@angular/core';
import { Subject, map, scan, startWith } from 'rxjs';
import { InboxItemComponent } from '../inbox-item/inbox-item.component';
import { CheckboxClickState, InBetweenCheckboxClicked } from '../interfaces';
import { MessageService } from '../services';

const checkBetweenBoxesFn = () => {
  const messageService = inject(MessageService);

  return (inBetweenClicked: InBetweenCheckboxClicked) => {
    const { isShiftKeyPressed, isChecked, lastCheck, prevCheck } = inBetweenClicked;
    
    if (isShiftKeyPressed && isChecked) {
      let inBetween = false;
      const messages = messageService.getMessages();
      messages.forEach(({ id }) => {
        if (id === lastCheck || id === prevCheck) {
          inBetween = !inBetween;
        }
        
        if (inBetween) {
          messageService.updateMessageState(id, inBetween);
        }    
      });  
    }
  }
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
export class InboxComponent {

  @ViewChildren(InboxItemComponent)
  inboxItems!: InboxItemComponent[];

  checkBetweenBoxes = checkBetweenBoxesFn();
  messageService = inject(MessageService);

  checkboxClickedSub$ = new Subject<CheckboxClickState>();
  messages$ = this.checkboxClickedSub$
    .pipe(
      scan((acc, item) =>  ({ ...item, prevCheck: acc.lastCheck }),
      {
        isShiftKeyPressed: false,
        isChecked: false,
        prevCheck: -1,
        lastCheck: -1,
      } as InBetweenCheckboxClicked),
      map((inBetweenClicked) => {
        this.messageService.updateMessageState(inBetweenClicked.lastCheck, inBetweenClicked.isChecked);
        this.checkBetweenBoxes(inBetweenClicked);
        return this.messageService.getMessages();
      }),
      startWith(this.messageService.getMessages())
    );
}
