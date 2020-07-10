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

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(this.baseUrl + id);
  }

  sendNewCharacter(obj: any): Observable<Character> {
    return this.http.post<Character>(this.baseUrl, obj);
  }

  updateCharacter(id: number, obj: any): Observable<any> {
    return this.http.put(this.baseUrl + id, obj);
  }

  deleteCharacter(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }
}
