import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, filter, fromEvent, map, tap } from 'rxjs';
import { createButtonObservablesFn, timerInputSubscriptionFn } from '../helpers/timer-controls.helper';

@Component({
  selector: 'app-timer-controls',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="timer__controls">
      <button class="timer__button" #timer1 data-seconds="20">20 Secs</button>
      <button class="timer__button" #timer2 data-seconds="300">Work 5</button>
      <button class="timer__button" #timer3 data-seconds="900">Quick 15</button>
      <button class="timer__button" #timer4 data-seconds="1200">Snack 20</button>
      <button class="timer__button" #timer5 data-seconds="3600">Lunch Break</button>
      <form name="customForm" id="custom" #myForm="ngForm">
        <input type="text" name="minutes" placeholder="Enter Minutes" [(ngModel)]="customMinutes">
      </form>
  </div>
  `,
  styles: [`
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
        background: rgba(0,0,0,0.1);
        border-bottom: 3px solid rgba(0,0,0,0.2);
        border-right: 1px solid rgba(0,0,0,0.2);
        padding: 1rem;
        font-family: 'Inconsolata', monospace;
    }
      
    .timer__button:hover,
    .timer__button:focus {
        background: rgba(0,0,0,0.2);
        outline: 0;
    } 
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerControlsComponent implements OnInit, OnDestroy {
  @ViewChild('timer1', { static: true, read: ElementRef })
  timer1!: ElementRef<HTMLButtonElement>;

  @ViewChild('timer2', { static: true, read: ElementRef })
  timer2!: ElementRef<HTMLButtonElement>;

  @ViewChild('timer3', { static: true, read: ElementRef })
  timer3!: ElementRef<HTMLButtonElement>;

  @ViewChild('timer4', { static: true, read: ElementRef })
  timer4!: ElementRef<HTMLButtonElement>;

  @ViewChild('timer5', { static: true, read: ElementRef })
  timer5!: ElementRef<HTMLButtonElement>;

  @ViewChild('myForm', { static: true, read: ElementRef })
  myForm!: ElementRef<HTMLFormElement>;

  customMinutes = '';
  subscriptions!: Subscription;

  createTimerObservables = createButtonObservablesFn();
  timerInputSubscription = timerInputSubscriptionFn();

  ngOnInit(): void {
    const timers$ = this.createTimerObservables([this.timer1, this.timer2, this.timer3, this.timer4, this.timer5]);
    const myForm$ = fromEvent(this.myForm.nativeElement, 'submit')
      .pipe(
        filter(() => !!this.customMinutes),
        map(() => parseFloat(this.customMinutes)),
        map((customMinutes) => Math.floor(customMinutes * 60)),
        tap(() => this.myForm.nativeElement.reset())
      );
    this.subscriptions = this.timerInputSubscription([...timers$, myForm$]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
