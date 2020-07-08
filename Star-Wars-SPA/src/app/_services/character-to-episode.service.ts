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

  getCharacterToEpisode(characterId): Observable<CharacterToEpisode[]> {
    return this.http.get<CharacterToEpisode[]>(this.baseUrl + characterId);
  }
}
