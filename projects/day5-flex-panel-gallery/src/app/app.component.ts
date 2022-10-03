import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `<app-panels></app-panels>`,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class AppComponent {
  title = 'Flex Panels';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
