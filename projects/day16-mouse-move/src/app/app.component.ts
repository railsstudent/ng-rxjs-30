import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-mouse-move></app-mouse-move>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day16 Mouse Move';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
