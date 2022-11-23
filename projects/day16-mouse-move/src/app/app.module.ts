import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MouseMoveModule } from './mouse-move';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MouseMoveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
