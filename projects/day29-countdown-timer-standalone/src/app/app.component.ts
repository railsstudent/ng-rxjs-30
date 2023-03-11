import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TimerComponent } from './timer/timer/timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerComponent],
  template: '<app-timer></app-timer>',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Day 29 Standalone Countdown Timer';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
