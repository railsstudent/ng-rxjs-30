import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeCardComponent } from './stripe-card.component';

describe('StripeCardComponent', () => {
  let component: StripeCardComponent;
  let fixture: ComponentFixture<StripeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
