import { RealmApplication } from './realmApplication.model';

export interface ExternalProvider {
  id?: string;
  name: string;
  key: string;
  secret: string;
  realmApplicationId: string;
  realmApplication?: RealmApplication;
}
