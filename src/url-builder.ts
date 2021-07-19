import { UrlParamBuilder } from './url-param-builder';

/**
 * Utility to build rest API urls.
 */
export class UrlBuilder extends UrlParamBuilder {
  protected readonly paramSeparator: string = '?';

  /**
   * Creates a new {@link UrlBuilder} instance.
   *
   * @param host the host of the url you are building.
   * @param port the port.
   * @param https `true` to use https, `false` to use http.
   * @returns the new {@link UrlBuilder} instance.
   */
  static create(host: string, port: number, https: boolean = true): UrlBuilder {
    const protocol = https ? 'https' : 'http';
    const trimmedHost = host.trim();
    if (trimmedHost === '') {
      throw new Error('host can not be empty string');
    }
    UrlBuilder.failIfStringHasWhitespaces(trimmedHost);
    return new UrlBuilder(`${protocol}://${trimmedHost}:${port}`);
  }

  /**
   * Adds a path to the current url. The resulting url is obtained by appending
   * to the base one '/' separator followed by the specified `path`.
   *
   * @param path the path that should be appended to the current url.
   * @param trailingSeparator if set to `true` adds a trailing '/' after the specified `path`.
   *                          This property should be used only for compatibility reasons,
   *                          since trailing '/' should be avoided when building rest APIs.
   * @returns a new {@link UrlBuilder} instance.
   */
  addPath(path: string, trailingSeparator = false): UrlBuilder {
    let trimmedPath = path.trim();
    if (trimmedPath === '') {
      return this;
    }
    UrlBuilder.failIfStringHasWhitespaces(trimmedPath);
    // removes all the leading and trailing '/'
    trimmedPath = trimmedPath.replace(/(^[/]*|[/]*$)/g, '');
    const newUrl = this.joinToCurrentUrl(trimmedPath);
    return UrlBuilder.getNewUrlBuilder(newUrl, trailingSeparator);
  }

  /**
   * Adds a path variable to the current url. The resulting url is obtained by appending
   * to the base one '/' separator followed by the specified `path`. This method allows the va
   *
   * @param pathVariable the path that should be appended to the current url.
   * @param trim whether the path variable should be trimmed.
   * @param trailingSeparator if set to `true` adds a trailing '/' after the specified `path`.
   *                          This property should be used only for compatibility reasons,
   *                          since trailing '/' should be avoided when building rest APIs.
   * @returns a new {@link UrlBuilder} instance.
   */
  addPathVariable(pathVariable: string, trim = false, trailingSeparator = false): UrlBuilder {
    let newPathVariable = trim ? pathVariable.trim() : pathVariable;
    if (newPathVariable === '') {
      return this;
    }
    // replaces every '/' in the path variable with a '%2F'
    newPathVariable = newPathVariable.replace(/[/]/g, '%2F');
    const newUrl = this.joinToCurrentUrl(newPathVariable);
    return UrlBuilder.getNewUrlBuilder(newUrl, trailingSeparator);
  }

  /**
   * Joins a path to the current url using `/` as separator.
   *
   * @param path the path to join.
   * @returns the concatenation of `this.url`/`path`.
   */
  private joinToCurrentUrl(path: string): string {
    // removes all the trailing '/' from current url
    const url = this.url.replace(/[/]*$/g, '');
    return [url, path].join('/'); // the result is 'array[0]/array[1]'
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

  /**
   * Gets a new {@link UrlBuilder} instance.
   *
   * @param newUrl the url used to initialize {@link UrlBuilder} constructor.
   * @param trailingSeparator if set to `true` adds a trailing '/' after the specified `path`.
   * @returns a new {@link UrlBuilder} instance.
   */
  private static getNewUrlBuilder(newUrl: string, trailingSeparator: boolean): UrlBuilder {
    return new UrlBuilder(`${newUrl}${trailingSeparator ? '/' : ''}`);
  }
}
