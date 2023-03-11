import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<div>Mole</div>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {

  constructor(titleService: Title) {
    const title = 'Day30 Wrack a mole';
    titleService.setTitle(title);
  }
}
