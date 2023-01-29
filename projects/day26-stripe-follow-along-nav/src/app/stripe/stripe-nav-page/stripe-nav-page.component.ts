import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { concatMap, fromEvent, Subscription, tap, timer } from 'rxjs';
import { CoolLinkDirective } from '../directives/cool-link.directive';
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-stripe-nav-page',
  template: `
    <ng-container>
      <h2>Cool</h2>
      <nav class="top" #top>
        <div class="dropdownBackground" #background>
          <span class="arrow"></span>
        </div>
        <ul class="cool">
          <li class="link">
            <a href="#">About Me</a>
            <ng-container *ngTemplateOutlet="aboutMe"></ng-container>
          </li>
          <li class="link">
            <a href="#">Courses</a>
            <ng-container *ngTemplateOutlet="courses"></ng-container>
          </li>
          <li class="link">
            <a href="#">Other Links</a>
            <ng-container *ngTemplateOutlet="social"></ng-container>
          </li>
        </ul>
      </nav>
    </ng-container>

    <ng-template #aboutMe>
      <div class="dropdown">
        <div class="bio">
          <img src="https://logo.clearbit.com/wesbos.com">
          <p>Wes Bos sure does love web development. He teaches things like JavaScript, CSS and BBQ. Wait. BBQ isn't part of web development. It should be though!</p>
        </div>
      </div>
    </ng-template>

    <ng-template #courses>
      <ul class="dropdown courses">
        <ng-container *ngIf="coursesTaught$ | async as coursesTaught">
          <li *ngFor="let x of coursesTaught; trackBy: trackByIndex">
            <span class="code">{{ x.code }}</span>
            <a [href]="x.link">{{ x.description }}</a>
          </li>
        </ng-container>
      </ul>
    </ng-template>

    <ng-template #social>
      <ul class="dropdown">
        <ng-container *ngIf="socialAccounts$ | async as socialAccounts">
          <li *ngFor="let account of socialAccounts; trackBy: trackByIndex">
            <a class="button" [href]="account.link">{{ account.description }}</a>
          </li>
        </ng-container>
      </ul>
    </ng-template>
  `,
  styleUrls: ['./stripe-nav-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeNavPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('top', { static: true, read: ElementRef })
  nav!: ElementRef<HTMLElement>;

  @ViewChild('background', { static: true, read: ElementRef })
  background!: ElementRef<HTMLDivElement>;

  @ViewChildren(CoolLinkDirective)
  links!: QueryList<CoolLinkDirective>;

  socialAccounts$ = this.stripeService.getSocial();
  coursesTaught$ = this.stripeService.getCourses();
  subscriptions = new Subscription();

  constructor(private stripeService: StripeService) { }

  ngAfterViewInit(): void {
    const navCoords = this.nav.nativeElement.getBoundingClientRect();

    this.links.forEach(({ nativeElement }) => {
      const mouseEnterSubscription = fromEvent(nativeElement, 'mouseenter')
        .pipe(
          tap(() => nativeElement.classList.add('trigger-enter')),
          concatMap(() => timer(150).pipe(tap(() => {
              if (nativeElement.classList.contains('trigger-enter')) {
                nativeElement.classList.add('trigger-enter-active');
              }
            }))
          ),
          tap(() => {
            const dropdown = nativeElement.querySelector('.dropdown') as Element;
            const dropdownCoords = dropdown.getBoundingClientRect();
            const top = dropdownCoords.top - navCoords.top;
            const left = dropdownCoords.left - navCoords.left;

            const backgroundNativeElement = this.background.nativeElement;
            backgroundNativeElement.style.width = `${dropdownCoords.width}px`;
            backgroundNativeElement.style.height = `${dropdownCoords.height}px`;
            backgroundNativeElement.style.transform = `translate(${left}px, ${top}px)`;
            backgroundNativeElement.classList.add('open');
          })
        ).subscribe();

      const mouseLeaveSubscription = fromEvent(nativeElement, 'mouseleave')
        .pipe(
          tap(() => {
            nativeElement.classList.remove('trigger-enter-active', 'trigger-enter');
            this.background.nativeElement.classList.remove('open');
          })
        ).subscribe();

      this.subscriptions.add(mouseEnterSubscription);
      this.subscriptions.add(mouseLeaveSubscription);
    });
  }

  trackByIndex(index: number) {
    return index;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
