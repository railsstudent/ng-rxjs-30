export type ItemAction = 'delete' | 'toggle';

export interface ToggleItems {
  action: 'toggleAll'
}

export interface ToggleItem {
    action: ItemAction;
    index: number;
    done: boolean;
}
