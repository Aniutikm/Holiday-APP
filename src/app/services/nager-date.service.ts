import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Country {
  countryCode: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class NagerDateService {
  private readonly apiUrl = 'https://date.nager.at/api/v3';

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
