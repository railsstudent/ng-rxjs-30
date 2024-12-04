import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: '<app-speech-synthesis></app-speech-synthesis>',
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
  title = 'Day 23 Speech Synthesis';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
