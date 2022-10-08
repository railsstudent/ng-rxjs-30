import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TypeAheadModule } from './type-ahead';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    TypeAheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
