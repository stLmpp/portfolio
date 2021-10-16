import { ApplicationConfigInterface, ProjectEnum, uniqIdFactoryNumber } from '@stlmpp-portfolio/common';
import { Tag } from './tag';
import { ApiProperty } from '@nestjs/swagger';

const applicationConfigUid = uniqIdFactoryNumber();

export class ApplicationConfig implements ApplicationConfigInterface {
  constructor(applicationConfig: Omit<ApplicationConfig, 'id'>) {
    Object.assign(this, applicationConfig);
  }

  @ApiProperty({ type: Number }) readonly id = applicationConfigUid();
  @ApiProperty({ enum: ProjectEnum }) readonly name!: ProjectEnum;
  @ApiProperty() readonly path!: string;
  @ApiProperty({ type: Tag, isArray: true }) readonly tags!: Tag[];
}
