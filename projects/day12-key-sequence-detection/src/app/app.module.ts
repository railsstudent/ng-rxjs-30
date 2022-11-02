import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeySequenceDetectionModule } from './key-sequence-detection';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KeySequenceDetectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
