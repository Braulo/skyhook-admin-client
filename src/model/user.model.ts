import { RealmApplication } from './realmApplication.model';
import { RealmRoles } from './realmRoles.model';

export interface User {
  id?: string;
  email?: string;
  password?: string;
  username?: string;
  emailConfirmed?: boolean;
  realmApplication?: RealmApplication;
  realmRoles?: RealmRoles[];
}
