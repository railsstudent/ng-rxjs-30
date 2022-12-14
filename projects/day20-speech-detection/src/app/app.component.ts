import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `<div>Hello World!</div>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day20 Speech Detection';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
