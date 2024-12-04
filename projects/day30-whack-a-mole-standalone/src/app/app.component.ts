import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MoleComponent } from './game/mole/mole.component';

@Component({
    selector: 'app-root',
    imports: [MoleComponent],
    template: '<app-mole></app-mole>',
    styles: [
        `
      :host {
        display: block;
      }
    `,
    ]
})
export class AppComponent {
  constructor(titleService: Title) {
    const title = 'Day30 Wrack a mole';
    titleService.setTitle(title);
  }
}
