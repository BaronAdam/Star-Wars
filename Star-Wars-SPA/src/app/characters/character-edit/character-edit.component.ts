import { Component, OnInit } from '@angular/core';
import {Character} from '../../_models/character';
import {CharacterService} from '../../_services/character.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {
  character: Character;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.characterService.getCharacter(this.route.snapshot.params.id).subscribe((character: Character) => {
      this.character = character;
    }, error => {
      console.log(error);
    });
  }

}
