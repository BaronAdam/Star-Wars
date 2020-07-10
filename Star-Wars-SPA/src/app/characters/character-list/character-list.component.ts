import { Component, OnInit } from '@angular/core';
import {Character} from '../../_models/character';
import {CharacterService} from '../../_services/character.service';
import {PaginatedResult, Pagination} from '../../_models/pagination';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Character[];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  pageChanged(event: any): void {
  }

  loadCharacters(): void {
    this.characterService.getCharactersPaginated(this.pageNumber, this.pageSize)
      .subscribe((paginatedResult: PaginatedResult<Character[]>) => {
        this.characters = paginatedResult.result;
        this.pagination = paginatedResult.pagination;
    }, error => {
      console.log(error);
    });
  }
}
