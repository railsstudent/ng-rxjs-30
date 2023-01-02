import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<div>It works</div>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'day23-speech-synthesis';
}
