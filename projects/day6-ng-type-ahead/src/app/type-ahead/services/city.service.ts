import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  constructor(private httpService: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.httpService.get<City[]>(this.endpoint);
  }
}
