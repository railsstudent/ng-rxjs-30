import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';

@NgModule({
  declarations: [
    TimerComponent,
    TimerControlsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimerComponent
  ]
})
export class TimerModule { }
