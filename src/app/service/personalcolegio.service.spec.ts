import { TestBed } from '@angular/core/testing';

import { PersonalcolegioService } from './personalcolegio.service';

describe('PersonalcolegioService', () => {
  let service: PersonalcolegioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalcolegioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
