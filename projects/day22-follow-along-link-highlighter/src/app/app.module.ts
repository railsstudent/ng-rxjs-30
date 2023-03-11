import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { HighlighterModule } from './highlighter';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HighlighterModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
