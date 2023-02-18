import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable, shareReplay } from 'rxjs';
import { findCities } from '../custom-operators/find-cities.operator';
import { City } from '../interfaces/city.interface';
import { HighlightSuggestionPipe } from '../pipes/highlight-suggestion.pipe';

const getCities = () => {
  const httpService = inject(HttpClient);
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  return httpService.get<City[]>(endpoint).pipe(shareReplay(1));
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
  cities$ = getCities();
  
  ngOnInit(): void {
    this.suggestions$ = this.searchForm.form.valueChanges.pipe(findCities(this.cities$)); 
  }
}
