import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { ProjectEnum, RouteParamEnum } from '@stlmpp-portfolio/common';
import { ApplicationConfig } from './model/application-config';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @ApiParam({ name: RouteParamEnum.project, enum: ProjectEnum })
  @ApiOkResponse({ type: ApplicationConfig })
  @Get(`:${RouteParamEnum.project}`)
  async getProjectTags(@Param(RouteParamEnum.project) project: ProjectEnum): Promise<ApplicationConfig> {
    return this.appService.getApplicationConfig(project);
  }
}
