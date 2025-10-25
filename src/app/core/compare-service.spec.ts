import { TestBed } from '@angular/core/testing';

import { CompareService } from './compare-service';

describe('Compare', () => {
  let service: CompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
