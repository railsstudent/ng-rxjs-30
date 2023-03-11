import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyNavPageComponent } from './sticky-nav-page.component';

describe('StickyNavPageComponent', () => {
  let component: StickyNavPageComponent;
  let fixture: ComponentFixture<StickyNavPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickyNavPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StickyNavPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
