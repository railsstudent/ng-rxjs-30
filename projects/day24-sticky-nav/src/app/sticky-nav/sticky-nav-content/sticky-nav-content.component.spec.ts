import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyNavContentComponent } from './sticky-nav-content.component';

describe('StickNavContentComponent', () => {
  let component: StickyNavContentComponent;
  let fixture: ComponentFixture<StickyNavContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickyNavContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StickyNavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
