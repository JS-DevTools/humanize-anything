"use strict";

const { humanize } = require("../../");
const { expect } = require("chai");

describe("humanize.values()", () => {

  it("should return an empty string for an empty list", () => {
    expect(humanize.values([])).to.equal("");
    expect(humanize.list([])).to.equal("");
  });

  it("should join a list that only contains one value", () => {
    expect(humanize.values([undefined])).to.equal("undefined");
    expect(humanize.values([null])).to.equal("null");
    expect(humanize.values([NaN])).to.equal("NaN");
    expect(humanize.values([0])).to.equal("0");
    expect(humanize.values([false])).to.equal("false");
    expect(humanize.values([true])).to.equal("true");
    expect(humanize.values([""])).to.equal('""');
    expect(humanize.values(["Fred"])).to.equal('"Fred"');
    expect(humanize.values([{}])).to.equal("{}");
    expect(humanize.values([/^regex$/])).to.equal("/^regex$/");
    expect(humanize.values([new Date()])).to.equal("Date");
  });

  it("should not use the conjunction if the list only has one value", () => {
    expect(humanize.values([undefined], { conjunction: "or" })).to.equal("undefined");
    expect(humanize.values([null], { conjunction: "or" })).to.equal("null");
    expect(humanize.values([NaN], { conjunction: "or" })).to.equal("NaN");
    expect(humanize.values([0], { conjunction: "or" })).to.equal("0");
    expect(humanize.values([false], { conjunction: "or" })).to.equal("false");
    expect(humanize.values([true], { conjunction: "or" })).to.equal("true");
    expect(humanize.values([""], { conjunction: "or" })).to.equal('""');
    expect(humanize.values(["Fred"], { conjunction: "or" })).to.equal('"Fred"');
    expect(humanize.values([{}], { conjunction: "or" })).to.equal("{}");
    expect(humanize.values([/^regex$/], { conjunction: "or" })).to.equal("/^regex$/");
    expect(humanize.values([new Date()], { conjunction: "or" })).to.equal("Date");
  });

  it("should join a list that only contains two values", () => {
    expect(humanize.values([null, undefined])).to.equal("null and undefined");
    expect(humanize.values([NaN, NaN])).to.equal("NaN and NaN");
    expect(humanize.values([0, 1])).to.equal("0 and 1");
    expect(humanize.values([true, false])).to.equal("true and false");
    expect(humanize.values(["", ""])).to.equal('"" and ""');
    expect(humanize.values(["Fred", "Wilma"])).to.equal('"Fred" and "Wilma"');
    expect(humanize.values([{}, { foo: 1 }])).to.equal("{} and {foo}");
    expect(humanize.values([/^regex$/, new Date()])).to.equal("/^regex$/ and Date");
  });

  it("should use the conjunction when the list has two values", () => {
    expect(humanize.values([null, undefined], { conjunction: "or" })).to.equal("null or undefined");
    expect(humanize.values([NaN, NaN], { conjunction: "or" })).to.equal("NaN or NaN");
    expect(humanize.values([0, 1], { conjunction: "or" })).to.equal("0 or 1");
    expect(humanize.values([true, false], { conjunction: "or" })).to.equal("true or false");
    expect(humanize.values(["", ""], { conjunction: "or" })).to.equal('"" or ""');
    expect(humanize.values(["Fred", "Wilma"], { conjunction: "or" })).to.equal('"Fred" or "Wilma"');
    expect(humanize.values([{}, { foo: 1 }], { conjunction: "or" })).to.equal("{} or {foo}");
    expect(humanize.values([/^regex$/, new Date()], { conjunction: "or" })).to.equal("/^regex$/ or Date");
  });

  it("should join a list that only contains three values", () => {
    expect(humanize.values([null, undefined, NaN])).to.equal("null, undefined, and NaN");
    expect(humanize.values([0, 1, 2])).to.equal("0, 1, and 2");
    expect(humanize.values([true, false, "maybe"])).to.equal('true, false, and "maybe"');
    expect(humanize.values(["Fred", "Wilma", "Pebbles"])).to.equal('"Fred", "Wilma", and "Pebbles"');
    expect(humanize.values([{}, { foo: 1 }, { foo: 1, bar: 2 }])).to.equal("{}, {foo}, and {foo, bar}");
    expect(humanize.values([/^regex$/, new Date(), Object.prototype.valueOf])).to.equal("/^regex$/, Date, and function");
  });

  it("should use the conjunction when the list has three values", () => {
    expect(humanize.values([null, undefined, NaN], { conjunction: "or" })).to.equal("null, undefined, or NaN");
    expect(humanize.values([0, 1, 2], { conjunction: "or" })).to.equal("0, 1, or 2");
    expect(humanize.values([true, false, "maybe"], { conjunction: "or" })).to.equal('true, false, or "maybe"');
    expect(humanize.values(["Fred", "Wilma", "Pebbles"], { conjunction: "or" })).to.equal('"Fred", "Wilma", or "Pebbles"');
    expect(humanize.values([{}, { foo: 1 }, { foo: 1, bar: 2 }], { conjunction: "or" })).to.equal("{}, {foo}, or {foo, bar}");
    expect(humanize.values([/^regex$/, new Date(), Object.prototype.valueOf], { conjunction: "or" })).to.equal("/^regex$/, Date, or function");
  });

  it("should join a list of many values", () => {
    expect(humanize.values([null, undefined, NaN, false, 0, ""]))
      .to.equal('null, undefined, NaN, false, 0, and ""');

    expect(humanize.values([400, 401, 404, 409, 500]))
      .to.equal("400, 401, 404, 409, and 500");

    expect(humanize.values([true, false, "maybe", "possibly", "yes", "no", "definitely not"]))
      .to.equal('true, false, "maybe", "possibly", "yes", "no", and "definitely not"');

    expect(humanize.values(["Fred", "Wilma", "Pebbles", "Barney", "Betty", "Bam Bam"]))
      .to.equal('"Fred", "Wilma", "Pebbles", "Barney", "Betty", and "Bam Bam"');

    expect(humanize.values([{}, { foo: 1 }, { foo: 1, bar: 2 }, /^regex$/, new Date(), Object.prototype.valueOf]))
      .to.equal("{}, {foo}, {foo, bar}, /^regex$/, Date, and function");
  });

  it("should use the conjunction when the list has many values", () => {
    expect(humanize.values([null, undefined, NaN, false, 0, ""], { conjunction: "or" }))
      .to.equal('null, undefined, NaN, false, 0, or ""');

    expect(humanize.values([400, 401, 404, 409, 500], { conjunction: "or" }))
      .to.equal("400, 401, 404, 409, or 500");

    expect(humanize.values([true, false, "maybe", "possibly", "yes", "no", "definitely not"], { conjunction: "or" }))
      .to.equal('true, false, "maybe", "possibly", "yes", "no", or "definitely not"');

    expect(humanize.values(["Fred", "Wilma", "Pebbles", "Barney", "Betty", "Bam Bam"], { conjunction: "or" }))
      .to.equal('"Fred", "Wilma", "Pebbles", "Barney", "Betty", or "Bam Bam"');

    expect(humanize.values([{}, { foo: 1 }, { foo: 1, bar: 2 }, /^regex$/, new Date(), Object.prototype.valueOf], { conjunction: "or" }))
      .to.equal("{}, {foo}, {foo, bar}, /^regex$/, Date, or function");
  });

  it("should limit the number of items to fit within the maxLength", () => {
    let numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    let people = ["Fred Flintstone", "Wilma Flintstone", "Pebbles Flintstone", "Barney Rubble", "Betty Rubble", "Bam Bam Rubble"];

    expect(humanize.list(numbers)).to.equal("one, two, three, four, five, six, seven, eight, nine, and ten");
    expect(humanize.values(numbers)).to.equal('"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", and "ten"');

    expect(humanize.list(people)).to.equal("Fred Flintstone, Wilma Flintstone, Pebbles Flintstone, Barney Rubble, Betty Rubble, and Bam Bam Rubble");
    expect(humanize.values(people)).to.equal('"Fred Flintstone", "Wilma Flintstone", "Pebbles Flintstone", "Barney Rubble", "Betty Rubble", and "Bam Bam Rubble"');

    expect(humanize.list(numbers, { maxLength: 30 })).to.equal("one, two, three, four, ..., ten");
    expect(humanize.values(numbers, { maxLength: 30 })).to.equal('"one", "two", "three", ..., "ten"');

    expect(humanize.list(people, { maxLength: 50 })).to.equal("Fred Flintstone, Wilma Flintstone, ..., Bam Bam Rubble");
    expect(humanize.values(people, { maxLength: 50 })).to.equal('"Fred Flintstone", ..., "Bam Bam Rubble"');
  });

});
