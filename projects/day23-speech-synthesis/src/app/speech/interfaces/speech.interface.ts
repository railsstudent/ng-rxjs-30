export type PropertyName = keyof Pick<SpeechSynthesisUtterance, 'rate' | 'pitch' | 'text'>;
export type SpeechProperties = { name: PropertyName; value: string };
