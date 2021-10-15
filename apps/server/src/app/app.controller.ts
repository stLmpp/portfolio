import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { Tag } from './model/tag';
import { ProjectEnum } from '@stlmpp-portfolio/common';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('tags/:project')
  async getProjectTags(@Param('project') project: ProjectEnum): Promise<Tag[]> {
    return this.appService.getTags(project);
  }
}
