import { TagLocationEnum } from './tag-location.enum';
import { TagTypeEnum } from './tag-type.enum';

export interface TagInterface {
  readonly id: number;
  readonly tag: TagTypeEnum;
  readonly attributes: TagAttributeInterface[];
  readonly location: TagLocationEnum;
}

export interface TagAttributeInterface {
  readonly id: number;
  readonly name: string;
  readonly value?: string;
}
