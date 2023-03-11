import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDetectionComponent } from './speech-detection.component';

describe('SpeechDetectionComponent', () => {
  let component: SpeechDetectionComponent;
  let fixture: ComponentFixture<SpeechDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechDetectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeechDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
