import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealmApplicationURL } from 'src/model/realmApplicationURL.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RealmApplicationURLService {
  constructor(private apiService: ApiService) {}

  endpoint: string = '/realmapplicationurl';

  addRealmApplicationURL(realmApplicationURL: RealmApplicationURL): Observable<RealmApplicationURL> {
    return this.apiService.post(`${this.endpoint}`, realmApplicationURL);
  }

  deleteRealmApplicationURLById(realmApplicationURLId: string): Observable<RealmApplicationURL> {
    return this.apiService.delete(`${this.endpoint}/${realmApplicationURLId}`);
  }
}
