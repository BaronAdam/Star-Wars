import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  characterNames: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCharacterNames();
  }

  getCharacterNames(): void {
    this.http.get('http://localhost:5000/api/Character').subscribe(response => {
      this.characterNames = response;
    }, error => {
      console.log(error);
    });
  }

}
