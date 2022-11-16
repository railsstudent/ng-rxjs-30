import { NewItem, ToggleItem, ToggleItems } from '../interfaces';

export function isNewItem(data: any): data is NewItem {
    return 'text' in data;
}

export function isToggleItem(data: any): data is ToggleItem {
    return 'index' in data;
}

export function isToggleItems(data: any): data is ToggleItems {
    return 'action' in data && data.action === 'toggleAll';
}