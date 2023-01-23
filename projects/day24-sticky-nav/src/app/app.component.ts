import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-sticky-nav-page></app-sticky-nav-page>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day 24 Sticky Nav';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
