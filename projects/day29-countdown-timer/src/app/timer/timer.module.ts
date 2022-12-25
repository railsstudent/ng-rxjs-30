import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';
import { TimerPaneComponent } from './timer-pane/timer-pane.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    TimerComponent,
    TimerControlsComponent,
    TimerPaneComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimerComponent
  ]
})
export class TimerModule { }
