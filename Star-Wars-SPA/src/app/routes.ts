import {Routes} from '@angular/router';
import {CharacterListComponent} from './characters/character-list/character-list.component';

export const appRoutes: Routes = [
  { path: 'home', component: CharacterListComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
