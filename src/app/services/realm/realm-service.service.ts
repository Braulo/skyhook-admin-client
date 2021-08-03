import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Realm } from 'src/model/realm.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RealmService {
  constructor(private apiService: ApiService) {}

  endpoint: string = '/realm';

  getAppRealms(): Observable<Realm[]> {
    return this.apiService.get<Realm[]>(`${this.endpoint}`);
  }

  createRealm(realm: Realm): Observable<Realm> {
    return this.apiService.post<Realm, Realm>(this.endpoint, realm);
  }

  updateRealm(body: Realm): Observable<Realm> {
    return this.apiService.update<Realm, Realm>(this.endpoint, body);
  }

  deleteRealmById(id: string, body: Realm): Observable<Realm> {
    return this.apiService.delete<Realm>(`${this.endpoint}/${body.id}`);
  }
}
