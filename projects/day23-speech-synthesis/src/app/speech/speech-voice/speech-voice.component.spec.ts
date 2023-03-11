import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechVoiceComponent } from './speech-voice.component';

describe('SpeechVoiceComponent', () => {
  let component: SpeechVoiceComponent;
  let fixture: ComponentFixture<SpeechVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeechVoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeechVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
