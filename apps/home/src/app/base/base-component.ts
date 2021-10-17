import { Directive, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationConfigService } from '../service/application-config.service';
import { ApplicationConfigInterface } from '@stlmpp-portfolio/common';
import { RouteDataEnum } from '../model/route-data.enum';
import { WINDOW } from '../service/window.service';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected applicationConfigService: ApplicationConfigService,
    @Inject(WINDOW) protected window: Window
  ) {}

  private readonly _applicationConfig: ApplicationConfigInterface =
    this.activatedRoute.snapshot.data[RouteDataEnum.applicationConfig];

  ngOnDestroy(): void {
    this.applicationConfigService.unloadApplication(this._applicationConfig.id);
  }
}
