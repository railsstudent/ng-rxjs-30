import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable, shareReplay, tap, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  template: `
    <div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
      Testing
    </div>
  `,
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnInit {
  // secondHandDegree$: Observable<string>;
  
  ngOnInit(): void {
    const oneSecond = 1000;
    const currentTime$ = timer(0, oneSecond)
      .pipe(
        map(() => new Date()),
        tap((time) => console.log('currentTime fired', time)),
        shareReplay(1)
      );

    currentTime$.pipe(
      tap(time => console.log('seconds', time)),
      map(time => time.getSeconds())
    )
    .subscribe(seconds => console.log(seconds));

    currentTime$.pipe(
      tap(time => console.log('minutes', time)),
      map(time => time.getMinutes())
    )
    .subscribe(seconds => console.log(seconds));


    currentTime$.pipe(
      tap(time => console.log('hours', time)),
      map(time => time.getHours())
    )
    .subscribe(seconds => console.log(seconds));
  }
}
