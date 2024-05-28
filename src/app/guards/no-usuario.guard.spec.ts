import { TestBed } from '@angular/core/testing';

import { NoUsuarioGuard } from './no-usuario.guard';

describe('NoUsuarioGuard', () => {
  let guard: NoUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
