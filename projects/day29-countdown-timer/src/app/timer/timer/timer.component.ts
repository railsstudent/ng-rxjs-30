import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-timer',
  template: `
  <div class="timer">
    <app-timer-controls></app-timer-controls>
    <app-timer-pane></app-timer-pane>
  </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .timer {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
