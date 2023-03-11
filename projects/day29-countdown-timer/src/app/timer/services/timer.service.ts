import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly secondsSub = new Subject<number>();
  readonly seconds$ = this.secondsSub.asObservable();

  updateSeconds(seconds: number) {
    this.secondsSub.next(seconds);
  }
}
