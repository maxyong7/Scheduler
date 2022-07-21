import { TestBed } from '@angular/core/testing';

import { TimelistService } from './timelist.service';

describe('TimelistService', () => {
  let service: TimelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
