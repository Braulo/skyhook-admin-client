import { TestBed } from '@angular/core/testing';

import { RealmRoleService } from './realm-role.service';

describe('RealmRoleService', () => {
  let service: RealmRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealmRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
