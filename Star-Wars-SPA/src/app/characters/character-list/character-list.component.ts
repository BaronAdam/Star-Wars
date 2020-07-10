import { Component, OnInit } from '@angular/core';
import {Character} from '../../_models/character';
import {CharacterService} from '../../_services/character.service';
import {EpisodeService} from '../../_services/episode.service';
import {FriendService} from '../../_services/friend.service';
import {CharacterToEpisodeService} from '../../_services/character-to-episode.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Character[];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe((characters: Character[]) => {
      this.characters = characters;
    }, error => {
      console.log(error);
    });
  }
}
