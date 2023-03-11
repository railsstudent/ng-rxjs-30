import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, merge, scan, shareReplay, startWith, Subject, tap } from 'rxjs';
import { NewItem, ToggleItem, ToggleItems } from '../interfaces';
import { isNewItem, isToggleItems } from './type-guard';

@Component({
  selector: 'app-list-container',
  template: `
    <div class="wrapper">
      <h2>LOCAL TAPAS</h2>
      <p></p>
      <ng-container *ngIf="itemList$ | async as itemList">
        <app-data-list
          [itemList]="itemList"
          (toggleDone)="toggleDone$.next($event)"
        ></app-data-list>
      </ng-container>
      <form
        class="add-items"
        (ngSubmit)="submit$.next({ text: newItem, done: false })"
      >
        <input
          type="text"
          name="item"
          placeholder="Item Name"
          [required]="true"
          name="newItem"
          [(ngModel)]="newItem"
        />
        <input type="submit" value="+ Add Item" />
        <input
          type="button"
          [value]="btnToggleCheckText$ | async"
          (click)="btnCheckAllClicked$.next({ action: 'toggleAll' })"
        />
      </form>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .wrapper {
        padding: 20px;
        max-width: 350px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        text-align: center;
        margin: 0;
        font-weight: 200;
      }

      .add-items {
        margin-top: 20px;
      }

      .add-items input {
        padding: 10px;
        outline: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContainerComponent {
  newItem = '';
  submit$ = new Subject<NewItem>();
  toggleDone$ = new Subject<ToggleItem>();
  btnCheckAllClicked$ = new Subject<ToggleItems>();

  storedItems = JSON.parse(
    localStorage.getItem('items') || JSON.stringify([])
  ) as NewItem[];

  itemList$ = merge(
    this.submit$,
    this.toggleDone$,
    this.btnCheckAllClicked$
  ).pipe(
    scan((acc, value) => {
      if (isToggleItems(value)) {
        const done = !acc.every((item) => item.done);
        return acc.map((item) => ({ ...item, done }));
      } else if (isNewItem(value)) {
        return acc.concat(value);
      }

      const { action, index, done } = value;
      if (action === 'toggle') {
        return acc.map((item, i) => (i !== index ? item : { ...item, done }));
      }
      return acc.filter((_, i) => i !== index);
    }, this.storedItems),
    tap((items) => {
      console.log('Update local storage');
      localStorage.setItem('items', JSON.stringify(items));
      this.newItem = '';
    }),
    shareReplay(1),
    startWith(this.storedItems)
  );

  btnToggleCheckText$ = this.itemList$.pipe(
    map((items) => {
      const isAllChecked = items.every((item) => item.done);
      return isAllChecked ? 'Uncheck all' : 'Check all';
    }),
    startWith('Check all')
  );
}
