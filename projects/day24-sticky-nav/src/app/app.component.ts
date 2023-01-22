import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-stick-nav-page></app-stick-nav-page>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day24 Sticky Nav';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
