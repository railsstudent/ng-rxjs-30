import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-key-sequence-detection></app-key-sequence-detection>',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Day12 Key Sequence Detection';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
