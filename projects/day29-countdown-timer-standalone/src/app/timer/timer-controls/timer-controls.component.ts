import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, filter, fromEvent, map, tap } from 'rxjs';
import { TimerButtonDirective } from '../directive/timer-button.directive';
import { timerInputSubscriptionFn } from '../helpers/timer-controls.helper';

@Component({
  selector: 'app-timer-controls',
  standalone: true,
  imports: [FormsModule, TimerButtonDirective],
  template: `
    <div class="timer__controls">
      <button class="timer__button" data-seconds="20" appTimerButton>
        20 Secs
      </button>
      <button class="timer__button" data-seconds="300" appTimerButton>
        Work 5
      </button>
      <button class="timer__button" data-seconds="900" appTimerButton>
        Quick 15
      </button>
      <button class="timer__button" data-seconds="1200" appTimerButton>
        Snack 20
      </button>
      <button class="timer__button" data-seconds="3600" appTimerButton>
        Lunch Break
      </button>
      <form name="customForm" id="custom" #myForm="ngForm">
        <input type="text" name="minutes" placeholder="Enter Minutes" [(ngModel)]="customMinutes" />
      </form>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .timer__controls {
        display: flex;
      }

      .timer__controls > * {
        flex: 1;
      }

      .timer__controls form {
        flex: 1;
        display: flex;
      }

      .timer__controls input {
        flex: 1;
        border: 0;
        padding: 2rem;
      }

      .timer__button {
        background: none;
        border: 0;
        cursor: pointer;
        color: white;
        font-size: 2rem;
        text-transform: uppercase;
        background: rgba(0, 0, 0, 0.1);
        border-bottom: 3px solid rgba(0, 0, 0, 0.2);
        border-right: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1rem;
        font-family: 'Inconsolata', monospace;
      }

      .timer__button:hover,
      .timer__button:focus {
        background: rgba(0, 0, 0, 0.2);
        outline: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerControlsComponent implements OnDestroy, AfterViewInit {
  @ViewChild('myForm', { static: true, read: ElementRef })
  myForm!: ElementRef<HTMLFormElement>;

  @ViewChildren(TimerButtonDirective)
  timers!: QueryList<TimerButtonDirective>;

  customMinutes = '';
  subscriptions!: Subscription;

  timerInputSubscription = timerInputSubscriptionFn();

  ngAfterViewInit(): void {
    const timers$ = this.timers.map((timer) => timer.click$);
    const myForm$ = fromEvent(this.myForm.nativeElement, 'submit').pipe(
      filter(() => !!this.customMinutes),
      map(() => parseFloat(this.customMinutes)),
      map((customMinutes) => Math.floor(customMinutes * 60)),
      tap(() => this.myForm.nativeElement.reset()),
    );
    this.subscriptions = this.timerInputSubscription([...timers$, myForm$]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
