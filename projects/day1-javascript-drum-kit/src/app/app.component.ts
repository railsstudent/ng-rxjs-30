import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-drum></app-drum>',
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'RxJS Drum Kit';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
