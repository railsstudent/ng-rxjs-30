import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<p>Test</p>', 
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent {
  title = 'Day 19 Web Cam Fun';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
