import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { CharacterListComponent } from './characters/character-list/character-list.component';
import { CharacterCardComponent } from './characters/character-card/character-card.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CharacterListComponent,
    CharacterCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
