import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApplicationConfigInterface, ProjectEnum } from '@stlmpp-portfolio/common';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../service/application-config.service';
import { refreshMap } from '../util/refresh-map';

@Injectable({ providedIn: 'root' })
export class ApplicationConfigResolver implements Resolve<ApplicationConfigInterface> {
  constructor(private apiService: ApiService, private applicationConfigService: ApplicationConfigService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApplicationConfigInterface> | Promise<ApplicationConfigInterface> | ApplicationConfigInterface {
    const project = state.url.split('/').pop();
    if (!project) {
      throw new Error('Project not found in the url');
    }
    return this.apiService
      .getApplicationConfig(project as ProjectEnum)
      .pipe(
        refreshMap(applicationConfig =>
          this.applicationConfigService.loadApplication(applicationConfig.id, applicationConfig.tags)
        )
      );
  }
}
