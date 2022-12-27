import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleComponent } from './mole/mole.component';

@NgModule({
  declarations: [
    MoleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoleComponent
  ]
})
export class GameModule { }
