import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-timer-controls',
  template: `
  <div class="timer__controls">
    <button data-time="20" class="timer__button">20 Secs</button>
    <button data-time="300" class="timer__button">Work 5</button>
    <button data-time="900" class="timer__button">Quick 15</button>
    <button data-time="1200" class="timer__button">Snack 20</button>
    <button data-time="3600" class="timer__button">Lunch Break</button>
    <form name="customForm" id="custom">
      <input type="text" name="minutes" placeholder="Enter Minutes">
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
export class TimerControlsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
