import { fromEvent, tap, map, filter, scan } from 'rxjs';
import { SpeechRecognitionInfo, Transcript } from '../interfaces/speech-recognition.interface';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

export const createRecognition = () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  return recognition;
}

// export const recognition = createRecognition();

export const createRecognitionSubscription = (recognition: any) => 
  fromEvent(recognition, 'end').pipe(tap(() => recognition.start())).subscribe();


export const createWordListObservable = (recognition: any) => {
  const percent = 100;
  return fromEvent(recognition, 'result').pipe(
    map((e: any): SpeechRecognitionInfo =>  { 
      const transcript = Array.from(e.results).map((result: any) => result[0].transcript).join('');
      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      const firstResult = e.results[0];

      return {
        transcript: poopScript,
        confidence: firstResult[0].confidence,
        isFinal: firstResult.isFinal
      }
    }),
    filter(({ isFinal }) => isFinal),
    scan((acc: Transcript[], { transcript, confidence }) => 
      acc.concat({ 
        transcript,
        confidencePercentage: (confidence * percent).toFixed(2),
      }), []),
  );
}
