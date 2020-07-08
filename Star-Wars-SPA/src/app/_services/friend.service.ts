import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../_models/friend';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  baseUrl = environment.apiUrl + 'friend/';

  constructor(private http: HttpClient) { }

  getFriends(characterId): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.baseUrl + characterId);
  }
}
