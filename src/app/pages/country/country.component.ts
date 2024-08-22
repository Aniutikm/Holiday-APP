import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NagerDateService } from '../../services/nager-date.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
  providers: [NagerDateService],
})
export class CountryComponent implements OnInit {
  countryCode!: string;
  holidays: any[] = [];
  currentYear: number = new Date().getFullYear();
  years: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly nagerDateService: NagerDateService
  ) {}

  ngOnInit(): void {
    this.countryCode = this.route.snapshot.paramMap.get('code')!;
    this.years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    this.loadHolidays(this.currentYear);
  }

  loadHolidays(year: number): void {
    this.nagerDateService
      .getHolidays(year, this.countryCode)
      .subscribe((data) => {
        this.holidays = data;
      });
  }
}
