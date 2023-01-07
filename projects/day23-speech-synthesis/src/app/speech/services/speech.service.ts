import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private readonly subSpeech = new BehaviorSubject<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance());

  updateSpeech(property: 'rate' | 'pitch' | 'text', value: number | string): void {
    const speech = this.subSpeech.getValue();
    if (property === 'text' && typeof value === 'string') {
      speech[property] = value;
    } else if ((property === 'rate' || property === 'pitch') && typeof value === 'number') {
      speech[property] = value;
    }
    this.subSpeech.next(speech);
  }

  toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(this.subSpeech.getValue());
    }
  }
}
