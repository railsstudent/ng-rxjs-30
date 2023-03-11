import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  shareReplay,
  Observable,
  map,
  switchMap,
  timer,
  take,
  withLatestFrom,
  tap,
} from 'rxjs';
import { TimerService } from '../services/timer.service';

const oneSecond = 1000;

export const nowToFn = () => {
  const timerService = inject(TimerService);
  return timerService.seconds$.pipe(shareReplay(1));
};

const displayEndTime = (now: number, seconds: number): string => {
  const timestamp = now + seconds * oneSecond;

  const end = new Date(timestamp);
  const hour = end.getHours();
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  return `Be Back At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${amPm}`;
};

export const displayEndTimeFn = (nowTo$: Observable<number>) =>
  nowTo$.pipe(map((seconds) => displayEndTime(Date.now(), seconds)));

const displayTimeLeft = (seconds: number) => {
  const numSeconds = 60;
  const minutes = Math.floor(seconds / numSeconds);
  const remainderSeconds = seconds % numSeconds;
  return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
};

export const displayTimeLeftFn = (nowTo$: Observable<number>) => {
  const titleService = inject(Title);
  const countDown$ = nowTo$.pipe(
    switchMap((seconds) => timer(0, oneSecond).pipe(take(seconds + 1)))
  );

  return countDown$.pipe(
    withLatestFrom(nowTo$),
    map(([countdown, secondsLeft]) => secondsLeft - countdown),
    map((secondsLeft) => displayTimeLeft(secondsLeft)),
    tap((strTimeLeft) => titleService.setTitle(strTimeLeft))
  );
};
