import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealmRole } from 'src/model/realmRoles.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RealmRoleService {
  constructor(private apiService: ApiService) {}

  endpoint: string = '/realmrole';

  createRealmRole(realmRole: RealmRole): Observable<RealmRole> {
    return this.apiService.post<RealmRole, RealmRole>(`${this.endpoint}`, realmRole);
  }

  updateRealmRoleById(realmRole: RealmRole): Observable<RealmRole> {
    return this.apiService.update<RealmRole, RealmRole>(this.endpoint, realmRole);
  }

  deleteRealmRoleById(relamRoleId: string): Observable<RealmRole> {
    return this.apiService.delete<RealmRole>(`${this.endpoint}/${relamRoleId}`);
  }

  getAllRealmRolesByRealmId(realmId: string): Observable<RealmRole[]> {
    return this.apiService.get<RealmRole[]>(`${this.endpoint}/${realmId}`);
  }
}
