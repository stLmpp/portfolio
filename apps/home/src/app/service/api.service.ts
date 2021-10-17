import { environment } from '../../environments/environment';
import { ApplicationConfigInterface, ProjectEnum } from '@stlmpp-portfolio/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  private readonly _cache = this.cacheService.createCache();

  readonly endPoint = environment.api;

  getApplicationConfig(project: ProjectEnum): Observable<ApplicationConfigInterface> {
    return this.http.get<ApplicationConfigInterface>(`${this.endPoint}/${project}`).pipe(this._cache.use(project));
  }
}
