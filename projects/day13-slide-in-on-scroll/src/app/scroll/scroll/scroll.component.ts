import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChildren, QueryList, Inject, ElementRef } from '@angular/core';
import { Subject, debounceTime, fromEvent, of, mergeMap, Observable, startWith } from 'rxjs';
import { WINDOW } from '../../core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styles: [`
  .site-wrap {
      max-width: 700px;
      margin: 100px auto;
      background: white;
      padding: 40px;
      text-align: justify;
    }

    .align-left {
      float: left;
      margin-right: 20px;
    }

    .align-right {
      float: right;
      margin-left: 20px;

      &.slide-in {
        transform: translateX(30%) scale(0.95);
      }
    }

    .slide-in {
      opacity: 0;
      transition: all .5s;
    }

    .align-left.slide-in {
      transform: translateX(-30%) scale(0.95);
    }
    
    .align-right.slide-in {
      transform: translateX(30%) scale(0.95);
    }

    .slide-in.active {
      opacity: 1;
      transform: translateX(0%) scale(1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit, OnDestroy {

  @ViewChildren('img')
  sliderImages!: QueryList<ElementRef<HTMLImageElement>>;

  destroy$ = new Subject<void>();
  isSlideIn$!: Observable<boolean[]>;

  constructor(@Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    // const { scrollY, innerHeight } = this.window;
    this.isSlideIn$ = fromEvent(this.window, 'scroll')
      .pipe(
        debounceTime(20),
        mergeMap(() => {
          const { scrollY, innerHeight } = this.window;
          const isShowSliders = this.sliderImages.map(({ nativeElement: sliderImage }) => {
            // half way through the image
            const slideInAt = (scrollY + innerHeight) - sliderImage.height / 2;
            // bottom of the image
            const imageBottom = sliderImage.offsetTop + sliderImage.height;
            const isHalfShown = slideInAt > sliderImage.offsetTop;
            const isNotScrolledPast = scrollY < imageBottom;
            return isHalfShown && isNotScrolledPast;
          })
          return of(isShowSliders);
        }),
        startWith([false, false, false, false, false])
        // takeUntil(this.destroy$)
      )
      // .subscribe(value => { 
      //   console.log(value);
      // });
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
