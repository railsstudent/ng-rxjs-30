import { ElementRef, QueryList } from '@angular/core';
import { fromEvent, map, merge } from 'rxjs';
import { HighlightAnchorDirective } from '../directives/highlight-anchor.directive';

export function createMouseEnterStream(
  elementRefs:
    | ElementRef<HTMLAnchorElement>[]
    | QueryList<HighlightAnchorDirective>,
  window: Window
) {
  const mouseEnter$ = elementRefs.map(({ nativeElement }) =>
    fromEvent(nativeElement, 'mouseenter').pipe(
      map(() => {
        const linkCoords = nativeElement.getBoundingClientRect();
        return {
          width: linkCoords.width,
          height: linkCoords.height,
          top: linkCoords.top + window.scrollY,
          left: linkCoords.left + window.scrollX,
        };
      })
    )
  );

  return merge(...mouseEnter$).pipe(
    map((coords) => ({
      width: `${coords.width}px`,
      height: `${coords.height}px`,
      transform: `translate(${coords.left}px, ${coords.top}px)`,
    }))
  );
}
