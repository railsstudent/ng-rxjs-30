import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-video-player></app-video-player>',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Day11 HTML Video Player';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
