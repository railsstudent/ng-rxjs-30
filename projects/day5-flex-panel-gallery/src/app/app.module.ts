import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PanelsModule } from './panels';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PanelsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
