import { reduce } from 'rxjs';

export function minMaxVideos<T>(comparer: (x: T, y: T) => number) {
    return reduce((acc, item: T) => {
        if (acc.min && acc.max) {    
            return {
                min: comparer(acc.min, item) < 0 ? acc.min : item,
                max: comparer(item, acc.max) > 0 ? item : acc.max,
            }
        }

        return {
            min: item,
            max: item,
        }
    }, { } as { min?: T, max?: T });
}