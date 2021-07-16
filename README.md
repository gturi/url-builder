# UrlBuilder

| branch | build | coverage |
| --- | --- | --- |
| main | [![lint-and-test](https://github.com/FlamingTuri/url-builder/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/FlamingTuri/url-builder/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/FlamingTuri/url-builder/badge.svg?branch=main)](https://coveralls.io/github/FlamingTuri/url-builder?branch=main) |
| develop | [![lint-and-test](https://github.com/FlamingTuri/url-builder/actions/workflows/lint-and-test.yml/badge.svg?branch=develop)](https://github.com/FlamingTuri/url-builder/actions/workflows/lint-and-test.yml) | [![Coverage Status](https://coveralls.io/repos/github/FlamingTuri/url-builder/badge.svg?branch=develop)](https://coveralls.io/github/FlamingTuri/url-builder?branch=develop) |

Utility to help building http urls for your API.

## Installing

```
$ npm install http-url-builder
```

## Examples

Basic setup:
```js
import { UrlBuilder } from 'http-url-builder';

const url = UrlBuilder.create('localhost', 8080).build();

console.log(url);
// https://localhost:8080
```

Build an url:
```js
// 'false' uses 'http' instead of 'https'
const url = UrlBuilder.create('localhost', 8080/*, false*/)
    .addPath('foo')
    .addPath('bar')
    .addQueryParam('baz', 'qux')
    .addQueryParam('test', 123)
    .build();

console.log(url);
// https://localhost:8080/foo/bar?baz=qux&test=123
```

`addQueryParam()` accepts strings, numbers, booleans and objects. Objects will be converted to their JSON representation to create the url.
```js
const obj = {
    foo: 'bar',
    baz: 0,
    qux: true,
};
const url = UrlBuilder.create('localhost', 8080)
    .addPath('example')
    .addQueryParam('myObj', obj)
    .build();

console.log(url);
// https://localhost:8080/example?myObj={"foo":"bar","baz":0,"qux":true}
```

Each `addPath()` and `addQueryParam()` operation creates a new UrlBuilder instance.
Thanks to immutability, paths can not be accidentally modified:
```js
const base = UrlBuilder.create('localhost', 8080).addPath('base');

const fooUrl = base.addPath('foo');
const barUrl = base.addPath('bar');

console.log(base.build());   // https://localhost:8080/base
console.log(fooUrl.build()); // https://localhost:8080/base/foo
console.log(barUrl.build()); // https://localhost:8080/base/bar
```

If you already have an url, you can convert it to an UrlBuilder instance by using its constructor:
```js
const url = new UrlBuilder("https://localhost:8080/my/path");
```

# License

[MIT](LICENSE)
