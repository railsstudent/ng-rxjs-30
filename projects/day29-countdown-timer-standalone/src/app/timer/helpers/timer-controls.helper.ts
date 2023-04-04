import { inject } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { TimerService } from '../services/timer.service';

export const timerInputSubscriptionFn = () => {
  const timerService = inject(TimerService);
  return (observables: Observable<number>[]) =>
    merge(...observables).subscribe((seconds) => {
      timerService.updateSeconds(seconds);
      console.log(`${seconds} seconds`);
    });
};
