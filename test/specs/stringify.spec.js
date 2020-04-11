/* eslint-disable no-new-func, no-new-wrappers, no-new-object, no-array-constructor */
/* global BigInt */
"use strict";

const { humanize } = require("../../");
const { expect } = require("chai");

describe("humanize()", () => {

  describe("special values", () => {
    it("should output null as null", () => {
      expect(humanize(null)).to.equal("null");
      expect(humanize(null, { capitalize: true })).to.equal("Null");
      expect(humanize(null, { article: true })).to.equal("null");
      expect(humanize(null, { article: true, capitalize: true })).to.equal("Null");
    });

    it("should output undefined as undefined", () => {
      expect(humanize(undefined)).to.equal("undefined");
      expect(humanize(undefined, { capitalize: true })).to.equal("Undefined");
      expect(humanize(undefined, { article: true })).to.equal("undefined");
      expect(humanize(undefined, { article: true, capitalize: true })).to.equal("Undefined");
    });

    it("should output NaN as NaN", () => {
      expect(humanize(NaN)).to.equal("NaN");
      expect(humanize(Number.NaN)).to.equal("NaN");
      expect(humanize(NaN, { capitalize: true })).to.equal("NaN");
      expect(humanize(NaN, { article: true })).to.equal("NaN");
      expect(humanize(NaN, { article: true, capitalize: true })).to.equal("NaN");
    });
  });

  describe("numbers", () => {
    it("should output short numbers as values", () => {
      expect(humanize(1.0)).to.equal("1");
      expect(humanize(-1.0)).to.equal("-1");
      expect(humanize(42)).to.equal("42");
      expect(humanize(BigInt(100))).to.equal("100");
      expect(humanize(1000000000)).to.equal("1000000000");
      expect(humanize(1000000000000000000000000)).to.equal("1e+24");
      expect(humanize(-100000000)).to.equal("-100000000");
      expect(humanize(-100000000000000000000000)).to.equal("-1e+23");
      expect(humanize(1.23456789)).to.equal("1.23456789");
      expect(humanize(1.234567891234567890123456789)).to.equal("1.234567891234568");
      expect(humanize(-1.2345678)).to.equal("-1.2345678");
      expect(humanize(-1.2345678901234567890123456789)).to.equal("-1.2345678901234567");
      expect(humanize(Number.MIN_VALUE)).to.equal("5e-324");
      expect(humanize(Number.MAX_VALUE)).to.equal("1.7976931348623157e+308");
      expect(humanize(Number.MIN_SAFE_INTEGER)).to.equal("-9007199254740991");
      expect(humanize(Number.MAX_SAFE_INTEGER)).to.equal("9007199254740991");
      expect(humanize(Number.EPSILON)).to.equal("2.220446049250313e-16");
      expect(humanize(Infinity)).to.equal("Infinity");
      expect(humanize(-Infinity)).to.equal("-Infinity");
    });

    it("should output very long numbers as a type", () => {
      expect(humanize(BigInt(1000000000000000000000000000))).to.equal("bigint");
      expect(humanize(10000000000, { maxLength: 10 })).to.equal("number");
      expect(humanize(-1000000000, { maxLength: 10 })).to.equal("number");
      expect(humanize(1.234567891234567890123456789, { maxLength: 10 })).to.equal("number");
      expect(humanize(-1.2345678901234567890123456789, { maxLength: 10 })).to.equal("number");
      expect(humanize(Number.MAX_VALUE, { maxLength: 10 })).to.equal("number");
      expect(humanize(Number.MIN_SAFE_INTEGER, { maxLength: 10 })).to.equal("number");
      expect(humanize(Number.MAX_SAFE_INTEGER, { maxLength: 10 })).to.equal("number");
      expect(humanize(Number.EPSILON, { maxLength: 10 })).to.equal("number");
    });

    it("should capitalize numeric types", () => {
      expect(humanize(-1.23456789, { maxLength: 10, capitalize: true })).to.equal("Number");
      expect(humanize(BigInt(123456789012345), { maxLength: 10, capitalize: true })).to.equal("Bigint");
    });

    it("should not capitalize numeric values", () => {
      expect(humanize(42, { capitalize: true })).to.equal("42");
      expect(humanize(BigInt(100), { capitalize: true })).to.equal("100");
      expect(humanize(1000000000, { capitalize: true })).to.equal("1000000000");
      expect(humanize(-1.2345678, { capitalize: true })).to.equal("-1.2345678");
    });

    it("should prefix numeric types with articles", () => {
      expect(humanize(-1.23456789, { maxLength: 5, article: true })).to.equal("a number");
      expect(humanize(BigInt(123456789012345), { maxLength: 5, article: true })).to.equal("a bigint");
      expect(humanize(-1.23456789, { capitalize: true, maxLength: 5, article: true })).to.equal("A number");
      expect(humanize(BigInt(123456789012345), { capitalize: true, maxLength: 5, article: true })).to.equal("A bigint");
    });

    it("should not prefix numeric values with articles", () => {
      expect(humanize(42, { article: true })).to.equal("42");
      expect(humanize(BigInt(100), { article: true })).to.equal("100");
      expect(humanize(1000000000, { article: true })).to.equal("1000000000");
      expect(humanize(-1.2345678, { article: true })).to.equal("-1.2345678");
    });
  });

  describe("strings", () => {
    it("should output short strings as values", () => {
      expect(humanize("")).to.equal('""');
      expect(humanize("Hello, world!")).to.equal('"Hello, world!"');
      expect(humanize("John Doe")).to.equal('"John Doe"');
      expect(humanize("1234567890")).to.equal('"1234567890"');
    });

    it("should output long strings with an elipsis", () => {
      expect(humanize("This is a really really long string.")).to.equal('"This is a really reall..."');
      expect(humanize("Hello, world!", { maxLength: 10 })).to.equal('"Hello, ..."');
    });

    it("should not capitalize string values", () => {
      expect(humanize("hello, world", { capitalize: true })).to.equal('"hello, world"');
      expect(humanize("John Doe", { capitalize: true })).to.equal('"John Doe"');
      expect(humanize("This is a really really long string.", { capitalize: true })).to.equal('"This is a really reall..."');
    });

    it("should not prefix string values with articles", () => {
      expect(humanize("hello, world", { article: true })).to.equal('"hello, world"');
      expect(humanize("John Doe", { article: true })).to.equal('"John Doe"');
      expect(humanize("This is a really really long string.", { article: true })).to.equal('"This is a really reall..."');
    });
  });

  describe("booleans", () => {
    it("should output booleans as values", () => {
      expect(humanize(true)).to.equal("true");
      expect(humanize(false)).to.equal("false");
    });

    it("should capitalize boolean values", () => {
      expect(humanize(true, { capitalize: true })).to.equal("True");
      expect(humanize(false, { capitalize: true })).to.equal("False");
    });

    it("should not prefix boolean values with articles", () => {
      expect(humanize(true, { article: true })).to.equal("true");
      expect(humanize(false, { article: true })).to.equal("false");
      expect(humanize(true, { capitalize: true, article: true })).to.equal("True");
      expect(humanize(false, { capitalize: true, article: true })).to.equal("False");
    });
  });

  describe("functions", () => {
    it("should output short functions as values", () => {
      expect(humanize(() => 0)).to.equal("() => 0");
      expect(humanize((x) => x)).to.equal("(x) => x");
      expect(humanize(function () {})).to.equal("function () {}");
      expect(humanize(class X {})).to.equal("class X {}");
    });

    it("should output long functions as a type", () => {
      expect(humanize(() => undefined, { maxLength: 5 })).to.equal("function");
      expect(humanize(Object.prototype.valueOf)).to.equal("function");
      expect(humanize(function () { return 1234567890; })).to.equal("function");
      expect(humanize(class Foo { constructor () { this.x = 4; }})).to.equal("function");
    });

    it("should capitalize function types", () => {
      expect(humanize(() => undefined, { maxLength: 5, capitalize: true })).to.equal("Function");
      expect(humanize(Object.prototype.valueOf, { capitalize: true })).to.equal("Function");
      expect(humanize(function () { return 1234567890; }, { capitalize: true })).to.equal("Function");
      expect(humanize(class Foo { constructor () { this.x = 4; }}, { capitalize: true })).to.equal("Function");
    });

    it("should not capitalize function values", () => {
      expect(humanize(() => 0, { capitalize: true })).to.equal("() => 0");
      expect(humanize(x => x, { capitalize: true })).to.equal("x => x");
      expect(humanize(class X {}, { capitalize: true })).to.equal("class X {}");
    });

    it("should prefix function types with articles", () => {
      expect(humanize(() => undefined, { maxLength: 5, article: true })).to.equal("a function");
      expect(humanize(function () { return 1234567890; }, { article: true })).to.equal("a function");
      expect(humanize(Object.prototype.valueOf, { article: true })).to.equal("a function");
      expect(humanize(() => undefined, { maxLength: 5, capitalize: true, article: true })).to.equal("A function");
      expect(humanize(function () { return 1234567890; }, { capitalize: true, article: true })).to.equal("A function");
      expect(humanize(Object.prototype.valueOf, { capitalize: true, article: true })).to.equal("A function");
    });

    it("should not prefix function values with articles", () => {
      expect(humanize(() => 0, { article: true })).to.equal("() => 0");
      expect(humanize(x => x, { article: true })).to.equal("x => x");
      expect(humanize(class X {}, { article: true })).to.equal("class X {}");
    });
  });

  describe("objects", () => {
    it("should output built-in objects as their underlying values", () => {
      expect(humanize(new Number(12345))).to.equal("12345");
      expect(humanize(new Boolean(true))).to.equal("true");
      expect(humanize(new Boolean(false))).to.equal("false");
      expect(humanize(new String("hello"))).to.equal("hello");
      expect(humanize(new RegExp("^xyz$"))).to.equal("/^xyz$/");
      expect(humanize(Array.of(1))).to.equal("[1]");
      expect(humanize(new Array(1, 2, 3, 4))).to.equal("[1,2,3,4]");
      expect(humanize(["a", "b", "c", "d"])).to.equal("[a,b,c,d]");
      expect(humanize(new Object({}))).to.equal("{}");
      expect(humanize({})).to.equal("{}");
      expect(humanize({ x: 1, y: 2 })).to.equal("{x, y}");
      expect(humanize(new Object({ toString: () => "obj" }))).to.equal("obj");
    });

    it("should output built-in objects as types when too long", () => {
      expect(humanize(new Date("2005-05-05T05:05:05.005Z"))).to.equal("Date");
      expect(humanize(new RegExp("^(really really long regexp)$"))).to.equal("RegExp");
      expect(humanize(new Array())).to.equal("Array");
      expect(humanize([])).to.equal("Array");
      expect(humanize([new Date(), new Date()])).to.equal("Array");
      expect(humanize(new Map())).to.equal("Map");
      expect(humanize(new Set())).to.equal("Set");
    });

    it("should capitalize object types", () => {
      expect(humanize(new Number(123456789012345), { maxLength: 5, capitalize: true })).to.equal("Number");
      expect(humanize(new Date("2005-05-05T05:05:05.005Z"), { capitalize: true })).to.equal("Date");
      expect(humanize(new RegExp("^(really really long regexp)$"), { capitalize: true })).to.equal("RegExp");
      expect(humanize(new Array(0), { capitalize: true })).to.equal("Array");
      expect(humanize([], { capitalize: true })).to.equal("Array");
      expect(humanize([new Date(), new Date()])).to.equal("Array");
      expect(humanize(new Map(), { capitalize: true })).to.equal("Map");
      expect(humanize(new Set(), { capitalize: true })).to.equal("Set");
    });

    it("should capitalize object values", () => {
      expect(humanize(new Boolean(true), { capitalize: true })).to.equal("True");
      expect(humanize(new Boolean(false), { capitalize: true })).to.equal("False");
      expect(humanize(new String("hello"), { capitalize: true })).to.equal("Hello");
      expect(humanize(new RegExp("^xyz$"), { capitalize: true })).to.equal("/^xyz$/");
      expect(humanize({})).to.equal("{}");
      expect(humanize({ x: 1, y: 2 })).to.equal("{x, y}");
      expect(humanize(new Object({ toString: () => "obj" }))).to.equal("obj");
    });

    it("should output list of object keys", () => {
      expect(humanize({})).to.equal("{}");
      expect(humanize({ x: 1, y: 2 })).to.equal("{x, y}");
      expect(humanize({ foo: 1, bar: 2, biz: 3, baz: 4 })).to.equal("{foo, bar, biz, baz}");
      expect(humanize({ firstName: "Fred", lastName: "Flintstone" })).to.equal("{firstName, lastName}");
      expect(humanize({ firstName: "Fred", middleName: "Terrance", lastName: "Flintstone" })).to.equal("{firstName, ..., lastName}");
      expect(humanize({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 })).to.equal("{reallyLongKeyName1, reallyLongKeyName2}");
      expect(humanize({ reallyLongKeyName1: 1, reallyLongKeyName2: 2, reallyLongKeyName3: 3 })).to.equal("{reallyLongKeyName1, ..., reallyLongKeyName3}");
    });

    it("should prefix object types with articles", () => {
      expect(humanize(new Number(123456789012345), { maxLength: 5, article: true })).to.equal("a Number");
      expect(humanize(new Date("2005-05-05T05:05:05.005Z"), { article: true })).to.equal("a Date");
      expect(humanize(new RegExp("^(really really long regexp)$"), { article: true })).to.equal("a RegExp");
      expect(humanize(new Array(0), { article: true })).to.equal("an Array");
      expect(humanize([], { article: true })).to.equal("an Array");
      expect(humanize([new Date(), new Date()], { article: true })).to.equal("an Array");
      expect(humanize(new Map(), { article: true })).to.equal("a Map");
      expect(humanize(new Set(), { article: true })).to.equal("a Set");

      expect(humanize(new Number(123456789012345), { maxLength: 5, capitalize: true, article: true })).to.equal("A Number");
      expect(humanize(new Date("2005-05-05T05:05:05.005Z"), { capitalize: true, article: true })).to.equal("A Date");
      expect(humanize(new RegExp("^(really really long regexp)$"), { capitalize: true, article: true })).to.equal("A RegExp");
      expect(humanize(new Array(0), { capitalize: true, article: true })).to.equal("An Array");
      expect(humanize([], { capitalize: true, article: true })).to.equal("An Array");
      expect(humanize([new Date(), new Date()], { capitalize: true, article: true })).to.equal("An Array");
      expect(humanize(new Map(), { capitalize: true, article: true })).to.equal("A Map");
      expect(humanize(new Set(), { capitalize: true, article: true })).to.equal("A Set");
    });

    it("should not prefix object values with articles", () => {
      expect(humanize(new Boolean(true), { article: true })).to.equal("true");
      expect(humanize(new Boolean(false), { article: true })).to.equal("false");
      expect(humanize(new String("Hello, world!"), { article: true })).to.equal("Hello, world!");
      expect(humanize(new RegExp("^xyz$"), { article: true })).to.equal("/^xyz$/");
      expect(humanize(Array.of(1), { article: true })).to.equal("[1]");
      expect(humanize(new Array(1, 2, 3, 4), { article: true })).to.equal("[1,2,3,4]");
      expect(humanize({}, { article: true })).to.equal("{}");
      expect(humanize({ x: 1, y: 2 }, { article: true })).to.equal("{x, y}");
      expect(humanize(new Object({ toString: () => "obj" }, { article: true }))).to.equal("obj");

      expect(humanize(new Boolean(true), { capitalize: true, article: true })).to.equal("True");
      expect(humanize(new Boolean(false), { capitalize: true, article: true })).to.equal("False");
      expect(humanize(new String("hello, world!"), { capitalize: true, article: true })).to.equal("Hello, world!");
      expect(humanize(new RegExp("^xyz$"), { capitalize: true, article: true })).to.equal("/^xyz$/");
      expect(humanize(Array.of(1), { capitalize: true, article: true })).to.equal("[1]");
      expect(humanize(new Array(1, 2, 3, 4), { capitalize: true, article: true })).to.equal("[1,2,3,4]");
      expect(humanize({}, { capitalize: true, article: true })).to.equal("{}");
      expect(humanize({ x: 1, y: 2 }, { capitalize: true, article: true })).to.equal("{x, y}");
      expect(humanize(new Object({ toString: () => "obj" }, { capitalize: true, article: true }))).to.equal("obj");
    });
  });
});
