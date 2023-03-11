import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasModule } from './canvas';
import { CoreModule } from './core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CanvasModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
