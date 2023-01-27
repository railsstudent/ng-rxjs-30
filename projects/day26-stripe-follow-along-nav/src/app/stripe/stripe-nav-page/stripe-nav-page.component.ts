import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stripe-nav-page',
  templateUrl: './stripe-nav-page.component.html',
  styleUrls: ['./stripe-nav-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeNavPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
