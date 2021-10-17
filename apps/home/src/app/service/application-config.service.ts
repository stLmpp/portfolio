import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TagInterface } from '@stlmpp-portfolio/common';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom, fromEvent, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationConfigService {
  constructor(@Inject(DOCUMENT) private document: Document, rendererFactory2: RendererFactory2) {
    this._renderer2 = rendererFactory2.createRenderer(null, null);
  }

  private readonly _loaded = new Map<number, HTMLElement[]>();
  private readonly _renderer2: Renderer2;

  async loadApplication(id: number, tags: TagInterface[]): Promise<void> {
    if (this._loaded.has(id)) {
      return;
    }
    const elements = await Promise.all(tags.map(tag => this.loadTag(id, tag)));
    this._loaded.set(id, elements);
  }

  unloadApplication(id: number): void {
    const elements = this._loaded.get(id);
    if (!elements?.length) {
      return;
    }
    for (const element of elements) {
      element.remove();
    }
    this._loaded.delete(id);
  }

  async loadTag(id: number, tag: TagInterface): Promise<HTMLElement> {
    const element = this._renderer2.createElement(tag.tag);
    for (const attribute of tag.attributes) {
      this._renderer2.setAttribute(element, attribute.name, attribute.value ?? '');
    }
    const appendTo = this.document[tag.location];
    this._renderer2.appendChild(appendTo, element);
    return firstValueFrom(fromEvent(element, 'load').pipe(map(() => element)));
  }
}
