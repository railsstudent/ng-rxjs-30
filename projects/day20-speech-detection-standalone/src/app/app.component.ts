import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SpeechDetectionComponent } from './speech-detection/speech-detection/speech-detection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpeechDetectionComponent],
  template: '<app-speech-detection></app-speech-detection>',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Day20 Speech Detection Standalone';

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
