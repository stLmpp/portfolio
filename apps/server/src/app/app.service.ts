import { Injectable } from '@nestjs/common';
import { Tag } from './model/tag';
import { ProjectEnum } from '@stlmpp-portfolio/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { FRONT_END_PATH } from './shared/constants';
import htmlParseStringify, { IDoc } from 'html-parse-stringify';

@Injectable()
export class AppService {
  private _findDoc(docs: IDoc[], tag: string): IDoc {
    for (const doc of docs) {
      if (doc.type === 'tag' && doc.name === tag) {
        return doc;
      } else if (doc.children.length) {
        return this._findDoc(doc.children, tag);
      }
    }
    throw new Error(`${tag} not found`);
  }

  private _findScriptAndStyles(doc: IDoc): IDoc[] {
    const docs: IDoc[] = [];
    if (doc.type === 'tag' && (doc.name === 'script' || doc.name === 'link')) {
      docs.push(doc);
    }
    for (const child of doc.children ?? []) {
      docs.push(...this._findScriptAndStyles(child));
    }
    return docs;
  }

  private _findScriptAndStylesMultiple(docs: IDoc[]): IDoc[] {
    const newDocs: IDoc[] = [];
    for (const doc of docs) {
      newDocs.push(...this._findScriptAndStyles(doc));
    }
    return newDocs;
  }

  private async _getIndexHTML(project: ProjectEnum): Promise<string> {
    const path = resolve(FRONT_END_PATH, project, 'index.html');
    return readFile(path).then(buffer => buffer.toString());
  }

  async getTags(project: ProjectEnum): Promise<Tag[]> {
    const indexHTML = await this._getIndexHTML(project);
    const docs = htmlParseStringify.parse(indexHTML);
    return { docs, find: this._findScriptAndStylesMultiple(docs) } as any;
    return [];
  }
}
