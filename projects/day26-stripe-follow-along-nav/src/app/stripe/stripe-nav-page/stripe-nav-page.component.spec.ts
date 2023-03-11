import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeNavPageComponent } from './stripe-nav-page.component';

describe('StripeNavPageComponent', () => {
  let component: StripeNavPageComponent;
  let fixture: ComponentFixture<StripeNavPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StripeNavPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StripeNavPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
