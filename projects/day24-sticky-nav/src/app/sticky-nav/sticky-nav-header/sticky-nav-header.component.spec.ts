import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyNavHeaderComponent } from './sticky-nav-header.component';

describe('StickNavHeaderComponent', () => {
  let component: StickyNavHeaderComponent;
  let fixture: ComponentFixture<StickyNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickyNavHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StickyNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
