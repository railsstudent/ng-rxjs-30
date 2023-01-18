import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StickyNavModule } from './sticky-nav';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StickyNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
