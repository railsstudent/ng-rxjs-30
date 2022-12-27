import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<div>Wrack a mole</div>',
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
