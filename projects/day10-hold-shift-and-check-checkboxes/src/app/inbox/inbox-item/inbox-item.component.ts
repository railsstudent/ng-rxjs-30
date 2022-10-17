import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Message } from '../interfaces';

@Component({
  selector: 'app-inbox-item',
  template: `
    <div class="item" [class.hide]="isLast">
      <input type="checkbox" [checked]="data.isChecked">
      <p>{{ data.description }}</p>
    </div>
  `,
  styleUrls: ['./inbox-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxItemComponent implements OnInit {

  @Input()
  data!: Message;

  @Input()
  isLast!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
