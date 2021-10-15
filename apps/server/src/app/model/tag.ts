import { TagInterface } from '@stlmpp-portfolio/common';

export class Tag implements TagInterface {
  readonly tag!: string;
  readonly attributes!: [attribute: string, value?: string][];
  readonly location!: 'body' | 'head';
}
