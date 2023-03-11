import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { StickyNavModule } from './sticky-nav';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StickyNavModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
