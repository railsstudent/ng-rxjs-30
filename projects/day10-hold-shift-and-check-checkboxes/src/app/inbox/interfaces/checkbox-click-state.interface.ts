import { Message } from './message.interface';

export interface CheckboxClickState {
    isShiftKeyPressed: boolean;
    isChecked: boolean;
    lastCheck: number;
}

export interface InBetweenCheckboxClicked extends CheckboxClickState {
    prevCheck: number;
    messages: Message[];
}
