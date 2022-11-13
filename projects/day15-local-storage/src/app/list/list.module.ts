import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContainerComponent } from './list-container/list-container.component';



@NgModule({
  declarations: [
    ListContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListContainerComponent
  ]
})
export class ListModule { }
