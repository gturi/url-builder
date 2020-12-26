import { UrlParamBuilder } from './url-param-builder';

/**
 * Utility to build rest API urls.
 */
export class UrlBuilder extends UrlParamBuilder {
  protected readonly paramSeparator: string = '?';

  /**
   * Creates a new a new instance of UrlBuilder.
   *
   * @param host the host of the url you are building.
   * @param port the port.
   * @param https true to use https, false to use http.
   * @returns the instance of UrlBuilder.
   */
  static create(host: string, port: number, https = true): UrlBuilder {
    let protocol = 'http';
    if (https) {
      protocol += 's';
    }
    const trimmedHost = host.trim();
    if (trimmedHost === '') {
      throw new Error('host can not be empty string');
    }
    UrlBuilder.failIfStringHasWhitespaces(trimmedHost);
    return new UrlBuilder(`${protocol}://${trimmedHost}:${port}`);
  }

  /**
   * Appends a path to the current url.
   *
   * @param path the path that should be appended to the current url.
   * @param trailingSeparator if set to {true} adds a trailing '/' at the end of the url.
   *                          This property should be used only for compatibility reasons,
   *                          since trailing '/' should be avoided when building rest API.
   * @returns a new UrlBuilder instance. Its url is obtained by combining the base url
   *          with the specified `path`.
   */
  addPath(path: string, trailingSeparator = false): UrlBuilder {
    const trimmedPath = path.trim();
    if (path === '') {
      return this;
    }
    UrlBuilder.failIfStringHasWhitespaces(trimmedPath);
    const newUrl = [
      // removes all the trailing '/'
      this.url.replace(/[/]*$/g, ''),
      // removes all the leading and trailing '/'
      trimmedPath.replace(/(^[/]*|[/]*$)/g, ''),
    ].join('/'); // the result is 'newUrl[0]/newUrl[1]'
    return new UrlBuilder(newUrl + (trailingSeparator ? '/' : ''));
  }

  /**
   * Throws an exception if the input string contains whitespaces.
   *
   * @param s a string.
   */
  private static failIfStringHasWhitespaces(s: string) {
    if (/\s/.test(s)) {
      throw new Error('path can not contain any whitespace character');
    }
  }
}
