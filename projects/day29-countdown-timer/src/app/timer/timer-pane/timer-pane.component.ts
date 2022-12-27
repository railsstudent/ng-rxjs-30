import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, shareReplay, switchMap, take, tap, timer, withLatestFrom } from 'rxjs';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-pane',
  template: `
    <div class="display">
      <h1 class="display__time-left">{{ displayTimeLeft$ | async }}</h1>
      <p class="display__end-time">{{ displayEndTime$ | async }}</p>
    </div>
  `,
  styles: [`
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
      text-shadow: 4px 4px 0 rgba(0,0,0,0.05);
    }
    
    .display__end-time {
      font-size: 4rem;
      color: white;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerPaneComponent {

  oneSecond = 1000;
  nowTo$ = this.timerService.seconds$.pipe(shareReplay(1));
  
  displayEndTime$ = this.nowTo$.pipe(map((seconds) => this.displayEndTime(Date.now(), seconds)));

  displayTimeLeft$ = this.nowTo$.pipe(switchMap((seconds) => timer(0, this.oneSecond).pipe(take(seconds + 1))))
    .pipe(
      withLatestFrom(this.nowTo$),
      map(([countdown, secondsLeft]) => secondsLeft - countdown),
      map((secondsLeft) => this.displayTimeLeft(secondsLeft)),
      tap((strTimeLeft) => this.titleService.setTitle(strTimeLeft))
    );

  constructor(private titleService: Title, private timerService: TimerService) { }

  private displayTimeLeft(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  }

  private displayEndTime(now: number, seconds: number): string {
    const timestamp = now + seconds * this.oneSecond;

    const end = new Date(timestamp);
    const hour = end.getHours();
    const amPm = hour >= 12 ? 'PM': 'AM';
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    return `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
  }
}
