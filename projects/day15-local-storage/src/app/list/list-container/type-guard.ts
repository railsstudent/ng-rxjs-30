import { NewItem, ToggleItems } from '../interfaces';

export function isNewItem(data: any): data is NewItem {
    return 'text' in data;
}

export function isToggleItems(data: any): data is ToggleItems {
    return 'action' in data && data.action === 'toggleAll';
}