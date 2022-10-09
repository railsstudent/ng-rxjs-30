import { CityService } from './../services/city.service';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, shareReplay, skip, startWith, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { City } from '../interfaces';

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeAheadComponent implements OnInit {

  @ViewChild('searchForm', { static: true })
  searchForm!: NgForm;

  searchValue = ''
  suggestions$!: Observable<City[]>; 

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    const cities$ = this.cityService.getCities()
      .pipe(shareReplay(1));

    this.suggestions$ = this.searchForm.form.valueChanges.pipe(
      skip(1),
      debounceTime(300),
      distinctUntilChanged(),
      withLatestFrom(cities$),
      map(([formValue, cities]) => this.findMatches(formValue, cities)),
      startWith([]),
    )
  }

  findMatches(formValue: { searchValue: string }, cities: City[]) {
    const wordToMatch = formValue.searchValue;

    if (wordToMatch === '') {
      return [];
    }

    const regex = new RegExp(wordToMatch, 'gi');
      // here we need to figure out if the city or state matches what was searched
    return cities.filter(place => place.city.match(regex) || place.state.match(regex));
  }
}
