import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-sorted-list></app-sorted-list>',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Day17 Sorted Without Articles';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
