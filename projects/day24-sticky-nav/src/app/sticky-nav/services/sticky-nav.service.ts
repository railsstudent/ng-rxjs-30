import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StickyNavStyle } from '../sticky-nav.interface';

@Injectable({
  providedIn: 'root'
})
export class StickyNavService {
  readonly nonStickyNavStyle: StickyNavStyle = {
    shouldAddFixedNav: false,
    paddingTop: 0
  };

  private readonly stickyStyleSub = new BehaviorSubject<StickyNavStyle>(this.nonStickyNavStyle);
  readonly stickyStyle$ = this.stickyStyleSub.asObservable();

  updateStyle(style: StickyNavStyle) {
    this.stickyStyleSub.next(style);
  }
}
