import { ChangeDetectorRef, Directive, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationConfigService } from '../service/application-config.service';
import { ApplicationConfigInterface } from '@stlmpp-portfolio/common';
import { RouteDataEnum } from '../model/route-data.enum';
import { WINDOW } from '../service/window.service';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected applicationConfigService: ApplicationConfigService,
    @Inject(WINDOW) protected window: Window,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  private readonly _applicationConfig: ApplicationConfigInterface =
    this.activatedRoute.snapshot.data[RouteDataEnum.applicationConfig];

  loading = true;

  async ngOnInit(): Promise<void> {
    await this.applicationConfigService.loadApplication(this._applicationConfig.id, this._applicationConfig.tags);
    this.loading = false;
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.applicationConfigService.unloadApplication(this._applicationConfig.id);
  }
}
