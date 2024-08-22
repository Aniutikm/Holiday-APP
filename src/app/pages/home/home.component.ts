import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RandomCountriesComponent } from '../../components/random-countries/random-countries.component';
import { NagerDateService } from '../../services/nager-date.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    RandomCountriesComponent,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NagerDateService],
})
export class HomeComponent implements OnInit {
  countries: { countryCode: string; name: string }[] = [];
  searchQuery: string = '';
  randomCountries: any[] = [];

  constructor(private readonly nagerDateService: NagerDateService) {}

  ngOnInit(): void {
    this.nagerDateService.getCountries().subscribe((data) => {
      this.countries = data;
      this.loadRandomCountries();
    });
  }

  loadRandomCountries(): void {
    const shuffled = [...this.countries].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    selected.forEach((country) => {
      this.nagerDateService
        .getNextHoliday(country.countryCode)
        .subscribe((holidays) => {
          this.randomCountries.push({
            name: country.name,
            holiday: holidays[0], // Get the first upcoming holiday
          });
        });
    });
  }

  filterCountries() {
    return this.countries.filter((country) =>
      country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
