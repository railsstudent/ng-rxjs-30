import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-scroll></app-scroll>',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Day 13 Slide in on Scroll';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
