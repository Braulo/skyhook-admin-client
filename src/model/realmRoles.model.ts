import { Realm } from './realm.model';
import { User } from './user.model';

export interface RealmRole {
  id?: string;
  name?: string;
  displayName?: string;
  realm?: Realm;
  users?: User[];
}
