import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: `<app-highlighter-page></app-highlighter-page>`,
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
  title = '👀👀👀 Day 22 Follow along link highlighter';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
