import { TestBed } from '@angular/core/testing';

import { AsociacionService } from './asociacion.service';

describe('AsociacionService', () => {
  let service: AsociacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsociacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
