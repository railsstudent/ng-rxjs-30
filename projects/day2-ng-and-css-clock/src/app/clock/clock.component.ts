import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {  map, Observable, timer } from 'rxjs';
import { HandTransformations } from './clock.interface';

@Component({
  selector: 'app-clock',
  template: `
    <div class="clock" *ngIf="clockHandsTransform$ | async as clockHandsTransform">
      <div class="clock-face">
        <div class="hand hour-hand" [style.transform]="clockHandsTransform.hourHandTransform"></div>
        <div class="hand min-hand" [style.transform]="clockHandsTransform.minuteHandTransform"></div>
        <div class="hand second-hand" [style.transform]="clockHandsTransform.secondHandTransform"></div>
      </div>
    </div>
  `,
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnInit {
  clockHandsTransform$!: Observable<HandTransformations>;
  
  ngOnInit(): void {
    const oneSecond = 1000;

    const currentTime$ = timer(0, oneSecond)
      .pipe(map(() => new Date()));

    const timeParts$ = currentTime$
      .pipe(
        map(time => ({ 
          seconds: time.getSeconds(),
          minutes: time.getMinutes(),
          hours: time.getHours()
        }),
      ));

    this.clockHandsTransform$ = timeParts$
      .pipe(
        map(({ seconds, minutes, hours }) => { 
          const secondsDegrees = ((seconds / 60) * 360) + 90;
          const minsDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
          const hourDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;

          return { 
            secondHandTransform: `rotate(${secondsDegrees}deg)`,
            minuteHandTransform: `rotate(${minsDegrees}deg)`,
            hourHandTransform: `rotate(${hourDegrees}deg)`
          };
        }),
      );
  }
}
