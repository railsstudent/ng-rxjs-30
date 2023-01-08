import { Injectable } from '@angular/core';
import { SpeechProperties } from '../interfaces/speech.interface';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private readonly speech = new SpeechSynthesisUtterance();
  private voices: SpeechSynthesisVoice[] = [];

  updateSpeech(property: SpeechProperties): void {
    const { name, value } = property;
    if ((name === 'text')) {
      this.speech[name] = value;
    } else if (['rate', 'pitch'].includes(name)) {
      this.speech[name] = value;
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
