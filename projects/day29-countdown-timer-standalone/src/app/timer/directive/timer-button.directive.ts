import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTimerButton]',
  standalone: true,
})
export class TimerButtonDirective {
  nativeElement!: HTMLButtonElement;

  constructor(el: ElementRef<HTMLButtonElement>) {
    this.nativeElement = el.nativeElement;
  }
}
