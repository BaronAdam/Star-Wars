import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CharacterToEpisode} from '../_models/character-to-episode';

@Injectable({
  providedIn: 'root'
})
export class CharacterToEpisodeService {
  baseUrl = environment.apiUrl + 'charactertoepisodexref/';

  constructor(private http: HttpClient) { }

  getCharacterToEpisode(characterId: number): Observable<CharacterToEpisode[]> {
    return this.http.get<CharacterToEpisode[]>(this.baseUrl + characterId);
  }

  sendNewCharacterToEpisode(obj: any): Observable<any> {
    return this.http.post(this.baseUrl, obj);
  }

  deleteCharacterToEpisode(id: number) : Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }
}
