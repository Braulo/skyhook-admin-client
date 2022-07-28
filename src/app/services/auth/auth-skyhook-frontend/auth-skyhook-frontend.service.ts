import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthSkyhookFrontendService {
  constructor() {}

  endpoint: string = '/auth/login';
  queryClient: string = `?client_id=${environment.clientId}&redirect_uri=http://localhost:3001/callback`;

  login() {
    window.location.href = `${environment.skyhookUrl}${this.endpoint}${this.queryClient}`;
  }
}
