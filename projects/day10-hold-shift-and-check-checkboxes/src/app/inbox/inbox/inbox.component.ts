import { Component, ChangeDetectionStrategy, ViewChildren } from '@angular/core';
import { Subject, startWith, map, scan } from 'rxjs';
import { InboxItemComponent } from '../inbox-item/inbox-item.component';
import { CheckboxClickState } from '../interfaces/checkbox-click-state.interface';
import { MessageService } from '../services';

@Component({
  selector: 'app-inbox',
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

  checkboxClickedSub$ = new Subject<CheckboxClickState>();
  messages$ = this.checkboxClickedSub$
    .pipe(
      scan((acc, item) =>  ({ ...item, prevCheck: acc.lastCheck }),
      {
        isShiftKeyPressed: false,
        isChecked: false,
        prevCheck: -1,
        lastCheck: -1,
      }),
      map(({ isShiftKeyPressed, isChecked, prevCheck, lastCheck }) => {
        this.messageService.updateMessageState(lastCheck, isChecked);
        this.checkBetweenBoxes(lastCheck, prevCheck, isShiftKeyPressed, isChecked);
        return this.messageService.getMessages();
      }),
      startWith(this.messageService.getMessages())
    );

  constructor(private messageService: MessageService) { }

  private checkBetweenBoxes(currentItem: number, prevCheck: number, isShiftKeyPressed: boolean, isChecked: boolean) {
    if (isShiftKeyPressed && isChecked) {
      let inBetween = false;
      this.inboxItems.forEach(inboxItem => {
        const id = inboxItem.data.id;
        if (id === currentItem || id === prevCheck) {
          inBetween = !inBetween;
        }
        
        if (inBetween) {
          this.messageService.updateMessageState(id, inBetween);
        }    
      });  
    }
  }
}
