import { TestBed } from '@angular/core/testing';

import { AventuraService } from '../admin/aventura.service';

describe('AventuraService', () => {
  let service: AventuraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AventuraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
