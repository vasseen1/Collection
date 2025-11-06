import { TestBed } from '@angular/core/testing';

import { Volume } from './volume';

describe('Volume', () => {
  let service: Volume;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Volume);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
