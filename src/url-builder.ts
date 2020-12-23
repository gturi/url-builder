import { UrlParamBuilder } from './url-param-builder';

export class UrlBuilder extends UrlParamBuilder {
  protected readonly paramSeparator: string = '?';

  static create(host: string, port: number, https = true) {
    let protocol = 'http';
    if (https) {
      protocol += 's';
    }
    const trimmedHost = host.trim();
    UrlBuilder.failIfStringHasWhitespaces(trimmedHost);
    return new UrlBuilder(`${protocol}://${trimmedHost}:${port}`);
  }

  addPath(path: string, trailingSeparator = false): UrlBuilder {
    const trimmedPath = path.trim();
    UrlBuilder.failIfStringHasWhitespaces(trimmedPath);
    const newUri = [
      this.url.replace(/[/]*$/g, ''),
      trimmedPath.replace(/(^[/]*|[/]*$)/g, ''),
    ].join('/');
    return new UrlBuilder(newUri + (trailingSeparator ? '/' : ''));
  }

  protected static failIfStringHasWhitespaces(s: string) {
    if (/\s/.test(s)) {
      throw new Error('path can not contain any whitespace character');
    }
  }
}
