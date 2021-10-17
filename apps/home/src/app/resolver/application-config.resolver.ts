import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApplicationConfigInterface, ProjectEnum } from '@stlmpp-portfolio/common';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationConfigResolver implements Resolve<ApplicationConfigInterface> {
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApplicationConfigInterface> | Promise<ApplicationConfigInterface> | ApplicationConfigInterface {
    const project = state.url.split('/').pop();
    if (!project) {
      throw new Error('Project not found in the url');
    }
    return this.apiService.getApplicationConfig(project as ProjectEnum);
  }
}
