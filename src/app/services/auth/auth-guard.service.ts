import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/user.model';
import { ApiService } from '../api/api.service';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.apiService.get(`/auth/checkToken/${environment.skyhookMasterApplicationId}`).pipe(
      mergeMap((v) =>
        iif(() => {
          console.log(v);
          if (!v) {
            this.router.parseUrl('/login');
            return false;
          }
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
