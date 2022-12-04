import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-video-list></app-video-list>',
  styles: [
  `
    :host {
      display: block;
    }
  `],
})
export class AppComponent {
  title = 'day18-adding-up-times';
}
