import { TestBed } from '@angular/core/testing';

import { PpffService } from './ppff.service';

describe('PpffService', () => {
  let service: PpffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
