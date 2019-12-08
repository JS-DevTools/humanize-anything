CodeEngine stringify helpers
======================================

This is an utility library that's used inside [CodeEngine](https://engine.codes/) to convert values to strings for error messages and console logs.

> **NOTE:** This is an **internal library** that is only intended to be used by CodeEngine. Using it outside of CodeEngine is discouraged.


Usage
-------------------------------

### `stringify(value, [options])`
Returns a short, user-friendly string that represents the given value. It will try to stringify the value, if it's short enough; otherwise, it will stringify the type name.

- **value** - The value to stringify
- **options** - Optional [options object](#options)

```javascript
import stringify from "@code-engine/stringify";

stringify(123);                       // '123'
stringify(NaN);                       // 'NaN'
stringify(null);                      // 'null'
stringify("Hello");                   // '"Hello"'  (with quotes)
stringify(/^regex$/);                 // '/^regex$/'
stringify({ x: 1, y: 2 });            // '{x,y}'
stringify([1, 2, 3, 4]);              // '[1,2,3,4]'
stringify(new RangeError());          // 'RangeError'
```

### `stringify.values(values, [options])`
Returns a list of values as an [oxford-comma](https://en.wikipedia.org/wiki/Serial_comma) separated string. Can be configured to use "and", "or", or a custom conjuction.

- **values** - An array of values to stringify
- **options** - Optional [options object](#options)

```javascript
import stringify from "@code-engine/stringify";

stringify.values([1, 2, 3, 4, 5]);          // '1, 2, 3, 4, and 5'
stringify.values([NaN, null, undefined]);   // 'NaN, null, and undefined'
stringify.values([true, false]);            // 'true and false'
stringify.values(["Fred", "Wilma"]);        // '"Fred" and "Wilma"'  (with quotes)
```

### `stringify.list(strings, [options])`
This is similar to `stringify.values()` above, but expects the values to **already be strings**. It doesn't do any stringify logic. It just concatenates the strings into an [oxford-comma](https://en.wikipedia.org/wiki/Serial_comma) separated list

- **strings** - An array of strings to be joined into a list
- **options** - Optional [options object](#options)

```javascript
import stringify from "@code-engine/stringify";

stringify.list(["Fred", "Wilma"]);          // 'Fred and Wilma'
stringify.list(["one", "two", "three"]);    // 'one, two, and three'
```


### `stringify.type(value)`
Returns the type name of the given value. This may be a primitive type or a class name.

```javascript
import stringify from "@code-engine/stringify";

stringify.type(123);                       // 'number'
stringify.type(NaN);                       // 'NaN'
stringify.type(null);                      // 'null'
stringify.type("Hello");                   // 'string'
stringify.type(/^regex$/);                 // 'RegExp'
stringify.type({ x: 1, y: 2 });            // 'Object'
stringify.type([1, 2, 3, 4]);              // 'Array'
stringify.type(new RangeError());          // 'RangeError'
```


### `stringify.class(value)`
Returns the class name of the given value.

```javascript
import stringify from "@code-engine/stringify";

stringify.class(123);                       // 'Number'
stringify.class(NaN);                       // 'Number'
stringify.class(null);                      // 'Null'
stringify.class("Hello");                   // 'String'
stringify.class(/^regex$/);                 // 'RegExp'
stringify.class({ x: 1, y: 2 });            // 'Object'
stringify.class([1, 2, 3, 4]);              // 'Array'
stringify.class(new RangeError());          // 'RangeError'
```


### `stringify.function(fn)`
Returns the name of the given function. This works with any type of function, including async, generators, classes, etc. If the function doesn't have a name, then an empty string is returned.

```javascript
import stringify from "@code-engine/stringify";

stringify.function(function myFunction() {});                 // 'myFunction'
stringify.function(async function myAsyncFunction() {});      // 'myAsyncFunction'
stringify.function(function* myGenerator() {});               // 'myGenerator'
stringify.function(async function* myAsyncGenerator() {});    // 'myAsyncGenerator'
stringify.function(() => true);                               // ''
stringify.function(async () => true);                         // ''
stringify.function(class Foo {});                             // 'Foo'
stringify.function(Object);                                   // 'Object'
stringify.function(Object.toString);                          // 'toString'
```



Options
--------------------------
The `stringify()`, `stringify.values()`, and `stringify.list()` functions accept an optional options object. The object can have any of these properties:

|Option            |Type                 |Default     |Description
|:-----------------|:--------------------|:-----------|:-----------------------------------------
|`maxLength`       |`number`             |25          |The maximum length of a stringified value before its type is used instead.
|`capitalize`      |`boolean`            |false       |Indicates whether the value string should be capitalized if applicable (e.g. "Number" instead of "number").
|`article`         |`boolean`            |false       |Indicates whether the value string should be prefixed with an article if applicable (e.g. "an object" instead of "object").
|`conjunction`     |`string`             |"and"       |The string used to join a list of values when calling `stringify.values()` or `stringify.list()`. This is usually either "and" or "or".



Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/CodeEngineOrg/code-engine-stringify/issues) on GitHub and [submit a pull request](https://github.com/CodeEngineOrg/code-engine-stringify/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/CodeEngineOrg/code-engine-stringify.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`



License
--------------------------
@code-engine/stringify is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://engine.codes/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://engine.codes/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://engine.codes/img/badges/coveralls.svg)](https://coveralls.io)
