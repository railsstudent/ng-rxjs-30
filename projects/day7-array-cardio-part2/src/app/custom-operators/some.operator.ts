import { Observable, find, map, defaultIfEmpty } from 'rxjs';

export function some<T>(predicate: (item: T) => boolean) {
    return function (source: Observable<T>) {
        return source.pipe(
            find(item => predicate(item)),
            map(c => !!c),
            defaultIfEmpty(false),
        )
    }
}