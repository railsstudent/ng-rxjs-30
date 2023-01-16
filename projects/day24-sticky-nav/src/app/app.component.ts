import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<div>testing</div>',
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
