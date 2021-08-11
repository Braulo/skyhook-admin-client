import { RealmApplication } from './realmApplication.model';

export interface RealmApplicationURL {
  id?: string;
  url: string;
  realmApplication?: RealmApplication;
}
