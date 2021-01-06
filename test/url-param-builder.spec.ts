/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
import { expect } from 'chai';
import 'mocha';
import { UrlBuilder } from '../src/index';
import { UrlParamBuilder } from '../src/url-param-builder';

describe('UrlParamBuilder', () => {

  const host = 'localhost';
  const port = 8080;
  const exampleUrl = `https://${host}:${port}`;
  const examplePath = 'test';

  describe('#constructor()', () => {
    it('should not allow empty strings', () => {
      expect(() => new UrlParamBuilder('')).to.throw('url can not be empty string');
    });
  });

  describe('#addQueryParam()', () => {
    it('should insert \'?\' to separate the first param from the path', () => {
      const url = UrlBuilder.create(host, port)
        .addPath(examplePath)
        .addQueryParam('foo', 'bar')
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=bar`);
    });

    it('should insert \'&\' to separate query params from the second param onwards', () => {
      const url = UrlBuilder.create(host, port)
        .addPath(examplePath)
        .addQueryParam('foo', 'bar')
        .addQueryParam('baz', 'qux')
        .addQueryParam('quux', 'quuz')
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=bar&baz=qux&quux=quuz`);
    });

    it('should allow numeric query params', () => {
      const url = UrlBuilder.create(host, port)
        .addPath(examplePath)
        .addQueryParam('foo', 1)
        .addQueryParam('bar', 2)
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=1&bar=2`);
    });

    it('should allow boolean query params', () => {
      const url = UrlBuilder.create(host, port)
        .addPath(examplePath)
        .addQueryParam('foo', true)
        .addQueryParam('bar', false)
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=true&bar=false`);
    });

    it('should JSON.stringify query params which are not of type string, number, boolean', () => {
      const baseUrl = UrlBuilder.create(host, port).addPath(examplePath);

      const obj = {
        foo: 'bar',
        baz: 0,
        qux: true,
      };
      const objUrl = baseUrl.addQueryParam('obj', obj).build();

      expect(objUrl).to.equal(`${exampleUrl}/${examplePath}?obj={"foo":"bar","baz":0,"qux":true}`);

      const array = ['foo', 'bar', 'baz'];
      const arrayUrl = baseUrl.addQueryParam('array', array).build();

      expect(arrayUrl).to.equal(`${exampleUrl}/${examplePath}?array=["foo","bar","baz"]`);
    });

    it('should return the same UrlParamBuilder reference if the key is empty string', () => {
      const urlBuilder = UrlBuilder.create(host, port)
        .addPath(examplePath);

      const urlBuilder2 = urlBuilder.addQueryParam('', 'foo');
      expect(urlBuilder === urlBuilder2).to.equal(true);
      expect(urlBuilder).to.equal(urlBuilder2);

      expect(urlBuilder.build()).to.equal(`${exampleUrl}/${examplePath}`);
    });

    it('should separate the query param from the base url with \'?\' until the input key is equal to empty string', () => {
      const urlBuilder = UrlBuilder.create(host, port)
        .addPath(examplePath)
        .addQueryParam('', 'foo')
        .addQueryParam('', 'bar')
        .addQueryParam('baz', 'qux');

      expect(urlBuilder.build()).to.equal(`${exampleUrl}/${examplePath}?baz=qux`);
    });
  });
});
