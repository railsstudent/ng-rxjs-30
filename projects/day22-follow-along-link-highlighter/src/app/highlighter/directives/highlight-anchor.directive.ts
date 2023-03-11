import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'a',
})
export class HighlightAnchorDirective {
  nativeElement!: HTMLAnchorElement;
  constructor(el: ElementRef<HTMLAnchorElement>) {
    this.nativeElement = el.nativeElement;
  }
}
