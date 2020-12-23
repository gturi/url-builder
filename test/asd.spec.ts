/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
import { expect } from 'chai';
import 'mocha';
import { UrlBuilder } from '../src/index';

describe('UrlBuilder', () => {

  const exampleUrl = 'https://localhost:8080';

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
  });
});
