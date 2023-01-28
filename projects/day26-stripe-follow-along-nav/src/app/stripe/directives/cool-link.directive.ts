import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '.link'
})
export class CoolLinkDirective {
  nativeElement!: HTMLLinkElement;

  constructor(el: ElementRef<HTMLLinkElement>) {
    this.nativeElement = el.nativeElement;
  }
}
