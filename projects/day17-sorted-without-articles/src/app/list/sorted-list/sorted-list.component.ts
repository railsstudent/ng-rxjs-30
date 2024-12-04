import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, of } from 'rxjs';

@Component({
    selector: 'app-sorted-list',
    template: `
    <div>
      <h1>Sort bands without articles</h1>
      <ul id="bands">
        <ng-container *ngIf="sortedBands$ | async as sortedBands">
          <li *ngFor="let band of sortedBands">{{ band }}</li>
        </ng-container>
      </ul>
    </div>
  `,
    styles: [
        `
      :host {
        display: block;
      }

      div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      h1 {
        text-align: center;
        margin-bottom: 2rem;
        flex-basis: 100%;
      }

      #bands {
        list-style: inside square;
        font-size: 20px;
        background: white;
        width: 500px;
        padding: 0;
        box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.05);
      }

      #bands li {
        border-bottom: 1px solid #efefef;
        padding: 20px;
      }

      #bands li:last-child {
        border-bottom: 0;
      }

      a {
        color: #ffc600;
        text-decoration: none;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SortedListComponent {
  sortedBands$ = of([
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Norma Jean',
    'The Bled',
    'Say Anything',
    'The Midway State',
    'We Came as Romans',
    'Counterparts',
    'Oh, Sleeper',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog',
  ]).pipe(map((bands) => [...bands].sort((a, b) => (this.strip(a) > this.strip(b) ? 1 : -1))));

  private strip(bandName: string) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
  }
}
