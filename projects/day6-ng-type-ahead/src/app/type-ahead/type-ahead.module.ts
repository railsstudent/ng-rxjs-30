import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';

@NgModule({
  declarations: [
    TypeAheadComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TypeAheadComponent
  ]
})
export class TypeAheadModule { }
