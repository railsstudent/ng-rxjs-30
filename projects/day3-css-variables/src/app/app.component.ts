import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `<app-dynamic-css></app-dynamic-css>`,
  styles: [
    `
    :host {
      display: block;
    }
    `
  ]
})
export class AppComponent {
  title = 'Day 3 CSS Variables';

  constructor (titleService: Title) {
    titleService.setTitle(this.title);
  }
}
