import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>('http://localhost:3000/api/' + endpoint, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  public post<T, V>(endpoint: string, body: V): Observable<T> {
    return this.http.post<T>('http://localhost:3000/api/' + endpoint, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
