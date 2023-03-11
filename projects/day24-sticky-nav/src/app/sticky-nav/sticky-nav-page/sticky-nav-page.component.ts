import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sticky-nav-page',
  template: `
    <ng-container>
      <app-sticky-nav-header></app-sticky-nav-header>
      <app-sticky-nav-content></app-sticky-nav-content>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyNavPageComponent {}
