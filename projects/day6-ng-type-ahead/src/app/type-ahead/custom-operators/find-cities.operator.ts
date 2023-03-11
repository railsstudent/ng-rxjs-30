import { Observable, debounceTime, distinctUntilChanged, map, skip, startWith, withLatestFrom } from 'rxjs';
import { City } from '../interfaces/city.interface';

const findMatches = (formValue: { searchValue: string }, cities: City[]) => {
  const wordToMatch = formValue.searchValue;

  if (wordToMatch === '') {
    return [];
  }

  const regex = new RegExp(wordToMatch, 'gi');
  // here we need to figure out if the city or state matches what was searched
  return cities.filter((place) => place.city.match(regex) || place.state.match(regex));
};

export const findCities = (cities$: Observable<City[]>) => {
  return (source: Observable<{ searchValue: string }>) =>
    source.pipe(
      skip(1),
      debounceTime(300),
      distinctUntilChanged(),
      withLatestFrom(cities$),
      map(([formValue, cities]) => findMatches(formValue, cities)),
      startWith([]),
    );
};
