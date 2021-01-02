# url-builder

| branch | build |
| --- | ---|
| main | [![Build Status](https://travis-ci.com/FlamingTuri/url-builder.svg?token=E3xjCEVnoxq524EqpdKt&branch=main)](https://travis-ci.com/FlamingTuri/url-builder) |
| develop | [![Build Status](https://travis-ci.com/FlamingTuri/url-builder.svg?token=E3xjCEVnoxq524EqpdKt&branch=develop)](https://travis-ci.com/FlamingTuri/url-builder) |

Utility to help building http urls for your API.

## Installing

```
$ npm install http-url-builder
```

## Examples

Basic setup:
```js
import { UrlBuilder } from 'http-url-builder';

let base = UrlBuilder.create('localhost', 8080).build();

console.log(base); // output: https://localhost:8080
```

Build an url:
```js
// 'false' uses 'http' instead of 'https'
let myUrl = UrlBuilder.create('localhost', 8080/*, false*/)
    .addPath('foo')
    .addPath('bar')
    .addQueryParam('baz', 'qux')
    .addQueryParam('test', 123)
    .build();

console.log(myUrl); // output: https://localhost:8080/foo/bar?baz=qux&test=123
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

console.log(url); // https://localhost:8080/example?myObj={"foo":"bar","baz":0,"qux":true}
```

Each `addPath()` and `addQueryParam()` operation creates a new UrlBuilder instance.
Thanks to immutability, paths can not be accidentally modified:
```js
let base = UrlBuilder.create('localhost', 8080).addPath('base');

let fooUrl = base.addPath('foo');
let barUrl = base.addPath('bar');

console.log(base.build());   // output: https://localhost:8080/base
console.log(fooUrl.build()); // output: https://localhost:8080/base/foo
console.log(barUrl.build()); // output: https://localhost:8080/base/bar
```

If you already have an url, you can convert it to an UrlBuilder instance by using its constructor:
```js
let myUrl = new UrlBuilder("https://localhost:8080/my/path");
```

# License

[MIT](LICENSE)
