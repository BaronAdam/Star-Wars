import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Episode} from '../_models/episode';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
baseUrl = environment.apiUrl + 'episode/';

  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.baseUrl);
  }

  getEpisode(id): Observable<Episode> {
    return this.http.get<Episode>(this.baseUrl + id);
  }
}
