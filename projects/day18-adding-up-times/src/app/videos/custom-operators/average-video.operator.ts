import { map, Observable, reduce } from 'rxjs';
import { VideoTime } from '../interfaces/video-time.interface';

export function averageVideoTime<T extends VideoTime>() {
    return function (source: Observable<T>) {
        return source.pipe(
            reduce((acc, item: T) => {
                const [aMinutes, aSeconds] = item.time.split(':').map(parseFloat);
                const aTotalSeconds = aSeconds + aMinutes * 60;;

                acc.total = acc.total + aTotalSeconds;
                acc.count = acc.count + 1;
                return acc;
            }, { total: 0, count: 0 }),
            map((acc) => Math.floor(acc.total / Math.max(acc.count, 1)))
        )
    }
}