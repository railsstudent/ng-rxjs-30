import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseMoveComponent } from './mouse-move/mouse-move.component';

@NgModule({
  declarations: [MouseMoveComponent],
  imports: [CommonModule],
  exports: [MouseMoveComponent],
})
export class MouseMoveModule {}
