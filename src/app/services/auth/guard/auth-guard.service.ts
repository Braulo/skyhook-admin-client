import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.apiService.get(`/auth/checkToken`).pipe(
      mergeMap((user) =>
        iif(() => {
          if (!user) {
            this.router.parseUrl('/login');
            return false;
          }
          this.authService.saveTokenPayloadToLocalStorage();
          return true;
        }, of(true)),
      ),
      catchError((err) => {
        this.router.navigateByUrl('/login');
        return of(err);
      }),
    );
  }
}
