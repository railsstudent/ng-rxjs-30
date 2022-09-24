import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrumComponent } from './drum';
import { DrumKeyComponent } from './drum-key';

@NgModule({
  declarations: [
    AppComponent,
    DrumComponent,
    DrumKeyComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
