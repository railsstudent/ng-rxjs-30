import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-stripe-card',
  template: `
    <ng-container>
      <div class="dropdownBackground">
          <span class="arrow"></span>
      </div>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </ng-container>
  `,
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
