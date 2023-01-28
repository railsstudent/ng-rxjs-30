import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { filter, map, merge, Observable, startWith, tap } from 'rxjs';
import { StripeService } from '../services/stripe.service';

// [style.width.px]="backgroundStyle.width"
// [style.height.px]="backgroundStyle.height"
// [style.transform]="backgroundStyle.transform"
// [ngClass]="{ 'open': isBackgroundOpen$ | async }"

@Component({
  selector: 'app-stripe-card',
  template: `
    <!-- <ng-container *ngIf="backgroundStyle$ | async as backgroundStyle"> -->
    <ng-container>
      <div class="dropdownBackground" #background>
        <span class="arrow"></span>
      </div>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }

    .arrow {
      position: absolute;
      width: 20px;
      height: 20px;
      display: block;
      background: white;
      transform: translateY(-50%) rotate(45deg);
    }

    .dropdownBackground {
      width: 100px;
      height: 100px;
      position: absolute;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 50px 100px rgba(50,50,93,.1), 0 15px 35px rgba(50,50,93,.15), 0 5px 15px rgba(0,0,0,.1);
      transition: all 0.3s, opacity 0.1s, transform 0.2s;
      transform-origin: 50% 0;
      display: flex;
      justify-content: center;
      opacity: 0;
    }

    .dropdownBackground.open {
      opacity: 1;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeCardComponent implements OnInit {

  @Input()
  content!: TemplateRef<any>;

  @ViewChild('background', { static: true, read: ElementRef })
  background!: ElementRef<HTMLDivElement>;

  isBackgroundOpen$!: Observable<boolean>;
  backgroundStyle$!: Observable<{ width: number; height: number; transform: string }>;

  constructor(private stripeService: StripeService) { }

  ngOnInit(): void {
    // const isOpen$ = this.stripeService.showCardComponent$
    //   .pipe(
    //     map(({ component }) => component && component === this),
    //     startWith(false)
    //   );

    // const isClose$ = this.stripeService.hideCardComponent$
    //   .pipe(
    //     filter((component) => component && component === this),
    //     map(() => false),
    //     startWith(false)
    //   );

    // this.isBackgroundOpen$ = merge(isOpen$, isClose$);

    // const navCoords = this.stripeService.navCoords;
    // this.backgroundStyle$ = this.stripeService.showCardComponent$
    //   .pipe(
    //     filter(({ component }) => component === this),
    //     map(({ dropdownCoords }) => {
    //       const navTop = navCoords?.top || 0;
    //       const navLeft = navCoords?.left || 0;
    //       const results = {
    //         height: dropdownCoords.height,
    //         width: dropdownCoords.width,
    //         top: dropdownCoords.top - navTop,
    //         left: dropdownCoords.left - navLeft,
    //       };

    //       return {
    //         height: results.height,
    //         width: results.width,
    //         transform: `translate(${results.left}px, ${results.top}px)`
    //       }
    //     }),
    //     tap((x) => console.log(x)),
    //     startWith({
    //       height: 0,
    //       width: 0,
    //       transform: '',
    //     })
    //   );
  }

}
