import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InboxModule } from './inbox';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
