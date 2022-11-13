import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-data-list',
  template: `
    <ul class="plates">
      <li *ngFor="let plate of itemList; index as i">
        <input type="checkbox" [attr.data-index]="i" id="item{{i}}" [checked]="plate.done" />
        <label for="item{{i}}">{{plate.text}}</label>
      </li>
    </ul>
  `,
  styles: [`
    .plates {
      margin: 0;
      padding: 0;
      text-align: left;
      list-style: none;
    }

    .plates li {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 10px 0;
      font-weight: 100;
      display: flex;
    }

    .plates label {
      flex: 1;
      cursor: pointer;
    }

    .plates input {
      display: none;
    }

    .plates input + label:before {
      content: "⬜️";
      margin-right: 10px;
    }

    .plates input:checked + label:before {
      content: "🌮";
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent implements OnInit {

  @Input()
  itemList!: Item[];

  constructor() { }

  ngOnInit(): void {}
}
