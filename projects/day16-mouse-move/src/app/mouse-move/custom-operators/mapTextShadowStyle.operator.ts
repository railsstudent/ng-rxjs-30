import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapTextShadowStyle<T extends HTMLDivElement>(nativeElement: T, walk = 500) {
    return function(source: Observable<MouseEvent>): Observable<string> {
        return source.pipe(
            map((e: MouseEvent) => {
                const { offsetX: x, offsetY: y } = e;
                const evtTarget = e.target as T;
                const newOffset = { x, y };
                if (evtTarget !== nativeElement) {
                    newOffset.x = newOffset.x + evtTarget.offsetLeft;
                    newOffset.y = newOffset.y + evtTarget.offsetTop;
                }
            
                const { offsetWidth: width, offsetHeight: height } = nativeElement;
                const xWalk = Math.round((x / width * walk) - (walk / 2));
                const yWalk = Math.round((y / height * walk) - (walk / 2));
                return { xWalk, yWalk };
            }),
            map(({ xWalk, yWalk }) => 
                (`
                    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
                    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
                    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
                    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
                `))
            );
    }
}