import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-stripe-nav-page></app-stripe-nav-page>',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Day 26 Stripe Follow Along Nav';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
