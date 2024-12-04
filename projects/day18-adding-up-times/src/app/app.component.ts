import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: '<app-video-list></app-video-list>',
    styles: [
        `
      :host {
        display: block;
      }
    `,
    ],
    standalone: false
})
export class AppComponent {
  title = 'Day 18 Adding Up Times';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
