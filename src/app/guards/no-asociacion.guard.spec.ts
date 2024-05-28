import { TestBed } from '@angular/core/testing';

import { NoAsociacionGuard } from './no-asociacion.guard';

describe('NoAsociacionGuard', () => {
  let guard: NoAsociacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAsociacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
