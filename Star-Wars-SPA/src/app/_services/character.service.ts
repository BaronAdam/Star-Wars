import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Character} from '../_models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  baseUrl = environment.apiUrl + 'character/';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.baseUrl);
  }

  getCharacter(id): Observable<Character> {
    return this.http.get<Character>(this.baseUrl + id);
  }
}
