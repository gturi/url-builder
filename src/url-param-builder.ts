export class UrlParamBuilder {
  protected url: string;

  protected readonly paramSeparator: string = '&';

  constructor(url: string) {
    this.url = url.trim();
  }

  addQueryParam(key: string, value: string | number | object): UrlParamBuilder {
    if (value === null || value === undefined) {
      return this;
    }
    let v: string;
    switch (typeof value) {
      case 'number':
      case 'boolean':
        v = `${value}`;
        break;
      case 'string':
        v = value;
        break;
      default:
        v = JSON.stringify(value);
    }
    return new UrlParamBuilder(`${this.url}${this.paramSeparator}${key}=${v}`);
  }

  build(): string {
    return this.url;
  }
}
