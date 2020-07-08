import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../_models/character';
import {Episode} from '../../_models/episode';
import {DetailsService} from '../../_services/details.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  choosenEpisodes: Episode[] = [];
  friends: Character[] = [];

  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.choosenEpisodes = this.detailsService.loadEpisodes(this.character.id);
    this.friends = this.detailsService.loadFriends(this.character.id);
  }
}
//   loadEpisodes(): void {
//     this.characterToEpisodeService.getCharacterToEpisode(this.character.id)
//       .subscribe((characterToEpisode: CharacterToEpisode[]) => {
//         for (const data of characterToEpisode) {
//           this.episodeService.getEpisode(data.episodeId).subscribe((episode: Episode) => {
//             this.choosenEpisodes.push(episode);
//           }, error => {
//             console.log(error);
//           });
//         }
//       }, error => {
//         console.log(error);
//     });
//   }
//
//   loadFriends(): void {
//     this.friendService.getFriends(this.character.id).subscribe((friends: Friend[]) => {
//       for (const friend of friends) {
//         this.characterService.getCharacter(friend.friendId).subscribe((character: Character) => {
//           this.friends.push(character);
//         }, error => {
//           console.log(error);
//         });
//       }
//     }, error => {
//       console.log(error);
//     });
//   }
// }
