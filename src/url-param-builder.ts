/**
 * Utility to add query params to rest API urls.
 */
export class UrlParamBuilder {
  protected url: string;

  protected readonly paramSeparator: string = '&';

  /**
   * Default constructor. Outside of url trimming and non empty check,
   * no other validation check is performed on the input string.
   *
   * @param url the url.
   */
  constructor(url: string) {
    // TypeScript does not have a nice support to constructor overloading,
    // for this reason failIfStringHasWhitespaces check is not done here
    // to avoid checking elements of the url that have been already validated.
    // WARNING: creating new instances of UrlBuilder and UrlParamBuilder directly
    // from the constructor will not throw any error if the url contains whitespaces!
    this.url = url.trim();
    if (url === '') {
      throw new Error('url can not be empty string');
    }
  }

  /**
   * Adds a query param to the url.
   *
   * @param key the query param name.
   * @param value the value of the query param. Values with type == object
   *              will converted to JSON string.
   * @returns a new [[UrlParamBuilder]] instance. Its url is obtained by appending to the base url
   *          '?' or '&' followed by `key`=`value` string. '?' will be used the first time this
   *          function gets called, '&' will be used the other times.
   */
  addQueryParam(key: string, value: string | number | boolean | object): UrlParamBuilder {
    if (key === '' || value === null || value === undefined) {
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

  /**
   * Builds the url.
   *
   * @returns the built url.
   */
  build(): string {
    return this.url;
  }
}
