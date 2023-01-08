export type RateOrPitch = keyof Pick<SpeechSynthesisUtterance, 'rate' | 'pitch'>;
export type SpeechProperties = { name: RateOrPitch, value: number } | { name: 'text', value: string };
