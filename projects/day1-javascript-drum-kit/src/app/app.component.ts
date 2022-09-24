import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-drum></app-drum>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RxJS Drum Kit';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
