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
    standalone: false
})
export class AppComponent {
  title = 'Day28 Video Speed Controller';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
