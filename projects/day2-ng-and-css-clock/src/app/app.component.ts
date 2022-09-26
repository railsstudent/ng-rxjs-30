import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-clock></app-clock>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(titleService: Title) {
    titleService.setTitle('Day 2 NG and CSS Clock');
  }
}
