import {Routes} from '@angular/router';
import {CharacterListComponent} from './characters/character-list/character-list.component';
import {CharacterEditComponent} from './characters/character-edit/character-edit.component';
import {CharacterNewComponent} from './characters/character-new/character-new.component';

export const appRoutes: Routes = [
  { path: 'home', component: CharacterListComponent },
  { path: 'edit/:id', component: CharacterEditComponent },
  { path: 'new', component: CharacterNewComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
