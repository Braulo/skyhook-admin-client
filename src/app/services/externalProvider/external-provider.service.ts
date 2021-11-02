import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExternalProvider } from 'src/model/externalProvider.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ExternalProviderService {
  constructor(private apiService: ApiService) {}

  endpoint: string = '/externalprovider';

  addExternalProvider(externalProvider: ExternalProvider): Observable<ExternalProvider> {
    return this.apiService.post(`${this.endpoint}`, externalProvider);
  }

  deleteExternalProviderbyId(externalProviderId: string): Observable<ExternalProvider> {
    return this.apiService.delete(`${this.endpoint}/${externalProviderId}`);
  }
}
