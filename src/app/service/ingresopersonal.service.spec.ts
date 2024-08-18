import { TestBed } from '@angular/core/testing';

import { IngresopersonalService } from './ingresopersonal.service';

describe('IngresopersonalService', () => {
  let service: IngresopersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresopersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
