import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';

@NgModule({
  declarations: [
    TypeAheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    TypeAheadComponent
  ]
})
export class TypeAheadModule { }
