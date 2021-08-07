import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  clientIdQuery: string = `?clientId=${environment.clientId}`;
  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(
      `${environment.skyhookUrl}${environment.skyhookApiEndpoint}` + endpoint + this.clientIdQuery,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken') || '',
        }),
      },
    );
  }

  public post<T, V>(endpoint: string, body: V): Observable<T> {
    return this.http.post<T>(
      `${environment.skyhookUrl}${environment.skyhookApiEndpoint}` + endpoint + this.clientIdQuery,
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken') || '',
        }),
      },
    );
  }

  public update<T, V>(endpoint: string, body: V): Observable<T> {
    return this.http.put<T>(
      `${environment.skyhookUrl}${environment.skyhookApiEndpoint}` + endpoint + this.clientIdQuery,
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken') || '',
        }),
      },
    );
  }

  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(
      `${environment.skyhookUrl}${environment.skyhookApiEndpoint}` + endpoint + this.clientIdQuery,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken') || '',
        }),
      },
    );
  }
}
