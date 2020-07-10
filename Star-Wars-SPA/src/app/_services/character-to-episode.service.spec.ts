import { TestBed } from '@angular/core/testing';

import { CharacterToEpisodeService } from './character-to-episode.service';

describe('CharacterToEpisodeService', () => {
  let service: CharacterToEpisodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterToEpisodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
