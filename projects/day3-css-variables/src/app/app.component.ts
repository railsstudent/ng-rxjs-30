import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DynamicCssComponent } from './dynamic-css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicCssComponent],
  template: `<app-dynamic-css></app-dynamic-css>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Day 3 CSS Variables';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
