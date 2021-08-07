import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenPayload } from 'src/model/accessTokenPayload';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}
  endpoint: string = '/auth';

  login(email: string, password: string): Observable<{ accessToken: string; refreshToken: string }> {
    return this.apiService.post(`${this.endpoint}/login`, {
      email,
      password,
    });
  }

  logout(): Observable<boolean> {
    return this.apiService.post<boolean, { refreshToken: string }>(`${this.endpoint}/logout`, {
      refreshToken: localStorage.getItem('refreshToken'),
    });
  }

  saveTokenPayloadToLocalStorage() {
    const accessToken = localStorage.getItem('accessToken');
    const decodedAccessToken = JSON.parse(atob(accessToken.split('.')[1])) as AccessTokenPayload;
    localStorage.setItem('email', decodedAccessToken.email);
    localStorage.setItem('exp', decodedAccessToken.exp);
    localStorage.setItem('iat', decodedAccessToken.iat);
    localStorage.setItem('userId', decodedAccessToken.userId);
    localStorage.setItem('username', decodedAccessToken.username);
  }
}
