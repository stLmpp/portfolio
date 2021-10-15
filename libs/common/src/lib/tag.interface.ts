export interface TagInterface {
  readonly tag: string;
  readonly attributes: [attribute: string, value?: string][];
  readonly location: 'body' | 'head';
}
