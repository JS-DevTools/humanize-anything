/* eslint-disable no-new-func, no-new-wrappers, no-new-object, no-array-constructor */
/* global BigInt */
"use strict";

const { stringify } = require("../../");
const { expect } = require("chai");

describe("stringify()", () => {

  describe("special values", () => {
    it("should output null as null", () => {
      expect(stringify(null)).to.equal("null");
      expect(stringify(null, { capitalize: true })).to.equal("Null");
      expect(stringify(null, { article: true })).to.equal("null");
      expect(stringify(null, { article: true, capitalize: true })).to.equal("Null");
    });

    it("should output undefined as undefined", () => {
      expect(stringify(undefined)).to.equal("undefined");
      expect(stringify(undefined, { capitalize: true })).to.equal("Undefined");
      expect(stringify(undefined, { article: true })).to.equal("undefined");
      expect(stringify(undefined, { article: true, capitalize: true })).to.equal("Undefined");
    });

    it("should output NaN as NaN", () => {
      expect(stringify(NaN)).to.equal("NaN");
      expect(stringify(Number.NaN)).to.equal("NaN");
      expect(stringify(NaN, { capitalize: true })).to.equal("NaN");
      expect(stringify(NaN, { article: true })).to.equal("NaN");
      expect(stringify(NaN, { article: true, capitalize: true })).to.equal("NaN");
    });
  });

  describe("numbers", () => {
    it("should output short numbers as values", () => {
      expect(stringify(1.0)).to.equal("1");
      expect(stringify(-1.0)).to.equal("-1");
      expect(stringify(42)).to.equal("42");
      expect(stringify(BigInt(100))).to.equal("100");
      expect(stringify(1000000000)).to.equal("1000000000");
      expect(stringify(1000000000000000000000000)).to.equal("1e+24");
      expect(stringify(-100000000)).to.equal("-100000000");
      expect(stringify(-100000000000000000000000)).to.equal("-1e+23");
      expect(stringify(1.23456789)).to.equal("1.23456789");
      expect(stringify(1.234567891234567890123456789)).to.equal("1.234567891234568");
      expect(stringify(-1.2345678)).to.equal("-1.2345678");
      expect(stringify(-1.2345678901234567890123456789)).to.equal("-1.2345678901234567");
      expect(stringify(Number.MIN_VALUE)).to.equal("5e-324");
      expect(stringify(Number.MAX_VALUE)).to.equal("1.7976931348623157e+308");
      expect(stringify(Number.MIN_SAFE_INTEGER)).to.equal("-9007199254740991");
      expect(stringify(Number.MAX_SAFE_INTEGER)).to.equal("9007199254740991");
      expect(stringify(Number.EPSILON)).to.equal("2.220446049250313e-16");
      expect(stringify(Infinity)).to.equal("Infinity");
      expect(stringify(-Infinity)).to.equal("-Infinity");
    });

    it("should output very long numbers as a type", () => {
      expect(stringify(BigInt(1000000000000000000000000000))).to.equal("bigint");
      expect(stringify(10000000000, { maxLength: 10 })).to.equal("number");
      expect(stringify(-1000000000, { maxLength: 10 })).to.equal("number");
      expect(stringify(1.234567891234567890123456789, { maxLength: 10 })).to.equal("number");
      expect(stringify(-1.2345678901234567890123456789, { maxLength: 10 })).to.equal("number");
      expect(stringify(Number.MAX_VALUE, { maxLength: 10 })).to.equal("number");
      expect(stringify(Number.MIN_SAFE_INTEGER, { maxLength: 10 })).to.equal("number");
      expect(stringify(Number.MAX_SAFE_INTEGER, { maxLength: 10 })).to.equal("number");
      expect(stringify(Number.EPSILON, { maxLength: 10 })).to.equal("number");
    });

    it("should capitalize numeric types", () => {
      expect(stringify(-1.23456789, { maxLength: 10, capitalize: true })).to.equal("Number");
      expect(stringify(BigInt(123456789012345), { maxLength: 10, capitalize: true })).to.equal("Bigint");
    });

    it("should not capitalize numeric values", () => {
      expect(stringify(42, { capitalize: true })).to.equal("42");
      expect(stringify(BigInt(100), { capitalize: true })).to.equal("100");
      expect(stringify(1000000000, { capitalize: true })).to.equal("1000000000");
      expect(stringify(-1.2345678, { capitalize: true })).to.equal("-1.2345678");
    });

    it("should prefix numeric types with articles", () => {
      expect(stringify(-1.23456789, { maxLength: 5, article: true })).to.equal("a number");
      expect(stringify(BigInt(123456789012345), { maxLength: 5, article: true })).to.equal("a bigint");
      expect(stringify(-1.23456789, { capitalize: true, maxLength: 5, article: true })).to.equal("A number");
      expect(stringify(BigInt(123456789012345), { capitalize: true, maxLength: 5, article: true })).to.equal("A bigint");
    });

    it("should not prefix numeric values with articles", () => {
      expect(stringify(42, { article: true })).to.equal("42");
      expect(stringify(BigInt(100), { article: true })).to.equal("100");
      expect(stringify(1000000000, { article: true })).to.equal("1000000000");
      expect(stringify(-1.2345678, { article: true })).to.equal("-1.2345678");
    });
  });

  describe("strings", () => {
    it("should output short strings as values", () => {
      expect(stringify("")).to.equal('""');
      expect(stringify("Hello, world!")).to.equal('"Hello, world!"');
      expect(stringify("John Doe")).to.equal('"John Doe"');
      expect(stringify("1234567890")).to.equal('"1234567890"');
    });

    it("should output long strings with an elipsis", () => {
      expect(stringify("This is a really really long string.")).to.equal('"This is a really reall..."');
      expect(stringify("Hello, world!", { maxLength: 10 })).to.equal('"Hello, ..."');
    });

    it("should not capitalize string values", () => {
      expect(stringify("hello, world", { capitalize: true })).to.equal('"hello, world"');
      expect(stringify("John Doe", { capitalize: true })).to.equal('"John Doe"');
      expect(stringify("This is a really really long string.", { capitalize: true })).to.equal('"This is a really reall..."');
    });

    it("should not prefix string values with articles", () => {
      expect(stringify("hello, world", { article: true })).to.equal('"hello, world"');
      expect(stringify("John Doe", { article: true })).to.equal('"John Doe"');
      expect(stringify("This is a really really long string.", { article: true })).to.equal('"This is a really reall..."');
    });
  });

  describe("booleans", () => {
    it("should output booleans as values", () => {
      expect(stringify(true)).to.equal("true");
      expect(stringify(false)).to.equal("false");
    });

    it("should capitalize boolean values", () => {
      expect(stringify(true, { capitalize: true })).to.equal("True");
      expect(stringify(false, { capitalize: true })).to.equal("False");
    });

    it("should not prefix boolean values with articles", () => {
      expect(stringify(true, { article: true })).to.equal("true");
      expect(stringify(false, { article: true })).to.equal("false");
      expect(stringify(true, { capitalize: true, article: true })).to.equal("True");
      expect(stringify(false, { capitalize: true, article: true })).to.equal("False");
    });
  });

  describe("functions", () => {
    it("should output short functions as values", () => {
      expect(stringify(() => 0)).to.equal("() => 0");
      expect(stringify((x) => x)).to.equal("(x) => x");
      expect(stringify(function () {})).to.equal("function () {}");
      expect(stringify(class X {})).to.equal("class X {}");
    });

    it("should output long functions as a type", () => {
      expect(stringify(() => undefined, { maxLength: 5 })).to.equal("function");
      expect(stringify(Object.prototype.valueOf)).to.equal("function");
      expect(stringify(function () { return 1234567890; })).to.equal("function");
      expect(stringify(class Foo { constructor () { this.x = 4; }})).to.equal("function");
    });

    it("should capitalize function types", () => {
      expect(stringify(() => undefined, { maxLength: 5, capitalize: true })).to.equal("Function");
      expect(stringify(Object.prototype.valueOf, { capitalize: true })).to.equal("Function");
      expect(stringify(function () { return 1234567890; }, { capitalize: true })).to.equal("Function");
      expect(stringify(class Foo { constructor () { this.x = 4; }}, { capitalize: true })).to.equal("Function");
    });

    it("should not capitalize function values", () => {
      expect(stringify(() => 0, { capitalize: true })).to.equal("() => 0");
      expect(stringify(x => x, { capitalize: true })).to.equal("x => x");
      expect(stringify(class X {}, { capitalize: true })).to.equal("class X {}");
    });

    it("should prefix function types with articles", () => {
      expect(stringify(() => undefined, { maxLength: 5, article: true })).to.equal("a function");
      expect(stringify(function () { return 1234567890; }, { article: true })).to.equal("a function");
      expect(stringify(Object.prototype.valueOf, { article: true })).to.equal("a function");
      expect(stringify(() => undefined, { maxLength: 5, capitalize: true, article: true })).to.equal("A function");
      expect(stringify(function () { return 1234567890; }, { capitalize: true, article: true })).to.equal("A function");
      expect(stringify(Object.prototype.valueOf, { capitalize: true, article: true })).to.equal("A function");
    });

    it("should not prefix function values with articles", () => {
      expect(stringify(() => 0, { article: true })).to.equal("() => 0");
      expect(stringify(x => x, { article: true })).to.equal("x => x");
      expect(stringify(class X {}, { article: true })).to.equal("class X {}");
    });
  });

  describe("objects", () => {
    it("should output built-in objects as their underlying values", () => {
      expect(stringify(new Number(12345))).to.equal("12345");
      expect(stringify(new Boolean(true))).to.equal("true");
      expect(stringify(new Boolean(false))).to.equal("false");
      expect(stringify(new String("hello"))).to.equal("hello");
      expect(stringify(new RegExp("^xyz$"))).to.equal("/^xyz$/");
      expect(stringify(Array.of(1))).to.equal("[1]");
      expect(stringify(new Array(1, 2, 3, 4))).to.equal("[1,2,3,4]");
      expect(stringify(new Object({}))).to.equal("{}");
      expect(stringify({})).to.equal("{}");
      expect(stringify({ x: 1, y: 2 })).to.equal("{x,y}");
      expect(stringify(new Object({ toString: () => "obj" }))).to.equal("obj");
    });

    it("should output built-in objects as types when too long", () => {
      expect(stringify(new Date("2005-05-05T05:05:05.005Z"))).to.equal("Date");
      expect(stringify(new RegExp("^(really really long regexp)$"))).to.equal("RegExp");
      expect(stringify(new Object({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 }))).to.equal("Object");
      expect(stringify({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 })).to.equal("Object");
      expect(stringify(new Array())).to.equal("Array");
      expect(stringify([])).to.equal("Array");
      expect(stringify([new Date(), new Date()])).to.equal("Array");
      expect(stringify(new Map())).to.equal("Map");
      expect(stringify(new Set())).to.equal("Set");
    });

    it("should capitalize object types", () => {
      expect(stringify(new Number(123456789012345), { maxLength: 5, capitalize: true })).to.equal("Number");
      expect(stringify(new Date("2005-05-05T05:05:05.005Z"), { capitalize: true })).to.equal("Date");
      expect(stringify(new RegExp("^(really really long regexp)$"), { capitalize: true })).to.equal("RegExp");
      expect(stringify(new Object({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 }), { capitalize: true })).to.equal("Object");
      expect(stringify({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 }, { capitalize: true })).to.equal("Object");
      expect(stringify(new Array(0), { capitalize: true })).to.equal("Array");
      expect(stringify([], { capitalize: true })).to.equal("Array");
      expect(stringify([new Date(), new Date()])).to.equal("Array");
      expect(stringify(new Map(), { capitalize: true })).to.equal("Map");
      expect(stringify(new Set(), { capitalize: true })).to.equal("Set");
    });

    it("should capitalize object values", () => {
      expect(stringify(new Boolean(true), { capitalize: true })).to.equal("True");
      expect(stringify(new Boolean(false), { capitalize: true })).to.equal("False");
      expect(stringify(new String("hello"), { capitalize: true })).to.equal("Hello");
      expect(stringify(new RegExp("^xyz$"), { capitalize: true })).to.equal("/^xyz$/");
      expect(stringify({})).to.equal("{}");
      expect(stringify({ x: 1, y: 2 })).to.equal("{x,y}");
      expect(stringify(new Object({ toString: () => "obj" }))).to.equal("obj");
    });

    it("should prefix object types with articles", () => {
      expect(stringify(new Number(123456789012345), { maxLength: 5, article: true })).to.equal("a Number");
      expect(stringify(new Date("2005-05-05T05:05:05.005Z"), { article: true })).to.equal("a Date");
      expect(stringify(new RegExp("^(really really long regexp)$"), { article: true })).to.equal("a RegExp");
      expect(stringify(new Object({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 }), { article: true })).to.equal("an Object");
      expect(stringify({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 }, { article: true })).to.equal("an Object");
      expect(stringify(new Array(0), { article: true })).to.equal("an Array");
      expect(stringify([], { article: true })).to.equal("an Array");
      expect(stringify([new Date(), new Date()], { article: true })).to.equal("an Array");
      expect(stringify(new Map(), { article: true })).to.equal("a Map");
      expect(stringify(new Set(), { article: true })).to.equal("a Set");

      expect(stringify(new Number(123456789012345), { maxLength: 5, capitalize: true, article: true })).to.equal("A Number");
      expect(stringify(new Date("2005-05-05T05:05:05.005Z"), { capitalize: true, article: true })).to.equal("A Date");
      expect(stringify(new RegExp("^(really really long regexp)$"), { capitalize: true, article: true })).to.equal("A RegExp");
      expect(stringify(new Object({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 }), { capitalize: true, article: true })).to.equal("An Object");
      expect(stringify({ reallyLongKeyName1: 1, reallyLongKeyName2: 2 }, { capitalize: true, article: true })).to.equal("An Object");
      expect(stringify(new Array(0), { capitalize: true, article: true })).to.equal("An Array");
      expect(stringify([], { capitalize: true, article: true })).to.equal("An Array");
      expect(stringify([new Date(), new Date()], { capitalize: true, article: true })).to.equal("An Array");
      expect(stringify(new Map(), { capitalize: true, article: true })).to.equal("A Map");
      expect(stringify(new Set(), { capitalize: true, article: true })).to.equal("A Set");
    });

    it("should not prefix object values with articles", () => {
      expect(stringify(new Boolean(true), { article: true })).to.equal("true");
      expect(stringify(new Boolean(false), { article: true })).to.equal("false");
      expect(stringify(new String("Hello, world!"), { article: true })).to.equal("Hello, world!");
      expect(stringify(new RegExp("^xyz$"), { article: true })).to.equal("/^xyz$/");
      expect(stringify(Array.of(1), { article: true })).to.equal("[1]");
      expect(stringify(new Array(1, 2, 3, 4), { article: true })).to.equal("[1,2,3,4]");
      expect(stringify({}, { article: true })).to.equal("{}");
      expect(stringify({ x: 1, y: 2 }, { article: true })).to.equal("{x,y}");
      expect(stringify(new Object({ toString: () => "obj" }, { article: true }))).to.equal("obj");

      expect(stringify(new Boolean(true), { capitalize: true, article: true })).to.equal("True");
      expect(stringify(new Boolean(false), { capitalize: true, article: true })).to.equal("False");
      expect(stringify(new String("hello, world!"), { capitalize: true, article: true })).to.equal("Hello, world!");
      expect(stringify(new RegExp("^xyz$"), { capitalize: true, article: true })).to.equal("/^xyz$/");
      expect(stringify(Array.of(1), { capitalize: true, article: true })).to.equal("[1]");
      expect(stringify(new Array(1, 2, 3, 4), { capitalize: true, article: true })).to.equal("[1,2,3,4]");
      expect(stringify({}, { capitalize: true, article: true })).to.equal("{}");
      expect(stringify({ x: 1, y: 2 }, { capitalize: true, article: true })).to.equal("{x,y}");
      expect(stringify(new Object({ toString: () => "obj" }, { capitalize: true, article: true }))).to.equal("obj");
    });
  });
});
