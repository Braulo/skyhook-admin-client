import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/user.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  endpoint: string = '/user';

  getAllUsersByRealmId(realmId: string): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.endpoint}/getallusersinrealm/${realmId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.apiService.update(this.endpoint, user);
  }
}
