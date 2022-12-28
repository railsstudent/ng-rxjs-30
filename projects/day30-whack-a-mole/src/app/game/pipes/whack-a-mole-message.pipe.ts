import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whackAMoletMessage'
})
export class WhackAMoleMessagePipe implements PipeTransform {

  transform(seconds: number): string {
    return seconds > 0 ? `Whack a mole in ${seconds} seconds` : ''
  }
}
