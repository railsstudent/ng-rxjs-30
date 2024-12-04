import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClockComponent } from './clock';

@Component({
    selector: 'app-root',
    imports: [ClockComponent],
    template: '<app-clock></app-clock>',
    styles: [
        `
      :host {
        display: block;
      }
    `,
    ]
})
export class AppComponent {
  constructor(titleService: Title) {
    titleService.setTitle('Day 2 NG and CSS Clock');
  }
}
