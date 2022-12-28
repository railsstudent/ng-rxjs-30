import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<app-mole></app-mole>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'Day30 Wrack a mole';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
