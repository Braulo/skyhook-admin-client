import { TestBed } from '@angular/core/testing';

import { ExternalProviderService } from './external-provider.service';

describe('ExternalProviderService', () => {
  let service: ExternalProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
