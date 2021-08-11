import { TestBed } from '@angular/core/testing';

import { RealmApplicationURLService } from './realm-application-url.service';

describe('RealmApplicationURLService', () => {
  let service: RealmApplicationURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealmApplicationURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
