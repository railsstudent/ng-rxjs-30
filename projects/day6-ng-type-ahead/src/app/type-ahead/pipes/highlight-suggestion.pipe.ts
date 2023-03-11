import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { City } from '../interfaces/city.interface';

@Pipe({
  name: 'highlightSuggestion',
  standalone: true,
})
export class HighlightSuggestionPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(suggestion: City, value: string): unknown {
    const { state, city } = suggestion;
    const regex = new RegExp(value, 'gi');
    const cityName = city.replace(regex, `<span class="hl">${value}</span>`);
    const stateName = state.replace(regex, `<span class="hl">${value}</span>`);

    return this.sanitizer.bypassSecurityTrustHtml(`${cityName}, ${stateName}`);
  }
}
