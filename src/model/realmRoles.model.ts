import { Realm } from './realm.model';
import { User } from './user.model';

export interface RealmRoles {
  id?: string;
  name?: string;
  displayName?: string;
  realm?: Realm;
  users?: User[];
}
