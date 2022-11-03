import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySequenceDetectionComponent } from './key-sequence-detection.component';

describe('KeySequenceDetectionComponent', () => {
  let component: KeySequenceDetectionComponent;
  let fixture: ComponentFixture<KeySequenceDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeySequenceDetectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySequenceDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
