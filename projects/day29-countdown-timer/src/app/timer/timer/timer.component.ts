import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-timer',
  template: `
  <div class="timer">
    <app-timer-controls></app-timer-controls>
    <div class="display">
      <h1 class="display__time-left"></h1>
      <p class="display__end-time"></p>
    </div>
  </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .display__time-left {
        font-weight: 100;
        font-size: 20rem;
        margin: 0;
        color: white;
        text-shadow: 4px 4px 0 rgba(0,0,0,0.05);
    }
      
    .timer {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
        
    .display {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
      
    .display__end-time {
        font-size: 4rem;
        color: white;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
