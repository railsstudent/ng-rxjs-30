import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private readonly subSpeech = new BehaviorSubject<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance());

  updateMessage(msg: string) {
    const speech = this.subSpeech.getValue();
    speech.text = msg;
    this.subSpeech.next(speech);
  }

  toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(this.subSpeech.getValue());
    }
  }
}
