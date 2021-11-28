import { TestBed } from '@angular/core/testing';

import { CalculsService } from './calculs.service';

describe('CalculsService', () => {
  let service: CalculsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
