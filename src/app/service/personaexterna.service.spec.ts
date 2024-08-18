import { TestBed } from '@angular/core/testing';

import { PersonaexternaService } from './personaexterna.service';

describe('PersonaexternaService', () => {
  let service: PersonaexternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaexternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
