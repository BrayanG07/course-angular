import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../../environments/environments';
import { Observable, catchError, combineLatest, map, of } from 'rxjs';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl: string = enviroments.baseUrlCountry;
  private _regions: Region[] = [
    Region.AFRICA,
    Region.AMERICAS,
    Region.ASIA,
    Region.EUROPE,
    Region.OCEANIA,
  ];

  constructor(private httpClient: HttpClient) { }

  public findCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.httpClient.get<Country[]>(url).pipe(
      map((countries): SmallCountry[] => this.setSmallCountries(countries)),
      catchError(() => of([]))
    );
  }

  get regions(): Region[] {
    return [...this._regions];
  }

  findCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url: string = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.httpClient.get<Country>(url).pipe(
      map((country): SmallCountry => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      }))
    );
  }

  private setSmallCountries(countries: Country[]): SmallCountry[] {
    return countries.map((country): SmallCountry => ({
      name: country.name.common,
      cca3: country.cca3,
      borders: country.borders ?? [],
    }))
  }

  findCountriesByAlphaCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([])

    // * Aqui tenemos una coleccion de observables que aun NO se han disparado
    const countryRequests: Observable<SmallCountry>[] = []

    borders.forEach(code => {
      const request = this.findCountryByAlphaCode(code); // * Aun NO hacemos las peticiones
      countryRequests.push(request);
    })

    // combineLatest = cuando aplicamos el .subscribe el combine ejecutara todos los observables de manera simultanea.
    return combineLatest(countryRequests);
  }
}
