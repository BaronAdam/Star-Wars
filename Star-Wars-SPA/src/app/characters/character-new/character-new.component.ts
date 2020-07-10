import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../_services/character.service';
import {EpisodeService} from '../../_services/episode.service';
import {Character} from '../../_models/character';
import {Episode} from '../../_models/episode';
import {CharacterToEpisodeService} from "../../_services/character-to-episode.service";
import {FriendService} from "../../_services/friend.service";

@Component({
  selector: 'app-character-new',
  templateUrl: './character-new.component.html',
  styleUrls: ['./character-new.component.css']
})
export class CharacterNewComponent implements OnInit {
  characters: Character[];
  episodes: Episode[];
  characterModel: any = {};
  episodeModel: any = {};

  constructor(private characterService: CharacterService, private episodeService: EpisodeService,
              private characterToEpisodeService: CharacterToEpisodeService, private friendService: FriendService) { }

  ngOnInit(): void {
    this.loadCharacters();
    this.loadEpisodes();
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe((characters: Character[]) => {
      this.characters = characters;
    }, error => {
      console.log(error);
    });
  }

  loadEpisodes(): void {
    this.episodeService.getEpisodes().subscribe((episodes: Episode[]) => {
      this.episodes = episodes;
    }, error => {
      console.log(error);
    });
  }

  submit(): void {

    if (this.characterModel.name !== undefined){
      this.sendCharacter();
    }
  }

  sendCharacter(): void {
    this.characterService.sendNewCharacter(this.characterModel).subscribe((character: Character) => {
      this.sendCharacterToEpisodes(character.id);
      this.sendFriends(character.id);
      alert('Created new character: ' + character.name);
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  sendCharacterToEpisodes(charactersId: number): void {
    const ids = this.getChoosenEpisodeIds();
    for (let id of  ids) {
      const model = {
        characterId: charactersId,
        episodeId: id
      };
      this.characterToEpisodeService.sendNewCharacterToEpisode(model).subscribe(() => {

      },error => {
        console.log(error);
      });
    }
  }

  sendFriends(charactersId): void {
    const ids = this.getChoosenFriendIds();
    for (let id of  ids) {
      const model = {
        characterId: charactersId,
        friendId: id
      };
      this.friendService.sendNewFriend(model).subscribe(() => {

      }, error => {
        console.log(error);
      });
    }
  }

  submitEpisode(): void {
    if (this.episodeModel.name !== undefined){
      this.sendEpisode();
    }
  }

  sendEpisode(): void {
    this.episodeService.sendNewEpisode(this.episodeModel).subscribe((episode: Episode) => {
      alert('Created new episode: ' + episode.name);
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  getChoosenFriendIds(): number[] {
    let friendIds: number[] = [];
    let checkboxes: any[] = [];
    for (let i = 0; i < this.characters.length; i++) {
      checkboxes.push(document.getElementById('character' + i));
    }
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        friendIds.push(this.characters[i].id);
      }
    }
    return friendIds;
  }

  getChoosenEpisodeIds(): number[] {
    let episodeIds: number[] = [];
    let checkboxes: any[] = [];
    for (let i = 0; i < this.episodes.length; i++) {
      checkboxes.push(document.getElementById('episode' + i));
    }
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        episodeIds.push(this.episodes[i].id);
      }
    }
    return episodeIds;
  }
}
