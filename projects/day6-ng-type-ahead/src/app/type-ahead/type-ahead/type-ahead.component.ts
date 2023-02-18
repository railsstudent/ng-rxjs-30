import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, shareReplay, skip, startWith, withLatestFrom } from 'rxjs';
import { City } from '../interfaces';
import { HighlightSuggestionPipe } from '../pipes/highlight-suggestion.pipe';

const getCities = () => {
  const httpService = inject(HttpClient);
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  return httpService.get<City[]>(endpoint).pipe(shareReplay(1));
}

const findMatches = (formValue: { searchValue: string }, cities: City[]) => {
  const wordToMatch = formValue.searchValue;

  if (wordToMatch === '') {
    return [];
  }

  const regex = new RegExp(wordToMatch, 'gi');
    // here we need to figure out if the city or state matches what was searched
  return cities.filter(place => place.city.match(regex) || place.state.match(regex));
}

@Component({
  selector: 'app-type-ahead',
  standalone: true,
  imports: [
    HighlightSuggestionPipe,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  template: `
    <form class="search-form" #searchForm="ngForm">
      <input type="text" class="search" placeholder="City or State" [(ngModel)]="searchValue" name="searchValue">
      <ul class="suggestions" *ngIf="suggestions$ | async as suggestions">
        <ng-container *ngTemplateOutlet="suggestions?.length ? hasSuggestions : promptFilter; context: { suggestions, searchValue }"></ng-container>
      </ul>
    </form>

    <ng-template #promptFilter>
      <li>Filter for a city</li>
      <li>or a state</li>
    </ng-template>

    <ng-template #hasSuggestions let-suggestions="suggestions" let-searchValue="searchValue">
      <li *ngFor="let suggestion of suggestions">
        <span [innerHtml]="suggestion | highlightSuggestion:searchValue"></span>
        <span class="population">{{ suggestion.population | number }}</span>
      </li>
    </ng-template>
  `,
  styleUrls: ['./type-ahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeAheadComponent implements OnInit {

  @ViewChild('searchForm', { static: true })
  searchForm!: NgForm;

  searchValue = ''
  suggestions$!: Observable<City[]>; 
  
  ngOnInit(): void {
    const cities$ = getCities();
    this.suggestions$ = this.searchForm.form.valueChanges.pipe(
      skip(1),
      debounceTime(300),
      distinctUntilChanged(),
      withLatestFrom(cities$),
      map(([formValue, cities]) => findMatches(formValue, cities)),
      startWith([]),
    )
  }
}
