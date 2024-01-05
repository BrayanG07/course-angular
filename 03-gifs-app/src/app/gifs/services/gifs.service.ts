import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  public gifsList: Gif[] = [];
  private apiKey: string = 'OAsowcrgCuTXpAphfjx5nafyaZqqh5Ac';
  private endpointUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.readLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (!tag) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10')

    this.http
      .get<SearchResponse>(`${this.endpointUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data
      });

  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((item) => item !== tag);
    }

    this._tagsHistory.unshift(tag);

    // * Limitando el arreglo a 10 elementos
    this._tagsHistory = this._tagsHistory.splice(0, 9);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history_tags', JSON.stringify(this._tagsHistory));
  }

  private readLocalStorage(): void {
    const tags = localStorage.getItem('history_tags')
    if (!tags) return;

    this._tagsHistory = JSON.parse(tags) as string[];
    this.searchTag(this._tagsHistory[0]);
  }
}
