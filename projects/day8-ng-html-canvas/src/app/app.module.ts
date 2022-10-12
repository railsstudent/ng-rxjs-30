import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasModule } from './canvas';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CanvasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
