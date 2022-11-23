import { map } from 'rxjs/operators';

export function mapXYWalk<T extends HTMLDivElement>(nativeElement: T, walk = 500) {
    return map((e: MouseEvent) => {
        const { offsetX: x, offsetY: y } = e;
        const evtTarget = e.target as HTMLDivElement;
        const newOffset = { x, y };
        if (evtTarget !== nativeElement) {
            newOffset.x = newOffset.x + evtTarget.offsetLeft;
            newOffset.y = newOffset.y + evtTarget.offsetTop;
        }
    
        const { offsetWidth: width, offsetHeight: height } = nativeElement;
        const xWalk = Math.round((x / width * walk) - (walk / 2));
        const yWalk = Math.round((y / height * walk) - (walk / 2));
        return { xWalk, yWalk };
    })
}