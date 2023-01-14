import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HighlighterModule } from './highlighter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HighlighterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
