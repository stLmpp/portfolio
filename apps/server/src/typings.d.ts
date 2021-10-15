declare module 'html-parse-stringify' {
  declare const htmlParseStringify: {
    parse(html: string, options?: IOptions): IDoc[];
    stringify(doc: IDoc): string;
  };

  export interface IDoc {
    type: string;
    content?: string;
    voidElement: boolean;
    name: string;
    attrs: Record<string, string>;
    children: IDoc[];
  }

  export interface IOptions {
    components: string[];
  }

  export default htmlParseStringify;
}
