export interface SpeechRecognitionInfo {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export type Transcript = Omit<
  SpeechRecognitionInfo,
  'isFinal' | 'confidence'
> & { confidencePercentage: string };
