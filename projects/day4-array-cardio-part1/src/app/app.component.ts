import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { from, shareReplay, toArray } from 'rxjs';
import { sort } from './custom-operators/sort.operator';
import { sum } from './custom-operators/sum.operator';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <section class="inventors">
        <h2>Inventors</h2>
        <ul *ngIf="inventorArray$ | async as inventorArray">
          <li *ngFor="let inventory of inventorArray">
            Name: {{ inventory.first }} {{ inventory.last }}<br />
            {{ inventory.year }} - {{ inventory.passed }}, Age: {{ inventory.passed - inventory.year }}
            
          </li>
        </ul>
      </section>
      <section class="inventors">
        <h2>Ordered Inventors</h2>
        <ul *ngIf="ordered$ | async as inventorArray">
          <li *ngFor="let inventory of inventorArray">
            Name: {{ inventory.first }} {{ inventory.last }}<br />
            {{ inventory.year }} - {{ inventory.passed }}, Age: {{ inventory.passed - inventory.year }}
          </li>
        </ul>
      </section>
      <section class="inventors">
        <h2>Oldest Inventors</h2>
        <ul *ngIf="oldest$ | async as inventorArray">
          <li *ngFor="let inventory of inventorArray">
            Name: {{ inventory.first }} {{ inventory.last }}<br />
            {{ inventory.year }} - {{ inventory.passed }}, Age: {{ inventory.passed - inventory.year }}
          </li>
        </ul>
      </section>
      <section class="inventors">
        <h2>Total Years</h2>
        <p>{{ totalYears$ | async }}</p>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
    }

    .inventors, .people, .comments {
      flex-basis: 25%;

      padding: 1rem;
      ul {
        padding: 0.75rem;

        li {
          margin: 0.5rem;
        }
      }
    }
  `]
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
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
  ];

  inventors$ = from(this.inventors).pipe(shareReplay(this.inventors.length));
  inventorArray$ = this.inventors$.pipe(toArray());
  ordered$ = this.inventors$.pipe(sort((a, b) => a.year > b.year ? 1 : -1));
  oldest$ = this.inventors$.pipe(sort((a, b) => { 
    const lastInventor = a.passed - a.year;
    const nextInventor = b.passed - b.year;
    return lastInventor > nextInventor ? -1 : 1;
  }));
  totalYears$ = this.inventors$.pipe(sum((acc: number, y) => acc + (y.passed - y.year), 0));

  people = [
    'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
    'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
    'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
    'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
    'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
  ];

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
