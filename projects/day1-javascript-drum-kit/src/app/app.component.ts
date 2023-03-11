import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DrumComponent } from './drum';

@Component({
  selector: 'app-root',
  imports: [DrumComponent],
  template: '<app-drum></app-drum>',
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }
    `,
  ],
  standalone: true,
})
export class AppComponent {
  title = 'RxJS Drum Kit';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
