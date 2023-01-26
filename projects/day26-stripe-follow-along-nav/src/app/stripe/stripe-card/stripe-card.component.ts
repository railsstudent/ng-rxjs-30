import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stripe-card',
  templateUrl: './stripe-card.component.html',
  styleUrls: ['./stripe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
