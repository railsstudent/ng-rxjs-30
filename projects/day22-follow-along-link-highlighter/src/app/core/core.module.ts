import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WINDOW_PROVIDERS } from './services/window.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [WINDOW_PROVIDERS]
})
export class CoreModule { }
