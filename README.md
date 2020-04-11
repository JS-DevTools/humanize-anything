Humanize Anything
======================================
### Convert any value to a short, human-readable string

[![Cross-Platform Compatibility](https://jstools.dev/img/badges/os-badges.svg)](https://github.com/JS-DevTools/humanize-anything/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/JS-DevTools/humanize-anything/workflows/CI-CD/badge.svg)](https://github.com/JS-DevTools/humanize-anything/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/humanize-anything/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/humanize-anything)
[![Dependencies](https://david-dm.org/JS-DevTools/humanize-anything.svg)](https://david-dm.org/JS-DevTools/humanize-anything)

[![npm](https://img.shields.io/npm/v/@jsdevtools/humanize-anything.svg)](https://www.npmjs.com/package/@jsdevtools/humanize-anything)
[![License](https://img.shields.io/npm/l/@jsdevtools/humanize-anything.svg)](LICENSE)
[![Buy us a tree](https://img.shields.io/badge/Treeware-%F0%9F%8C%B3-lightgreen)](https://plant.treeware.earth/JS-DevTools/humanize-anything)



Features
-----------------------
- Safely show user input values in messages and logs

- Differentiates between `null`, `undefined`, and `NaN`

- Includes the contents of small objects and arrays

- Returns names of functions and classes — even async functions, generators, etc.

- Keeps humanized value within your specified length limit



Installation
--------------------------
You can install Humanize Anything via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @jsdevtools/humanize-anything
```



Usage
-------------------------------

### `humanize(value, [options])`
Convert any value to a short, human-readable string. It will try to humanize the actual value, if it's short enough; otherwise, it will humanize the type name.

- **value** - The value to humanize
- **options** - Optional [options object](#options)

```javascript
import humanize from "@jsdevtools/humanize-anything";

humanize(123);                       // '123'
humanize(NaN);                       // 'NaN'
humanize(null);                      // 'null'
humanize("Hello");                   // '"Hello"'  (with quotes)
humanize(/^regex$/);                 // '/^regex$/'
humanize({ x: 1, y: 2 });            // '{x, y}'
humanize([1, 2, 3, 4]);              // '[1,2,3,4]'
humanize(new RangeError());          // 'RangeError'
```

### `humanize.values(values, [options])`
Returns a list of values as an [oxford-comma](https://en.wikipedia.org/wiki/Serial_comma) separated string. Can be configured to use "and", "or", or a custom conjuction.

- **values** - An array of values to humanize
- **options** - Optional [options object](#options)

```javascript
import humanize from "@jsdevtools/humanize-anything";

humanize.values([1, 2, 3, 4, 5]);          // '1, 2, 3, 4, and 5'
humanize.values([NaN, null, undefined]);   // 'NaN, null, and undefined'
humanize.values([true, false]);            // 'true and false'
humanize.values(["Fred", "Wilma"]);        // '"Fred" and "Wilma"'  (with quotes)
```

### `humanize.list(strings, [options])`
This is similar to `humanize.values()` above, but expects the values to **already be strings**. It doesn't do any humanization logic. It just concatenates the strings into an [oxford-comma](https://en.wikipedia.org/wiki/Serial_comma) separated list

- **strings** - An array of strings to be joined into a list
- **options** - Optional [options object](#options)

```javascript
import humanize from "@jsdevtools/humanize-anything";

humanize.list(["Fred", "Wilma"]);          // 'Fred and Wilma'
humanize.list(["one", "two", "three"]);    // 'one, two, and three'
```


### `humanize.type(value)`
Returns the type name of the given value. This may be a primitive type or a class name.

```javascript
import humanize from "@jsdevtools/humanize-anything";

humanize.type(123);                       // 'number'
humanize.type(NaN);                       // 'NaN'
humanize.type(null);                      // 'null'
humanize.type("Hello");                   // 'string'
humanize.type(/^regex$/);                 // 'RegExp'
humanize.type({ x: 1, y: 2 });            // 'Object'
humanize.type([1, 2, 3, 4]);              // 'Array'
humanize.type(new RangeError());          // 'RangeError'
```


### `humanize.class(value)`
Returns the class name of the given value.

```javascript
import humanize from "@jsdevtools/humanize-anything";

humanize.class(123);                       // 'Number'
humanize.class(NaN);                       // 'Number'
humanize.class(null);                      // 'Null'
humanize.class("Hello");                   // 'String'
humanize.class(/^regex$/);                 // 'RegExp'
humanize.class({ x: 1, y: 2 });            // 'Object'
humanize.class([1, 2, 3, 4]);              // 'Array'
humanize.class(new RangeError());          // 'RangeError'
```


### `humanize.function(fn)`
Returns the name of the given function. This works with any type of function, including async, generators, classes, etc. If the function doesn't have a name, then an empty string is returned.

```javascript
import humanize from "@jsdevtools/humanize-anything";

humanize.function(function myFunction() {});                 // 'myFunction'
humanize.function(async function myAsyncFunction() {});      // 'myAsyncFunction'
humanize.function(function* myGenerator() {});               // 'myGenerator'
humanize.function(async function* myAsyncGenerator() {});    // 'myAsyncGenerator'
humanize.function(() => true);                               // ''
humanize.function(async () => true);                         // ''
humanize.function(class Foo {});                             // 'Foo'
humanize.function(Object);                                   // 'Object'
humanize.function(Object.toString);                          // 'toString'
```



Options
--------------------------
The `humanize()`, `humanize.values()`, and `humanize.list()` functions accept an optional options object. The object can have any of these properties:

|Option            |Type                 |Default     |Description
|:-----------------|:--------------------|:-----------|:-----------------------------------------
|`maxLength`       |`number`             |25          |The maximum length of a humanized value before it is shortened or truncated
|`capitalize`      |`boolean`            |false       |Indicates whether the value string should be capitalized if applicable (e.g. "Number" instead of "number").
|`article`         |`boolean`            |false       |Indicates whether the value string should be prefixed with an article if applicable (e.g. "an object" instead of "object").
|`conjunction`     |`string` or `false`  |"and"       |The string used to join a list of values when calling `humanize.values()` or `humanize.list()`. This is usually either "and" or "or". Setting it to `false` will omit the conjunction.



Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [Open an issue](https://github.com/JS-DevTools/humanize-anything/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/humanize-anything/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/JS-DevTools/humanize-anything.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`



License
--------------------------
Humanize Anything is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.

This package is [Treeware](http://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/JS-DevTools/humanize-anything) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jstools.dev/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jstools.dev/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jstools.dev/img/badges/coveralls.svg)](https://coveralls.io)
