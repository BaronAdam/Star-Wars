import { Component, OnInit } from '@angular/core';
import {Character} from '../../_models/character';
import {CharacterService} from '../../_services/character.service';
import {ActivatedRoute} from '@angular/router';
import {Friend} from '../../_models/friend';
import {Episode} from '../../_models/episode';
import {EpisodeService} from '../../_services/episode.service';
import {FriendService} from '../../_services/friend.service';
import {DetailsService} from '../../_services/details.service';
import {CharacterToEpisodeService} from '../../_services/character-to-episode.service';
import {CharacterToEpisode} from '../../_models/character-to-episode';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {
  character: Character;
  characterModel: any = {};
  characters: Character[] = [];
  episodes: Episode[];
  relatedEpisodes: Episode[];
  friends: Character[];
  friendXrefs: Friend[];
  characterToEpisodeXrefs: CharacterToEpisode[];
  isEditingFriends = false;
  isEditingEpisodes = false;

  constructor(private characterService: CharacterService, private route: ActivatedRoute,
              private episodeService: EpisodeService, private friendService: FriendService,
              private detailsService: DetailsService, private characterToEpisodeService: CharacterToEpisodeService) { }

  ngOnInit(): void {
    this.loadCharacter();

    this.loadEpisodes();

  }

  loadCharacter(): void {
    this.characterService.getCharacter(this.route.snapshot.params.id).subscribe((character: Character) => {
      this.character = character;
      this.characterModel.name = character.name;
      this.loadCharacters();
      this.loadFriends();
      this.loadRelatedEpisodes();
      this.loadXrefs();
    }, error => {
      console.log(error);
    });
  }

  loadXrefs(): void {
    this.friendService.getFriends(this.character.id).subscribe((friends: Friend[]) => {
      this.friendXrefs = friends;
    }, error => {
      console.log(error);
      return;
    });
    this.characterToEpisodeService.getCharacterToEpisode(this.character.id)
      .subscribe((characterToEpisodes: CharacterToEpisode[]) => {
        this.characterToEpisodeXrefs = characterToEpisodes;
      }, error => {
        console.log(error);
        return;
      });
  }

  loadCharacters(): void {
    this.characterService.getCharacters().subscribe((characters: Character[]) => {
      for (const character of characters) {
        if (character.id !== this.character.id) {
          this.characters.push(character);
        }
      }
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

  loadFriends(): void {
    this.friends = this.detailsService.loadFriends(this.character.id);
  }

  loadRelatedEpisodes(): void {
    this.relatedEpisodes = this.detailsService.loadRelatedEpisodes(this.character.id);
  }

  changeFriendsCheckboxState(): void {
    const arr: boolean[] = [];
    for (let i = 0; i < this.characters.length; i++) {
      for (const friend of this.friends) {
        if (friend.id === this.characters[i].id) {
          arr[i] = true;
          break;
        } else {
          arr[i] = false;
        }
      }
      this.isEditingFriends = true;
    }
    for (let i = 0; i < this.characters.length; i++) {
      const checkbox: any = document.getElementById('character' + i);
      checkbox.checked = arr[i];
      checkbox.disabled = false;
    }
  }

  changeEpisodesCheckboxState(): void {
    const arr: boolean[] = [];
    for (let i = 0; i < this.episodes.length; i++) {
      for (const episode of this.relatedEpisodes) {
        if (episode.id === this.episodes[i].id) {
          arr[i] = true;
          break;
        } else {
          arr[i] = false;
        }
      }
      this.isEditingEpisodes = true;
    }
    for (let i = 0; i < this.episodes.length; i++) {
      const checkbox: any = document.getElementById('episode' + i);
      checkbox.checked = arr[i];
      checkbox.disabled = false;
    }

  }

  submit(): void {
    if (this.characterModel.name.length === 0) {
      this.characterModel.name = this.character.name;
    }
    this.checkDataForUpdates();
    this.updateName();
    window.location.reload();
  }

  checkDataForUpdates(): void {
    if (this.isEditingEpisodes) {
      this.checkEpisodesWithPreviousData();
    }
    if (this.isEditingFriends) {
      this.checkFriendsWithPreviousData();
    }
  }

  checkFriendsWithPreviousData(): void {
    const previousState: boolean[] = [];
    const checkBoxesState: boolean[] = [];
    for (let i = 0; i < this.characters.length; i++) {
      const checkBox: any = document.getElementById('character' + i);
      checkBoxesState.push(checkBox.checked);
      previousState.push(false);
      for (const friendXref of this.friendXrefs) {
        if (friendXref.friendId === this.characters[i].id) {
          previousState[i] = true;
          break;
        }
      }
    }
    for (const [i, state] of previousState.entries()) {
      if (!(state && checkBoxesState[i])) {
        if (checkBoxesState[i]) {
          this.friendService.sendNewFriend({characterId: this.character.id, friendId: this.characters[i].id})
            .subscribe(() => {

            }, error => {
              console.log(error);
            });
        } else {
          for (const friendXref of this.friendXrefs) {
            if (this.characters[i].id === friendXref.friendId) {
              this.friendService.deleteFriend(friendXref.id).subscribe(() => {

              }, error => {
                console.log(error);
              });
            }
          }
        }
      }
    }
  }

  checkEpisodesWithPreviousData(): void {
    const previousState: boolean[] = [];
    const checkBoxesState: boolean[] = [];
    for (let i = 0; i < this.episodes.length; i++) {
      const checkBox: any = document.getElementById('episode' + i);
      checkBoxesState.push(checkBox.checked);
      previousState.push(false);
      for (const characterToEpisodeXref of this.characterToEpisodeXrefs) {
        if (characterToEpisodeXref.episodeId === this.episodes[i].id) {
          previousState[i] = true;
          break;
        }
      }
    }
    for (const [i, state] of previousState.entries()) {
      if (!(state && checkBoxesState[i])) {
        if (checkBoxesState[i]) {
          this.characterToEpisodeService.sendNewCharacterToEpisode({
            characterId: this.character.id,
            episodeId: this.episodes[i].id}).subscribe(() => {

            }, error => {
              console.log(error);
            });
        } else {
          for (const characterToEpisodeXref of this.characterToEpisodeXrefs) {
            if (this.episodes[i].id === characterToEpisodeXref.episodeId) {
              console.log("ok");
              this.characterToEpisodeService.deleteCharacterToEpisode(characterToEpisodeXref.id).subscribe(() => {

              }, error => {
                console.log(error);
              });
            }
          }
        }
      }
    }
  }

  updateName(): void {
    this.characterService.updateCharacter(this.character.id, this.characterModel).subscribe(() => {
      alert('Saved changes');
    }, error => {
      console.log(error);
    });
  }

  delete(): void {
    for (const friendXref of this.friendXrefs) {
      this.friendService.deleteFriend(friendXref.id).subscribe(() => {

      }, error => {
        console.log(error);
      });
    }
    for (const characterToEpisodeXref of this.characterToEpisodeXrefs) {
      this.characterToEpisodeService.deleteCharacterToEpisode(characterToEpisodeXref.id).subscribe(() => {

      }, error => {
        console.log(error);
      });
    }
    this.characterService.deleteCharacter(this.character.id).subscribe(() => {

    }, error => {
      console.log(error);
    });
  }
}
