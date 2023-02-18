import { TypeAheadComponent } from './type-ahead/type-ahead/type-ahead.component';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TypeAheadComponent
  ],
  template: '<app-type-ahead></app-type-ahead>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day 6 NG Type Ahead';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
