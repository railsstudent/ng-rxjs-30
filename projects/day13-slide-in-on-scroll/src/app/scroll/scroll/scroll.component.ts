import {
  Component,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  Inject,
  ElementRef,
} from '@angular/core';
import { debounceTime, fromEvent, map, startWith } from 'rxjs';
import { WINDOW } from '../../core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styles: [
    `
      :host {
        display: block;
      }

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

        &.slide-in {
          transform: translateX(-30%) scale(0.95);
        }
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
        transition: all 0.5s;

        &.active {
          opacity: 1;
          transform: translateX(0%) scale(1);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollComponent {
  @ViewChildren('img')
  sliderImages!: QueryList<ElementRef<HTMLImageElement>>;

  isSlideIn$ = fromEvent(this.window, 'scroll').pipe(
    debounceTime(20),
    map(() => this.slideImages()),
    startWith([false, false, false, false, false]),
  );

  constructor(@Inject(WINDOW) private window: Window) {}

  private slideImages() {
    const { scrollY, innerHeight } = this.window;
    return this.sliderImages.map(({ nativeElement: sliderImage }) => {
      // half way through the image
      const slideInAt = scrollY + innerHeight - sliderImage.height / 2;
      // bottom of the image
      const imageBottom = sliderImage.offsetTop + sliderImage.height;
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      const isNotScrolledPast = scrollY < imageBottom;
      return isHalfShown && isNotScrolledPast;
    });
  }
}
