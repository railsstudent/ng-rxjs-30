import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpeechModule } from './speech';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SpeechModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
