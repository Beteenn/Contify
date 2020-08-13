import { TestBed } from '@angular/core/testing';

import { MovimentService } from './moviment.service';

describe('MovimentService', () => {
  let service: MovimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
