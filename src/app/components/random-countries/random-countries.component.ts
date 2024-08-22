import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NagerDateService } from '../../services/nager-date.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-random-countries',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './random-countries.component.html',
  styleUrl: './random-countries.component.scss',
})
export class RandomCountriesComponent implements OnInit {
  randomCountries: any[] = [];

  constructor(private readonly nagerDateService: NagerDateService) {}

  ngOnInit(): void {
    this.getRandomCountries();
  }

  getRandomCountries(): void {
    this.nagerDateService.getCountries().subscribe((countries: any[]) => {
      const shuffled = countries.sort(() => 0.5 - Math.random());
      const selectedCountries = shuffled.slice(0, 3);

      selectedCountries.forEach((country: any) => {
        this.nagerDateService
          .getNextHoliday(country.countryCode)
          .subscribe((holiday: any) => {
            this.randomCountries.push({
              name: country.name,
              holidayName:
                holiday.length > 0 ? holiday[0].name : 'No upcoming holiday',
              holidayDate: holiday.length > 0 ? holiday[0].date : 'N/A',
            });
          });
      });
    });
  }
}
