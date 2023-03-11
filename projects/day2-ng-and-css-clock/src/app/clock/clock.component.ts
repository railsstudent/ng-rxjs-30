import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { timer } from 'rxjs';
import { currentTime, rotateClockHands } from './custom-operators/clock.operator';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <div class="clock" *ngIf="clockHandsTransform$ | async as clockHandsTransform">
      <div class="clock-face">
        <div class="hand hour-hand" [style.transform]="clockHandsTransform.hourHandTransform"></div>
        <div class="hand min-hand" [style.transform]="clockHandsTransform.minuteHandTransform"></div>
        <div class="hand second-hand" [style.transform]="clockHandsTransform.secondHandTransform"></div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        background: #018ded url(https://unsplash.it/1500/1000?image=881&blur=5);
        background-size: cover;

        margin: 0;
        font-size: 2rem;
        display: flex;
        flex: 1;
        min-height: 100vh;
        align-items: center;
      }

      .clock {
        width: 30rem;
        height: 30rem;
        border: 20px solid white;
        border-radius: 50%;
        margin: 50px auto;
        position: relative;
        padding: 2rem;
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), inset 0 0 0 3px #efefef, inset 0 0 10px black,
          0 0 10px rgba(0, 0, 0, 0.2);
      }

      .clock-face {
        position: relative;
        width: 100%;
        height: 100%;
        transform: translateY(-3px); /* account for the height of the clock hands */
      }

      .hand {
        width: 50%;
        height: 6px;
        background: black;
        position: absolute;
        top: 50%;
        transform-origin: 100%;
        transform: rotate(90deg);
        transition: all 0.05s;
        transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent {
  readonly oneSecond = 1000;

  clockHandsTransform$ = timer(0, this.oneSecond).pipe(currentTime(), rotateClockHands());
}
