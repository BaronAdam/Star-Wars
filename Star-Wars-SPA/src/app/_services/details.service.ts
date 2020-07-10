/* tslint:disable:prefer-const */
import { Injectable } from '@angular/core';
import {EpisodeService} from './episode.service';
import {CharacterToEpisodeService} from './character-to-episode.service';
import {FriendService} from './friend.service';
import {CharacterService} from './character.service';
import {CharacterToEpisode} from '../_models/character-to-episode';
import {Episode} from '../_models/episode';
import {Friend} from '../_models/friend';
import {Character} from '../_models/character';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private episodeService: EpisodeService, private characterToEpisodeService: CharacterToEpisodeService,
              private friendService: FriendService, private characterService: CharacterService) { }

  loadRelatedEpisodes(characterId): Episode[] {
    let choosenEpisodes: Episode[] = [];
    this.characterToEpisodeService.getCharacterToEpisode(characterId)
      .subscribe((characterToEpisode: CharacterToEpisode[]) => {
        for (const data of characterToEpisode) {
          this.episodeService.getEpisode(data.episodeId).subscribe((episode: Episode) => {
            choosenEpisodes.push(episode);
          }, error => {
            console.log(error);
          });
        }
      }, error => {
        console.log(error);
      });
    return choosenEpisodes;
  }

  loadFriends(CharacterId): Character[] {
    let friendTable: Character[] = [];
    this.friendService.getFriends(CharacterId).subscribe((friends: Friend[]) => {
      for (const friend of friends) {
        this.characterService.getCharacter(friend.friendId).subscribe((character: Character) => {
          friendTable.push(character);
          }, error => {
          console.log(error);
        });
      }
    }, error => {
      console.log(error);
    });
    return friendTable;
  }
}
