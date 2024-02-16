import { TestBed } from '@angular/core/testing';

import { UserexpService } from './userexp.service';

describe('UserexpService', () => {
  let service: UserexpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserexpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
