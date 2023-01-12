import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concatMap, filter, fromEvent, map, merge, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-slider',
  template: `
    <div class="items" #items>
      <div *ngFor="let index of panels" class="item">{{index}}</div>
    </div>
  `,
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, OnDestroy {

  @ViewChild('items', { static: true, read: ElementRef })
  slider!: ElementRef<HTMLDivElement>;

  panels = [...Array(25).keys()].map(i => i < 9 ? `0${i + 1}` : `${i + 1}`);

  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    const sliderNative = this.slider.nativeElement;
    const mouseDown$ = fromEvent(sliderNative, 'mousedown')
      .pipe(
        tap(() => sliderNative.classList.add('active')),
        tap(() => console.log('mouse down'))
      );
    const mouseLeave$ = fromEvent(sliderNative, 'mouseleave');
    const mouseUp$ = fromEvent(sliderNative, 'mouseup');
    const stop$ = merge(mouseLeave$, mouseUp$)
      .pipe(
        tap(() => sliderNative.classList.remove('active')),
        tap(() => console.log('stop dragging')),
      );
    const mouseMove$ = fromEvent(sliderNative, 'mousemove');

    this.subscription.add(
      mouseDown$.pipe(
        filter((moveDownEvent) => moveDownEvent instanceof MouseEvent),
        map((moveDownEvent) => moveDownEvent as MouseEvent),
        concatMap((moveDownEvent) => {
          const startX = moveDownEvent.pageX - sliderNative.offsetLeft;
          const scrollLeft = sliderNative.scrollLeft;          
          return mouseMove$.pipe(
            filter((moveEvent) => moveEvent instanceof MouseEvent),
            map((moveEvent) => moveEvent as MouseEvent),
            tap((moveEvent) => moveEvent.preventDefault()),
            map((e) => {
              const x = e.pageX - sliderNative.offsetLeft;
              const walk = (x - startX) * 3;
              sliderNative.scrollLeft = scrollLeft - walk;
            }),
            takeUntil(stop$)
          );
        }),
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
