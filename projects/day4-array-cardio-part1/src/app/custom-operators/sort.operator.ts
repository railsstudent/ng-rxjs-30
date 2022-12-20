import { Observable, map, toArray } from 'rxjs';

export function sort<T>(sortFn: (x: T, y: T) => number) {
    return function(source: Observable<T>) {
        return source.pipe(
            toArray(),
            map(items => items.sort(sortFn))
        )
    }
}