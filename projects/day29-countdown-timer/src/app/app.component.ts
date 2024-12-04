import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: '<app-timer></app-timer>',
    styles: [
        `
      :host {
        display: block;
      }
    `,
    ],
    standalone: false
})
export class AppComponent {
  title = 'Day 29 Countdown Timer';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
