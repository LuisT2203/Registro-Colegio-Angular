import { TestBed } from '@angular/core/testing';

import { IngresopersonaexternaService } from './ingresopersonaexterna.service';

describe('IngresopersonaexternaService', () => {
  let service: IngresopersonaexternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresopersonaexternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
