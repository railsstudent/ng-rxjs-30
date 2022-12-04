import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTotalSeconds'
})
export class FormatTotalSecondsPipe implements PipeTransform {

  transform(totalSeconds: number): string {
    let secondsLeft = totalSeconds;

    const hours = Math.floor(secondsLeft / 60 / 60);
    secondsLeft = secondsLeft % 3600;
    
    const minutes = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;

    return `${hours} Hours ${minutes} minutes ${secondsLeft} seconds`;
  }
}
