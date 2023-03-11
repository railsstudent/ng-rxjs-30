import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimerControlsComponent } from '../timer-controls/timer-controls.component';
import { TimerPaneComponent } from '../timer-pane/timer-pane.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [TimerControlsComponent, TimerPaneComponent],
  template: `
    <div class="timer">
      <app-timer-controls></app-timer-controls>
      <app-timer-pane></app-timer-pane>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .timer {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {}
