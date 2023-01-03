import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechSynthesisComponent } from './speech-synthesis/speech-synthesis.component';



@NgModule({
  declarations: [
    SpeechSynthesisComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpeechSynthesisComponent
  ]
})
export class SpeechModule { }
