import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { from, shareReplay, toArray, reduce } from 'rxjs';
import { sort } from './custom-operators/sort.operator';
import { sum } from './custom-operators/sum.operator';

@Component({
    selector: 'app-root',
    template: `
    <div class="container">
      <ng-container *ngTemplateOutlet="inventors; context: { $implicit: 'Inventors', list: inventorArray$ | async }">
      </ng-container>
      <ng-container *ngTemplateOutlet="inventors; context: { $implicit: 'Ordered Inventors', list: ordered$ | async }">
      </ng-container>
      <ng-container *ngTemplateOutlet="inventors; context: { $implicit: 'Oldest Inventors', list: oldest$ | async }">
      </ng-container>
      <section class="inventors">
        <h2>Total Years</h2>
        <p>{{ totalYears$ | async }}</p>
        <h2>Total First Length</h2>
        <p>{{ totalFirstLength$ | async }}</p>
      </section>
      <ng-container *ngTemplateOutlet="people; context: { $implicit: 'People', list: peopleArray$ | async }">
      </ng-container>
      <ng-container
        *ngTemplateOutlet="people; context: { $implicit: 'People (Ordered by last name)', list: alpha$ | async }"
      >
      </ng-container>
      <section class="transportation">
        <h2>Transportation</h2>
        <ul *ngIf="transportation$ | async as transportation">
          <li *ngFor="let item of transportation | keyvalue">
            Object Key:{{ item.key }} and Object Value:{{ item.value }}
          </li>
        </ul>
      </section>
    </div>

    <section class="inventors">
      <h2>{{ title }}</h2>
      <ul>
        @for(inventor of inventors; track inventor) {
          <li>
          Name: {{ inventor.first }} {{ inventor.last }}<br />
          {{ inventor.year }} - {{ inventor.passed }}, Age:
          {{ inventor.passed - inventor.year }}
        </li>
        }
      </ul>
    </section>

    <section class="people">
      <h2>{{ title }}</h2>
      <ul>
        @for(person of people; track person) {
          <li>
            {{ person }}
          </li>
        }
      </ul>
    </section>
  `,
    styles: [
        `
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-wrap: wrap;
      }

      .inventors,
      .people,
      .transportation {
        flex-basis: 25%;

        padding: 1rem;
        ul {
          padding: 0.75rem;

          li {
            margin: 0.5rem;
          }
        }
      }
    `,
    ],
    standalone: false
})
export class AppComponent {
  title = 'Day4 Array Cardio Part 1';

  inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 },
  ];

  inventors$ = from(this.inventors).pipe(shareReplay(this.inventors.length));
  inventorArray$ = this.inventors$.pipe(toArray());
  ordered$ = this.inventors$.pipe(sort((a, b) => (a.year > b.year ? 1 : -1)));
  oldest$ = this.inventors$.pipe(
    sort((a, b) => {
      const lastInventor = a.passed - a.year;
      const nextInventor = b.passed - b.year;
      return lastInventor > nextInventor ? -1 : 1;
    }),
  );
  totalYears$ = this.inventors$.pipe(sum((acc: number, y) => acc + (y.passed - y.year), 0));
  totalFirstLength$ = this.inventors$.pipe(sum((acc: number, y) => acc + y.first.length, 0));

  people = [
    'Bernhard, Sandra',
    'Bethea, Erin',
    'Becker, Carl',
    'Bentsen, Lloyd',
    'Beckett, Samuel',
    'Blake, William',
    'Berger, Ric',
    'Beddoes, Mick',
    'Beethoven, Ludwig',
    'Belloc, Hilaire',
    'Begin, Menachem',
    'Bellow, Saul',
    'Benchley, Robert',
    'Blair, Robert',
    'Benenson, Peter',
    'Benjamin, Walter',
    'Berlin, Irving',
    'Benn, Tony',
    'Benson, Leana',
    'Bent, Silas',
    'Berle, Milton',
    'Berry, Halle',
    'Biko, Steve',
    'Beck, Glenn',
    'Bergman, Ingmar',
    'Black, Elk',
    'Berio, Luciano',
    'Berne, Eric',
    'Berra, Yogi',
    'Berry, Wendell',
    'Bevan, Aneurin',
    'Ben-Gurion, David',
    'Bevel, Ken',
    'Biden, Joseph',
    'Bennington, Chester',
    'Bierce, Ambrose',
    'Billings, Josh',
    'Birrell, Augustine',
    'Blair, Tony',
    'Beecher, Henry',
    'Biondo, Frank',
  ];
  people$ = from(this.people).pipe(shareReplay(this.people.length));
  peopleArray$ = this.people$.pipe(toArray());
  alpha$ = this.people$.pipe(
    sort((lastOne, nextOne) => {
      const [aLast] = lastOne.split(', ');
      const [bLast] = nextOne.split(', ');
      return aLast > bLast ? 1 : -1;
    }),
  );

  data$ = from([
    'car',
    'car',
    'truck',
    'truck',
    'bike',
    'walk',
    'car',
    'van',
    'bike',
    'walk',
    'car',
    'van',
    'car',
    'truck',
    'pogostick',
  ]);

  transportation$ = this.data$.pipe(
    reduce((obj, item) => {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item] = obj[item] + 1;
      return obj;
    }, {} as Record<string, number>),
  );

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }

  inventoryTrackBy(index: number, item: { first: string; last: string }) {
    return `${index}${item.first}${item.last}`;
  }

  peopleTrackBy(index: number, item: string) {
    return `${index}${item}`;
  }
}
