import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { ScrollModule } from './scroll';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ScrollModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
