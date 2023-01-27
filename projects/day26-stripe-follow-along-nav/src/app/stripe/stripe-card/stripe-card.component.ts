import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-stripe-card',
  templateUrl: './stripe-card.component.html',
  styleUrls: ['./stripe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripeCardComponent implements OnInit {

  @Input()
  content!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
