import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { scan, startWith, Subject, tap } from 'rxjs';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-list-container',
  template: `
  <div class="wrapper">
    <h2>LOCAL TAPAS</h2>
    <p></p>
    <ng-container *ngIf="itemList$ | async as itemList">
      <app-data-list [itemList]="itemList"></app-data-list>
    </ng-container>
    <form class="add-items" (ngSubmit)="submit$.next()">
      <input type="text" name="item" placeholder="Item Name" [required]="true" name="newItem" [(ngModel)]="newItem">
      <input type="submit" value="+ Add Item">
    </form>
  </div>
  `,
  styles: [`
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListContainerComponent {

  newItem = '';
  submit$ = new Subject<void>();
  itemList$ = this.submit$.pipe(
    scan((acc, _) => acc.concat({ text: this.newItem, done: false }), [] as Item[]),
    tap((items) => { 
      localStorage.setItem('items', JSON.stringify(items));
      this.newItem = '';
    }),
    startWith(JSON.parse(localStorage.getItem('items') || JSON.stringify([])) as Item[])
  );
}
