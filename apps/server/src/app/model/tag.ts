import { ProjectEnum, TagAttributeInterface, TagInterface, uniqIdFactoryNumber } from '@stlmpp-portfolio/common';
import { IDoc } from 'html-parse-stringify';
import { ApiProperty } from '@nestjs/swagger';
import { TagLocationEnum } from '@stlmpp-portfolio/common';
import { TagTypeEnum } from '@stlmpp-portfolio/common';

const tagUid = uniqIdFactoryNumber();
const tagAttributeUid = uniqIdFactoryNumber();

export class TagAttribute implements TagAttributeInterface {
  constructor(tagAttribute: Omit<TagAttribute, 'id'>) {
    Object.assign(this, tagAttribute);
  }

  @ApiProperty({ type: Number }) readonly id = tagAttributeUid();
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly value?: string;

  static fromAttributes(attributes: Record<string, string>): TagAttribute[] {
    return Object.entries(attributes).map(([name, value]) => new TagAttribute({ name, value }));
  }
}

export class Tag implements TagInterface {
  constructor(tag: Omit<Tag, 'id'>) {
    Object.assign(this, tag);
  }

  @ApiProperty({ type: Number }) readonly id = tagUid();
  @ApiProperty({ enum: TagTypeEnum }) readonly tag!: TagTypeEnum;
  @ApiProperty({ type: TagAttribute, isArray: true }) readonly attributes!: TagAttribute[];
  @ApiProperty({ enum: TagLocationEnum }) readonly location!: TagLocationEnum;

  static fromDoc(doc: IDoc, location: TagLocationEnum, project: ProjectEnum): Tag {
    if (doc.attrs.href) {
      doc = { ...doc, attrs: { ...doc.attrs, href: resolvePath(doc.attrs.href, project) } };
    }
    if (doc.attrs.src) {
      doc = { ...doc, attrs: { ...doc.attrs, src: resolvePath(doc.attrs.src, project) } };
    }
    return new Tag({ tag: doc.name as TagTypeEnum, location, attributes: TagAttribute.fromAttributes(doc.attrs) });
  }
}

function resolvePath(file: string, project: ProjectEnum): string {
  if (file.charAt(0) === '/') {
    file = file.slice(1);
  }
  return `${project}/${file}`;
}
