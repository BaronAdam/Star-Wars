import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { CharacterListComponent } from './characters/character-list/character-list.component';
import { CharacterCardComponent } from './characters/character-card/character-card.component';
import { CharacterEditComponent } from './characters/character-edit/character-edit.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import { CharacterNewComponent } from './characters/character-new/character-new.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PaginationModule} from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CharacterListComponent,
    CharacterCardComponent,
    CharacterEditComponent,
    CharacterNewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    PaginationModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
