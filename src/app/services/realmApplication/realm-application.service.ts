import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealmApplication } from 'src/model/realmApplication.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RealmApplicationService {
  constructor(private apiService: ApiService) {}

  endpoint: string = '/realmapplication';

  createRealmApplicationByRealmId(realmId: string, realmApplication: RealmApplication): Observable<RealmApplication> {
    return this.apiService.post<RealmApplication, RealmApplication>(`${this.endpoint}/${realmId}`, realmApplication);
  }

  updateRealmApplicationById(realmApplication: RealmApplication): Observable<RealmApplication> {
    return this.apiService.update<RealmApplication, RealmApplication>(this.endpoint, realmApplication);
  }

  deleteRealmApplictionById(id: string): Observable<RealmApplication> {
    return this.apiService.delete<RealmApplication>(`${this.endpoint}/${id}`);
  }
}
