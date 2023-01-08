import { Injectable } from '@angular/core';
import { SpeechProperties } from '../interfaces/speech.interface';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];

  updateSpeech(property: SpeechProperties): void {
    const { name, value } = property;
    if ((name === 'text')) {
      localStorage.setItem(name, value);
    } else if (['rate', 'pitch'].includes(name)) {
      localStorage.setItem(name, `${value}`);
    }
    this.toggle();
  }

  getVoices(): SpeechSynthesisVoice[] {
    return speechSynthesis.getVoices()
      .filter(voice => voice.lang.includes('en'));
  }

  setVoices(voices: SpeechSynthesisVoice[]): void {
    this.voices = voices;
  }

  updateVoice(voiceName: string): void {
    localStorage.setItem('voice', voiceName);
    this.toggle();
  }

  private getVoice(voiceName: string): SpeechSynthesisVoice | null {
    const voice = this.voices.find(v => v.name === voiceName);
    return voice ? voice : null;
  }

  toggle(startOver = true): void {
    const speech = this.makeRequest();
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(speech);
    }
  }

  private makeRequest() {
    const speech = new SpeechSynthesisUtterance();
    speech.text = localStorage.getItem('text') || '';
    speech.rate = +(localStorage.getItem('rate') || '1');
    speech.pitch = +(localStorage.getItem('pitch') || '1');
    const voice = this.getVoice(localStorage.getItem('voice') || '');
    if (voice) {
      speech.voice = voice;
    }
    console.log('speech', speech);
    return speech;
  }
}
