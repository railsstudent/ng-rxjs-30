import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InboxComponent } from './inbox/inbox/inbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InboxComponent,
  ],
  template: '<app-inbox></app-inbox>',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class AppComponent {
  title = 'Day 10 Hold shift key and check checkboxes';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
