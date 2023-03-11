import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoStripeComponent } from './photo-stripe.component';

describe('PhotoStripeComponent', () => {
  let component: PhotoStripeComponent;
  let fixture: ComponentFixture<PhotoStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoStripeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
