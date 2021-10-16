import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Tag } from './model/tag';
import { ProjectEnum, TagLocationEnum, TagTypeEnum } from '@stlmpp-portfolio/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { FRONT_END_PATH } from './shared/constants';
import htmlParseStringify, { IDoc } from 'html-parse-stringify';
import { ApplicationConfig } from './model/application-config';

@Injectable()
export class AppService {
  private _findDoc(docs: IDoc[], tag: TagLocationEnum): IDoc | undefined {
    for (const doc of docs) {
      if (doc.type === 'tag' && doc.name === tag) {
        return doc;
      }
      if (doc.children?.length) {
        const child = this._findDoc(doc.children, tag);
        if (child) {
          return child;
        }
      }
    }
  }

  private _findScriptAndStyles(doc: IDoc): IDoc[] {
    const tags = new Set<TagTypeEnum>([TagTypeEnum.script, TagTypeEnum.link]);
    return (doc.children ?? []).filter(_doc => _doc.type === 'tag' && tags.has(_doc.name as TagTypeEnum));
  }

  private async _getIndexHTML(project: ProjectEnum): Promise<string> {
    const path = resolve(FRONT_END_PATH, project, 'index.html');
    try {
      return readFile(path).then(buffer => buffer.toString());
    } catch (error) {
      throw new InternalServerErrorException({ message: `Finding index.html for project "${project}" failed`, error });
    }
  }

  async getTags(project: ProjectEnum): Promise<Tag[]> {
    const indexHTML = await this._getIndexHTML(project);
    const docs = htmlParseStringify.parse(indexHTML);
    const head = this._findDoc(docs, TagLocationEnum.head);
    if (!head) {
      throw new NotFoundException(`head for project "${project}" not found`);
    }
    const headScriptsAndLinks: Tag[] = this._findScriptAndStyles(head).map(doc =>
      Tag.fromDoc(doc, TagLocationEnum.head)
    );
    const body = this._findDoc(docs, TagLocationEnum.body);
    if (!body) {
      throw new NotFoundException(`body for project "${project}" not found`);
    }
    const bodyScriptsAndLinks = this._findScriptAndStyles(body).map(doc => Tag.fromDoc(doc, TagLocationEnum.body));
    return [...headScriptsAndLinks, ...bodyScriptsAndLinks];
  }

  async getApplicationConfig(project: ProjectEnum): Promise<ApplicationConfig> {
    return new ApplicationConfig({
      name: project,
      tags: await this.getTags(project),
      path: `${project}`,
    });
  }
}
