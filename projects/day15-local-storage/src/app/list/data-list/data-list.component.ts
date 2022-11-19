import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { filter, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { ItemAction, NewItem, ToggleItem } from '../interfaces';

@Component({
  selector: 'app-data-list',
  template: `
    <ul class="plates" #plates>
      <li *ngFor="let plate of itemList; index as i">
        <input type="checkbox" [attr.data-index]="i" id="item{{i}}" [checked]="plate.done" />
        <label for="item{{i}}">{{plate.text}}</label>
        <button [attr.data-index]="i" id="btn{{i}}">X</button>
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

    .plates button {
      padding: 0.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent implements OnInit, OnDestroy {
  @ViewChild('plates', { static: true, read: ElementRef })
  plates!: ElementRef<HTMLUListElement>;

  @Input()
  itemList!: NewItem[];

  destroy$ = new Subject<void>();

  @Output()
  toggleDone = new EventEmitter<ToggleItem>();

  ngOnInit(): void {
    fromEvent(this.plates.nativeElement, 'click')
      .pipe(
        filter(e => (e.target as any).matches('input') || (e.target as any).matches('button')),
        map((e: Event) => this.createToggleItem(e)),
        takeUntil(this.destroy$),
      )
      .subscribe((value) => {
        console.log(value);
        this.toggleDone.emit(value);
      });
  }

  private createToggleItem(e: Event): ToggleItem {    
    const target = e.target as any;
    const nodeName = `${target.nodeName}`;
    const index = +target.dataset.index;
    const done = !this.itemList[index].done;
    const action: ItemAction = nodeName === 'INPUT' ? 'toggle' : 'delete';
    return { action, index, done };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
