import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-photo-stripe',
  templateUrl: './photo-stripe.component.html',
  styleUrls: ['./photo-stripe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoStripeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
