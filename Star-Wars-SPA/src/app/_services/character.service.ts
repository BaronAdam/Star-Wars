import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Character} from '../_models/character';
import {PaginatedResult} from "../_models/pagination";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  baseUrl = environment.apiUrl + 'character/';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.baseUrl + 'all');
  }

  getCharactersPaginated(page?, itemsPerPage?): Observable<PaginatedResult<Character[]>> {
    const paginatedResult: PaginatedResult<Character[]> = new PaginatedResult<Character[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Character[]>(this.baseUrl, {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
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
