/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
import { expect } from 'chai';
import 'mocha';
import { UrlBuilder } from '../src/index';

describe('UrlBuilder', () => {

  const exampleUrl = 'https://localhost:8080';
  const examplePath = 'test';

  describe('#create()', () => {
    it(`should return ${exampleUrl} input values are 'localhost', '8080'`, () => {
      const url = UrlBuilder.create('localhost', 8080).build();

      expect(url).to.equal(exampleUrl);
    });

    const httpExampleUrl = 'http://localhost:8080';

    it(`should return ${httpExampleUrl} input values are 'localhost', '8080', 'false'`, () => {
      const url = UrlBuilder.create('localhost', 8080, false).build();

      expect(url).to.equal(httpExampleUrl);
    });

    it('should remove leading and trailing whitespaces', () => {
      const url = UrlBuilder.create(' localhost ', 8080).build();

      expect(url).to.equal(exampleUrl);
    });
  });

  describe('#addPath()', () => {

    const paths = [`${examplePath}`, `/${examplePath}`, `${examplePath}/`, `/${examplePath}/`];

    paths.forEach((path) => {
      it(`should return {basePath}/${examplePath} when its value is '${path}'`, () => {
        const url = UrlBuilder.create('localhost', 8080)
          .addPath(path)
          .build();

        expect(url).to.equal(`${exampleUrl}/${examplePath}`);
      });
    });

    paths.forEach((path) => {
      it(`should return {basePath}/${examplePath}/ when its values are '${path}', 'true'`, () => {
        const url = UrlBuilder.create('localhost', 8080)
          .addPath(path, true)
          .build();

        expect(url).to.equal(`${exampleUrl}/${examplePath}/`);
      });
    });

    it('should not modify the original path', () => {
      const url = UrlBuilder.create('localhost', 8080);

      expect(url.build()).to.equal(exampleUrl);

      const newUrl = url.addPath(examplePath);

      expect(url.build()).to.equal(exampleUrl);
      expect(newUrl.build()).to.equal(`${exampleUrl}/${examplePath}`);
    });

    it('should remove leading and trailing whitespaces', () => {
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(` ${examplePath} `)
        .addPath('foo ')
        .build();
      expect(url).to.equal(`${exampleUrl}/${examplePath}/foo`);
    });
  });

  describe('#addQueryParam()', () => {
    it('should insert \'?\' to separate the first param from the path', () => {
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(examplePath)
        .addQueryParam('foo', 'bar')
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=bar`);
    });

    it('should insert \'&\' to separate query params from the second param onwards', () => {
      const url = UrlBuilder.create('localhost', 8080)
        .addPath(examplePath)
        .addQueryParam('foo', 'bar')
        .addQueryParam('baz', 'qux')
        .addQueryParam('quux', 'quuz')
        .build();

      expect(url).to.equal(`${exampleUrl}/${examplePath}?foo=bar&baz=qux&quux=quuz`);
    });
  });
});
