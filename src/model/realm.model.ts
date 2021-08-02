import { RealmApplication } from './realmApplication.model';
import { RealmRole } from './realmRoles.model';

export interface Realm {
  id?: string;
  name?: string;
  realmRoles?: RealmRole[];
  realmApplications?: RealmApplication[];
}
