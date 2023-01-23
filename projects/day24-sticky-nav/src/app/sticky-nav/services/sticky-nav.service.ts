import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StickyNavService {
  private readonly shouldFixNavSub = new BehaviorSubject<boolean>(false);
  readonly shouldFixNav$ = this.shouldFixNavSub.asObservable();

  addClass(value: boolean) {
    this.shouldFixNavSub.next(value);
  }
}
