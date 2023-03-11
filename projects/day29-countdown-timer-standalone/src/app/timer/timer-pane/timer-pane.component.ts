import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { displayEndTimeFn, displayTimeLeftFn, nowToFn } from '../helpers/timer-pane.helper';

@Component({
  selector: 'app-timer-pane',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="display">
      <h1 class="display__time-left">{{ displayTimeLeft$ | async }}</h1>
      <p class="display__end-time">{{ displayEndTime$ | async }}</p>
    </div>
  `,
  styles: [
    `
      .display {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .display__time-left {
        font-weight: 100;
        font-size: 20rem;
        margin: 0;
        color: white;
        text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
      }

      .display__end-time {
        font-size: 4rem;
        color: white;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerPaneComponent {
  nowTo$ = nowToFn();
  displayEndTime$ = displayEndTimeFn(this.nowTo$);
  displayTimeLeft$ = displayTimeLeftFn(this.nowTo$);
}
