import { Directive, ElementRef } from '@angular/core';
import { Observable, fromEvent, map } from 'rxjs';

@Directive({
  selector: '[appTimerButton]',
  standalone: true,
})
export class TimerButtonDirective {
  click$!: Observable<number>;

  constructor(el: ElementRef<HTMLButtonElement>) {
    const totalSeconds = +(el.nativeElement.dataset['seconds'] || '0');
    this.click$ = fromEvent(el.nativeElement, 'click').pipe(map(() => totalSeconds));
  }
}
