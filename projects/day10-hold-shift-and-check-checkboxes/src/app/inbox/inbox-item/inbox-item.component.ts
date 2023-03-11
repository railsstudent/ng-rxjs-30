import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../interfaces';
import { CheckboxClickState } from '../interfaces/checkbox-click-state.interface';

@Component({
  selector: 'app-inbox-item',
  standalone: true,
  template: `
    <div class="item" [class.hide]="isLast">
      <input type="checkbox" [checked]="data.isChecked" (click)="onClicked($event, myCheckbox.checked)" #myCheckbox />
      <p>{{ data.description }}</p>
    </div>
  `,
  styleUrls: ['./inbox-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxItemComponent {
  @Input()
  data!: Message;

  @Input()
  isLast!: boolean;

  @Output()
  checkboxClicked = new EventEmitter<CheckboxClickState>();

  onClicked(event$: MouseEvent, isChecked: boolean) {
    this.checkboxClicked.emit({
      isShiftKeyPressed: event$.shiftKey,
      isChecked,
      lastCheck: this.data.id,
    });
  }
}
