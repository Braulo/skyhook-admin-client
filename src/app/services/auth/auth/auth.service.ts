import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/user.model';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService, private router: Router) {}

  login(email: string, password: string): Observable<User> {
    return this.apiService.post(`/auth/login`, {
      email,
      password,
    });
  }
}
