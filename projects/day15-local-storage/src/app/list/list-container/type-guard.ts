import { ToggleItem } from './../interfaces/toggle-item.interface';
import { Item } from '../interfaces/item.interface';

export function isItem(data: any): data is Item {
    return 'text' in data;
}

export function isToggleItem(data: any): data is ToggleItem {
    return 'index' in data;
}