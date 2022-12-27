import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameModule } from './game';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
