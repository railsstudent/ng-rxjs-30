import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoleComponent } from './mole/mole.component';
import { RemainingTimePipe, WhackAMoleMessagePipe } from './pipes';

@NgModule({
  declarations: [
    MoleComponent,
    WhackAMoleMessagePipe,
    RemainingTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoleComponent
  ]
})
export class GameModule { }
