import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, filter, fromEvent, map, merge, tap } from 'rxjs';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-controls',
  template: `
    <div class="timer__controls">
      <button class="timer__button" #timer1>20 Secs</button>
      <button class="timer__button" #timer2>Work 5</button>
      <button class="timer__button" #timer3>Quick 15</button>
      <button class="timer__button" #timer4>Snack 20</button>
      <button class="timer__button" #timer5>Lunch Break</button>
      <form name="customForm" id="custom" #myForm="ngForm">
        <input
          type="text"
          name="minutes"
          placeholder="Enter Minutes"
          [(ngModel)]="customMinutes"
        />
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
  subscriptions = new Subscription();

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    const timer1$ = this.createButtonObservable(this.timer1.nativeElement, 20);
    const timer2$ = this.createButtonObservable(this.timer2.nativeElement, 300);
    const timer3$ = this.createButtonObservable(this.timer3.nativeElement, 900);
    const timer4$ = this.createButtonObservable(
      this.timer4.nativeElement,
      1200
    );
    const timer5$ = this.createButtonObservable(
      this.timer5.nativeElement,
      3600
    );
    const myForm$ = fromEvent(this.myForm.nativeElement, 'submit').pipe(
      filter(() => !!this.customMinutes),
      map(() => parseFloat(this.customMinutes)),
      map((customMinutes) => Math.floor(customMinutes * 60)),
      tap(() => this.myForm.nativeElement.reset())
    );

    this.subscriptions.add(
      merge(timer1$, timer2$, timer3$, timer4$, timer5$, myForm$).subscribe(
        (seconds) => {
          this.timerService.updateSeconds(seconds);
          console.log(`${seconds} seconds`);
        }
      )
    );
  }

  createButtonObservable(nativeElement: HTMLButtonElement, seconds: number) {
    return fromEvent(nativeElement, 'click').pipe(map(() => seconds));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
