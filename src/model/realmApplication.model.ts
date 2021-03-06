import { ExternalProvider } from './externalProvider.model';
import { Realm } from './realm.model';
import { RealmApplicationURL } from './realmApplicationURL.model';
import { User } from './user.model';

export interface RealmApplication {
  id?: string;
  clientId?: string;
  clientSecret?: string;
  displayName?: string;
  users?: User[];
  realm?: Realm;
  realmApplicationURLs?: RealmApplicationURL[];
  externalProvider?: ExternalProvider[];
}
