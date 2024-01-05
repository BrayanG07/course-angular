import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import {
  Region,
  SmallCountry,
} from '../../interfaces/country.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``,
})
export class SelectorPageComponent implements OnInit, OnDestroy {
  public myForm: FormGroup = this.formBuilder.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = []

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService
  ) { }

  get regions(): Region[] {
    return this.countryService.regions;
  }

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  ngOnDestroy(): void {
    // this.myForm.
  }

  private onRegionChanged(): void {
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        // * Es mejor hacerlo aqui porque aqui se ejecuta antes de hacer la peticion http
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => this.borders = []),
        switchMap((region) => this.countryService.findCountriesByRegion(region))
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
      });
  }

  private onCountryChanged(): void {
    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        // * Es mejor hacerlo aqui porque aqui se ejecuta antes de hacer la peticion http
        tap(() => this.myForm.get('border')?.setValue('')),

        // ? Si regresa true entonces continua ejecutando el switchMap y de lo contrario no ejecuta los siguientes operadores
        filter((value: string) => value ? true : false),
        switchMap((alphaCode) => this.countryService.findCountryByAlphaCode(alphaCode)),
        switchMap((country) => this.countryService.findCountriesByAlphaCodes(country.borders))
      )
      .subscribe((countries) => {
        this.borders = countries
      });
  }
}
