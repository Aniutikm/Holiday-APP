import { TestBed } from '@angular/core/testing';

import { NagerDateService } from './nager-date.service';

describe('NagerDateService', () => {
  let service: NagerDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NagerDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
