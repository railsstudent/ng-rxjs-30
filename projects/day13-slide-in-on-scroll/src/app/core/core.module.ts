import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WINDOW_PROVIDERS } from './services/window.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [WINDOW_PROVIDERS],
})
export class CoreModule {}
