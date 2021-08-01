import { RealmApplication } from './realmApplication.model';
import { RealmRoles } from './realmRoles.model';

export interface Realm {
  id?: string;
  name?: string;
  realmRoles?: RealmRoles[];
  realmApplications?: RealmApplication[];
}
