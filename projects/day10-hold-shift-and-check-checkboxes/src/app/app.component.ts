import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-inbox></app-inbox>',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class AppComponent {
  title = 'Day 10 Hold shift key and check checkboxes';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
