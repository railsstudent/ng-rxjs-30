import { CityService } from './../services/city.service';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, shareReplay, skip, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { City } from '../interfaces';

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeAheadComponent implements OnInit, OnDestroy {

  @ViewChild('searchForm', { static: true })
  searchForm!: NgForm;

  searchValue = ''
  destroy$ = new Subject<void>();

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    const cities$ = this.cityService.getCities()
      .pipe(shareReplay(1));

    this.searchForm.form.valueChanges.pipe(
      skip(1),
      debounceTime(300),
      distinctUntilChanged(),
      tap(value => console.log(value)),
      withLatestFrom(cities$),
      map(([formValue, cities]) => this.findMatches(formValue, cities)),
      takeUntil(this.destroy$)
    )
    .subscribe(matches => console.log(matches));
  }

  findMatches(formValue: { searchValue: string }, cities: City[]) {
    const wordToMatch = formValue.searchValue;
    const regex = new RegExp(wordToMatch, 'gi');
      // here we need to figure out if the city or state matches what was searched
    return cities.filter(place => place.city.match(regex) || place.state.match(regex));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
