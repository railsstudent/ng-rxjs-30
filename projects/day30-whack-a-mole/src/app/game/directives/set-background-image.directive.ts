import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetBackgroundImage]',
  standalone: true,
})
export class SetBackgroundImageDirective implements OnInit {
  @Input()
  image!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const imageUrl = `url(${image})`;
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundImage', imageUrl);
  }
}
