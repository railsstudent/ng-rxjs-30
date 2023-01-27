import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CoolLinkDirective } from '../directives/cool-link.directive';
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-stripe-nav-page',
  template: `
    <ng-container>
      <h2>Cool</h2>
      <nav class="top" #top>
        <ul class="cool">
          <li #cool>
            <a href="#">About Me</a>
            <app-stripe-card [content]="aboutMe"></app-stripe-card>
          </li>
          <li #cool>
            <a href="#">Courses</a>
            <app-stripe-card [content]="courses"></app-stripe-card>
          </li>
          <li #cool>
            <a href="#">Other Links</a>
            <app-stripe-card [content]="social"></app-stripe-card>
          </li>
        </ul>
      </nav>
    </ng-container>

    <ng-template #aboutMe>
      <div class="dropdown dropdown1">
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
      <ul class="dropdown dropdown3">
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
export class StripeNavPageComponent implements OnInit, AfterViewInit {

  @ViewChild('top', { static: true, read: ElementRef })
  nav!: ElementRef<HTMLElement>;

  @ViewChildren(CoolLinkDirective)
  links!: QueryList<CoolLinkDirective>;

  socialAccounts$ = this.stripeService.getSocial();
  coursesTaught$ = this.stripeService.getCourses();

  constructor(private stripeService: StripeService) { }

  ngAfterViewInit(): void {
    console.log(this.links);
  }

  ngOnInit(): void {
  }

  trackByIndex(index: number) {
    return index;
  }
}
