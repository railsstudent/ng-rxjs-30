import { Component, ChangeDetectionStrategy, ViewChildren } from '@angular/core';
import { Subject, startWith, map } from 'rxjs';
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

  lastCheck: number | undefined = undefined;
  checkboxClickedSub$ = new Subject<CheckboxClickState>();
  messages$ = this.checkboxClickedSub$
    .pipe(
      map(({ currentItem, isShiftKeyPressed, isChecked }) => {
        this.messageService.updateMessageState(currentItem, isChecked);
        this.checkBetweenBoxes(currentItem, isShiftKeyPressed, isChecked);
        this.lastCheck = currentItem;
        return this.messageService.getMessages();
      }),
      startWith(this.messageService.getMessages())
    );

  constructor(private messageService: MessageService) { }

  private checkBetweenBoxes(currentItem: number, isShiftKeyPressed: boolean, isChecked: boolean) {
    if (isShiftKeyPressed && isChecked) {
      let inBetween = false;
      this.inboxItems.forEach(inboxItem => {
        const id = inboxItem.data.id;
        if (id === currentItem || id === this.lastCheck) {
          inBetween = !inBetween;
        }
        
        if (inBetween) {
          this.messageService.updateMessageState(id, inBetween);
        }    
      });  
    }
  }
}
