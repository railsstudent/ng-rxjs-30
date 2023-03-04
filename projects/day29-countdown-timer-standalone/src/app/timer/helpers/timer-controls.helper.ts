import { inject } from '@angular/core';
import { Observable, fromEvent, map, merge } from 'rxjs';
import { TimerService } from '../services/timer.service';
  
export const createButtonObservablesFn = () => {
    return (timers: HTMLButtonElement[]) => {
        return timers.map((nativeElement) => { 
            const totalSeconds = +(nativeElement.dataset['seconds'] || '0');
            return fromEvent(nativeElement, 'click').pipe(map(() => totalSeconds))
        });
    }
}
  
export const timerInputSubscriptionFn = () => {
    const timerService = inject(TimerService);
    return (observables: Observable<number>[]) => merge(...observables).subscribe((seconds) => {
      timerService.updateSeconds(seconds);
      console.log(`${seconds} seconds`);
    });
}
