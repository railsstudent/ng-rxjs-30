import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-slider></app-slider>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day 27 Click and Drag';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
