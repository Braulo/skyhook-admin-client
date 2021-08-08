import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { delay, retryWhen, switchMap, take } from 'rxjs/operators';
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

  refreshAccessToken(): Observable<string> {
    return this.apiService.post(`${this.endpoint}/refreshaccesstoken`, {
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

  getTokenPayloadFromLocalStorage(): AccessTokenPayload {
    return {
      email: localStorage.getItem('email'),
      exp: localStorage.getItem('exp'),
      iat: localStorage.getItem('iat'),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
    };
  }

  hasUserValidRefreshToken(): Observable<boolean> {
    return this.apiService.post(`${this.endpoint}/checkrefreshtoken`, {
      refreshToken: localStorage.getItem('refreshToken'),
    });
  }

  startAutoRefresh() {
    const accessTokenCheckInterval = interval(100000);
    accessTokenCheckInterval
      .pipe(
        switchMap(() => {
          return this.refreshAccessToken();
        }),
        retryWhen((errors) => errors.pipe(delay(50000), take(10))),
      )
      .subscribe((res) => {
        localStorage.setItem('accessToken', res);
        this.saveTokenPayloadToLocalStorage();
      });
  }
}
