import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeySequenceDetectionComponent } from './key-sequence-detection/key-sequence-detection.component';

@NgModule({
  declarations: [
    KeySequenceDetectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeySequenceDetectionComponent
  ]
})
export class KeySequenceDetectionModule { }
