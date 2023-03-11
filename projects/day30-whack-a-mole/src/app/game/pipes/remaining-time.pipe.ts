import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remainingTime',
})
export class RemainingTimePipe implements PipeTransform {
  transform(seconds: number | null): string {
    if (seconds == null) {
      return '';
    }

    const units = seconds > 1 ? 'seconds' : 'second';
    return `Time remained: ${seconds} ${units}`;
  }
}
