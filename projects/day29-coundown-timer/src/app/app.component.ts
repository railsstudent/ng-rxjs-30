import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<div>Hello World</div>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day29 Coundown Timer';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
