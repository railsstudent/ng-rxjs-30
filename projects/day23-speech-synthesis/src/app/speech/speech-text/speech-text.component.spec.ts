import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTextComponent } from './speech-text.component';

describe('SpeechTextComponent', () => {
  let component: SpeechTextComponent;
  let fixture: ComponentFixture<SpeechTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeechTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeechTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
