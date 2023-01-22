import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StickyNavService {
  private readonly shouldIncludeClassSub = new BehaviorSubject<boolean>(false);
  readonly shouldIncludeClass$ = this.shouldIncludeClassSub.asObservable();

  addClass(value: boolean) {
    this.shouldIncludeClassSub.next(value);
  }
}
