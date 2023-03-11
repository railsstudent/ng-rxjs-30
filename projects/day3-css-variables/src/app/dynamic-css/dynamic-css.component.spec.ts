import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCssComponent } from './dynamic-css.component';

describe('DynamicCssComponent', () => {
  let component: DynamicCssComponent;
  let fixture: ComponentFixture<DynamicCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicCssComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
