import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { City } from '../interfaces';

@Pipe({
  name: 'highlightSuggestion'
})
export class HighlightSuggestionPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(suggestion: City, value: string): unknown {
    const { state, population, city } = suggestion
    const regex = new RegExp(value, 'gi');
    const cityName = city.replace(regex, `<span class="hl">${value}</span>`);
    const stateName = state.replace(regex, `<span class="hl">${value}</span>`);

    return this.sanitizer.bypassSecurityTrustHtml(`
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${this.numberWithCommas(population)}</span>
    `);
  }

  private numberWithCommas(population: string): string {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
