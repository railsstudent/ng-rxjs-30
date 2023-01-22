import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stick-nav-page',
  template: `
    <ng-container>
      <app-stick-nav-header></app-stick-nav-header>
      <app-stick-nav-content></app-stick-nav-content>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyNavPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
