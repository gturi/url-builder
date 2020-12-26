/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
import { expect } from 'chai';
import 'mocha';
import { UrlBuilder } from '../src/index';

describe('UrlBuilder', () => {

  const host = 'localhost';
  const port = 8080;
  const exampleUrl = `https://${host}:${port}`;
  const examplePath = 'test';

  describe('#create()', () => {
    it(`should return ${exampleUrl} input values are '${host}', '${port}'`, () => {
      const url = UrlBuilder.create(host, port).build();

      expect(url).to.equal(exampleUrl);
    });

    const httpExampleUrl = `http://${host}:${port}`;

    it(`should return ${httpExampleUrl} input values are '${host}', '${port}', 'false'`, () => {
      const url = UrlBuilder.create(host, port, false).build();

      expect(url).to.equal(httpExampleUrl);
    });

    it('should remove leading and trailing whitespaces', () => {
      const url = UrlBuilder.create(` ${host} `, port).build();

      expect(url).to.equal(exampleUrl);
    });

    it('should not allow whitespaces inside path', () => {
      expect(() => UrlBuilder.create(' local host ', port)).to.throw('path can not contain any whitespace character');
    });

    it('should not allow host to be equal to empty string', () => {
      expect(() => UrlBuilder.create('', port)).to.throw('host can not be empty string');
    });
  });

  describe('#addPath()', () => {

    const paths = [`${examplePath}`, `/${examplePath}`, `${examplePath}/`, `/${examplePath}/`];

    paths.forEach((path) => {
      it(`should return {basePath}/${examplePath} when its value is '${path}'`, () => {
        const url = UrlBuilder.create(host, port)
          .addPath(path)
          .build();

        expect(url).to.equal(`${exampleUrl}/${examplePath}`);
      });
    });

    paths.forEach((path) => {
      it(`should return {basePath}/${examplePath}/ when its values are '${path}', 'true'`, () => {
        const url = UrlBuilder.create(host, port)
          .addPath(path, true)
          .build();

        expect(url).to.equal(`${exampleUrl}/${examplePath}/`);
      });
    });

    it('should not modify the original path', () => {
      const url = UrlBuilder.create(host, port);

      expect(url.build()).to.equal(exampleUrl);

      const newUrl = url.addPath(examplePath);

      expect(url.build()).to.equal(exampleUrl);
      expect(newUrl.build()).to.equal(`${exampleUrl}/${examplePath}`);
    });

    it('should remove leading and trailing whitespaces', () => {
      const url = UrlBuilder.create(host, port)
        .addPath(` ${examplePath} `)
        .addPath('foo ')
        .build();
      expect(url).to.equal(`${exampleUrl}/${examplePath}/foo`);
    });

    it('should not allow whitespaces inside path', () => {
      const urlBuilder = UrlBuilder.create(host, port);
      expect(() => urlBuilder.addPath('te st')).to.throw('path can not contain any whitespace character');
    });

    it('should return the same UrlBuilder reference if path is equal to empty string', () => {
      const urlBuilder = UrlBuilder.create(host, port);

      const urlBuilder2 = urlBuilder.addPath('');
      expect(urlBuilder === urlBuilder2).to.equal(true);
      expect(urlBuilder).to.equal(urlBuilder2);

      expect(urlBuilder.build()).to.equal(exampleUrl);
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
      const obj = {
        foo: 'bar',
        baz: 0,
        qux: true,
      };
      const url = UrlBuilder.create(host, port)
        .addPath(examplePath)
        .addQueryParam('obj', obj)
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?obj={"foo":"bar","baz":0,"qux":true}`);
    });
  });
});
