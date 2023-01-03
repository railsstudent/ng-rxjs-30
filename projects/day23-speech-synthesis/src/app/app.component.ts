import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<div>It works</div>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day 23 Speech Synthesis';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
