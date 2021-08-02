import { TestBed } from '@angular/core/testing';

import { RealmApplicationService } from './realm-application.service';

describe('RealmApplicationService', () => {
  let service: RealmApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealmApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
