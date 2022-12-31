import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whackAMoleMessage'
})
export class WhackAMoleMessagePipe implements PipeTransform {

  transform(seconds: number | null): string {
    if (seconds == null) {
      return '';
    }

    const units = seconds > 1 ? 'seconds' : 'second'; 
    return seconds > 0 ? `Whack a mole begins in ${seconds} ${units}` : '';
  }
}
