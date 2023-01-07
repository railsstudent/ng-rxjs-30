import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private readonly speech = new SpeechSynthesisUtterance();
  private voices: SpeechSynthesisVoice[] = [];

  updateSpeech(property: 'rate' | 'pitch' | 'text', value: number | string): void {
    if (property === 'text' && typeof value === 'string') {
      this.speech[property] = value;
    } else if ((property === 'rate' || property === 'pitch') && typeof value === 'number') {
      this.speech[property] = value;
    }
    this.toggle();
  }

  setVoices(voices: SpeechSynthesisVoice[]) {
    this.voices = voices;
  }

  updateVoice(voiceName: string): void {
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.speech.voice = voice;
    }
    this.toggle();
  }

  toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(this.speech);
    }
  }
}
