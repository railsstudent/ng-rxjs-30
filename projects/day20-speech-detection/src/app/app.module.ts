import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpeechDetectionModule } from './speech-detection/speech-detection.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SpeechDetectionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
