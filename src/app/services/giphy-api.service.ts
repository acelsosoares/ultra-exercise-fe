import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GiphyResponse } from '../interfaces/giphy.interface';

@Injectable({
  providedIn: 'root'
})
export class GiphyApiService {

  private apiKey: string = environment.giphyApiKey;
  private giphyURL: string = 'https://api.giphy.com/v1/gifs/';


  constructor(private http: HttpClient) { }

  getSearchGifs(query: string, limit: number = 9) {
    return this.http.get<GiphyResponse>(`${this.giphyURL}search?api_key=${this.apiKey}&q=${query}&limit=${limit}&offset=0&rating=G&lang=en`);
  }

  getTrendingGifs(limit: number = 9) {
    return this.http.get<GiphyResponse>(`${this.giphyURL}trending?api_key=${this.apiKey}&limit=${limit}&rating=G`);
  }
}