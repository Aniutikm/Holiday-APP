import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NagerDateService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/AvailableCountries`);
  }

  getNextHoliday(countryCode: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/NextPublicHolidays/${countryCode}`
    );
  }

  getHolidays(year: number, countryCode: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/PublicHolidays/${year}/${countryCode}`
    );
  }
}
