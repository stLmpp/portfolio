import { ProjectEnum } from './project.enum';
import { TagInterface } from './tag.interface';

export interface ApplicationConfigInterface {
  readonly id: number;
  readonly name: ProjectEnum;
  readonly tags: TagInterface[];
  readonly path: string;
}
