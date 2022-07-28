import { TestBed } from '@angular/core/testing';

import { AuthSkyhookFrontendService } from './auth-skyhook-frontend.service';

describe('AuthSkyhookFrontendService', () => {
  let service: AuthSkyhookFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSkyhookFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
