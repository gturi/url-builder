import { UrlParamBuilder } from './url-param-builder';

export class UrlBuilder extends UrlParamBuilder {
  protected readonly paramSeparator: string = '?';

  static create(host: string, port: number, https = true) {
    let protocol = 'http';
    if (https) {
      protocol += 's';
    }
    return new UrlBuilder(`${protocol}://${host}:${port}`);
  }

  addPath(path: string, trailingSeparator = false): UrlBuilder {
    const newUri = [
      this.url.replace(/[/]*$/g, ''),
      path.trim().replace(/(^[/]*|[/]*$)/g, ''),
    ].join('/');
    return new UrlBuilder(newUri + (trailingSeparator ? '/' : ''));
  }
}
