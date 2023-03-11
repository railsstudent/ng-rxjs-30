import { Observable, map } from 'rxjs';
import { HandTransformations } from '../clock.interface';

function rotateAngle(seconds: number, minutes: number, hours: number): HandTransformations {
  const secondsDegrees = (seconds / 60) * 360 + 90;
  const minsDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;

  return {
    secondHandTransform: `rotate(${secondsDegrees}deg)`,
    minuteHandTransform: `rotate(${minsDegrees}deg)`,
    hourHandTransform: `rotate(${hourDegrees}deg)`,
  };
}

export function currentTime() {
  return map(() => {
    const time = new Date();
    return {
      seconds: time.getSeconds(),
      minutes: time.getMinutes(),
      hours: time.getHours(),
    };
  });
}

export function rotateClockHands() {
  return function (source: Observable<{ seconds: number; minutes: number; hours: number }>) {
    return source.pipe(map(({ seconds, minutes, hours }) => rotateAngle(seconds, minutes, hours)));
  };
}
