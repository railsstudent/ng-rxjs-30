import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechDetectionComponent } from './speech-detection/speech-detection.component';

@NgModule({
  declarations: [
    SpeechDetectionComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpeechDetectionComponent,
  ]
})
export class SpeechDetectionModule { }
