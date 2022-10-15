export interface MouseInfo {
    offsetX: number;
    offsetY: number;
}

export interface LineInfo {
    hue: number;
    prev: MouseInfo | undefined;
    curr: MouseInfo | undefined;
}