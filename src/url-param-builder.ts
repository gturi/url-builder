export class UrlParamBuilder {
  protected url: string;

  protected readonly paramSeparator: string = '&';

  constructor(url: string) {
    // TypeScript does not have a nice support to constructor overloading,
    // for this reason failIfStringHasWhitespaces check is not done here
    // to avoid checking elements of the url that have been already validated.
    // WARNING: creating new instances of UrlBuilder and UrlParamBuilder directly
    // from the constructor will not throw any error if the url contains whitespaces!
    this.url = url.trim();
  }

  addQueryParam(key: string, value: string | number | boolean | object): UrlParamBuilder {
    if (value === null || value === undefined) {
      return this;
    }
    let v: string | number | boolean;
    switch (typeof value) {
      case 'number':
      case 'boolean':
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
