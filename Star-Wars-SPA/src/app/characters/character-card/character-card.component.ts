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
