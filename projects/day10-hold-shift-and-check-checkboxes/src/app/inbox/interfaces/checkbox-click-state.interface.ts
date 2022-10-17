import { InboxItemComponent } from '../inbox-item/inbox-item.component';

export interface CheckboxClickState {
    isShiftKeyPressed: boolean;
    isChecked: boolean;
    currentItem: number;
}