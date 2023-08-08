import { TestBed } from '@angular/core/testing';

import { OrganisaersService } from '../organisaer/organisaers.service';

describe('OrganisaersService', () => {
  let service: OrganisaersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisaersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
