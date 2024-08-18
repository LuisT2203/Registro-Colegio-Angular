import { TestBed } from '@angular/core/testing';

import { IngresoppffService } from './ingresoppff.service';

describe('IngresoppffService', () => {
  let service: IngresoppffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoppffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
