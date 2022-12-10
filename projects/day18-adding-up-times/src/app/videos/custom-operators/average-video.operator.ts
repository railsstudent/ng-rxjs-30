import { map, Observable, reduce } from 'rxjs';

export function averageVideoTime<T>(accumulator: (acc: number, x: T) => number) {
    return function (source: Observable<T>) {
        return source.pipe(
            reduce((acc, item: T) => 
                ({ 
                    total: accumulator(acc.total, item),
                    count: acc.count + 1
                }), 
                { total: 0, count: 0 }),
            map((acc) => Math.floor(acc.total / Math.max(acc.count, 1)))
        )
    }
}