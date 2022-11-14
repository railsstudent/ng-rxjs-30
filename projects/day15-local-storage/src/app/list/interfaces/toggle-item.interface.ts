export interface ToggleItem {
    action: 'delete' | 'toggle';
    index: number;
    done: boolean;
}
