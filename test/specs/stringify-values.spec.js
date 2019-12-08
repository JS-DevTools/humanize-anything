"use strict";

const { stringify } = require("../../");
const { expect } = require("chai");

describe("stringify.values()", () => {

  it("should join a list that only contains one value", () => {
    expect(stringify.values([undefined])).to.equal("undefined");
    expect(stringify.values([null])).to.equal("null");
    expect(stringify.values([NaN])).to.equal("NaN");
    expect(stringify.values([0])).to.equal("0");
    expect(stringify.values([false])).to.equal("false");
    expect(stringify.values([true])).to.equal("true");
    expect(stringify.values([""])).to.equal('""');
    expect(stringify.values(["Fred"])).to.equal('"Fred"');
    expect(stringify.values([{}])).to.equal("{}");
    expect(stringify.values([/^regex$/])).to.equal("/^regex$/");
    expect(stringify.values([new Date()])).to.equal("Date");
  });

  it("should not use the conjunction if the list only has one value", () => {
    expect(stringify.values([undefined], { conjunction: "or" })).to.equal("undefined");
    expect(stringify.values([null], { conjunction: "or" })).to.equal("null");
    expect(stringify.values([NaN], { conjunction: "or" })).to.equal("NaN");
    expect(stringify.values([0], { conjunction: "or" })).to.equal("0");
    expect(stringify.values([false], { conjunction: "or" })).to.equal("false");
    expect(stringify.values([true], { conjunction: "or" })).to.equal("true");
    expect(stringify.values([""], { conjunction: "or" })).to.equal('""');
    expect(stringify.values(["Fred"], { conjunction: "or" })).to.equal('"Fred"');
    expect(stringify.values([{}], { conjunction: "or" })).to.equal("{}");
    expect(stringify.values([/^regex$/], { conjunction: "or" })).to.equal("/^regex$/");
    expect(stringify.values([new Date()], { conjunction: "or" })).to.equal("Date");
  });

  it("should join a list that only contains two values", () => {
    expect(stringify.values([null, undefined])).to.equal("null and undefined");
    expect(stringify.values([NaN, NaN])).to.equal("NaN and NaN");
    expect(stringify.values([0, 1])).to.equal("0 and 1");
    expect(stringify.values([true, false])).to.equal("true and false");
    expect(stringify.values(["", ""])).to.equal('"" and ""');
    expect(stringify.values(["Fred", "Wilma"])).to.equal('"Fred" and "Wilma"');
    expect(stringify.values([{}, { foo: 1 }])).to.equal("{} and {foo}");
    expect(stringify.values([/^regex$/, new Date()])).to.equal("/^regex$/ and Date");
  });

  it("should use the conjunction when the list has two values", () => {
    expect(stringify.values([null, undefined], { conjunction: "or" })).to.equal("null or undefined");
    expect(stringify.values([NaN, NaN], { conjunction: "or" })).to.equal("NaN or NaN");
    expect(stringify.values([0, 1], { conjunction: "or" })).to.equal("0 or 1");
    expect(stringify.values([true, false], { conjunction: "or" })).to.equal("true or false");
    expect(stringify.values(["", ""], { conjunction: "or" })).to.equal('"" or ""');
    expect(stringify.values(["Fred", "Wilma"], { conjunction: "or" })).to.equal('"Fred" or "Wilma"');
    expect(stringify.values([{}, { foo: 1 }], { conjunction: "or" })).to.equal("{} or {foo}");
    expect(stringify.values([/^regex$/, new Date()], { conjunction: "or" })).to.equal("/^regex$/ or Date");
  });

  it("should join a list that only contains three values", () => {
    expect(stringify.values([null, undefined, NaN])).to.equal("null, undefined, and NaN");
    expect(stringify.values([0, 1, 2])).to.equal("0, 1, and 2");
    expect(stringify.values([true, false, "maybe"])).to.equal('true, false, and "maybe"');
    expect(stringify.values(["Fred", "Wilma", "Pebbles"])).to.equal('"Fred", "Wilma", and "Pebbles"');
    expect(stringify.values([{}, { foo: 1 }, { foo: 1, bar: 2 }])).to.equal("{}, {foo}, and {foo,bar}");
    expect(stringify.values([/^regex$/, new Date(), Object.prototype.valueOf])).to.equal("/^regex$/, Date, and function");
  });

  it("should use the conjunction when the list has three values", () => {
    expect(stringify.values([null, undefined, NaN], { conjunction: "or" })).to.equal("null, undefined, or NaN");
    expect(stringify.values([0, 1, 2], { conjunction: "or" })).to.equal("0, 1, or 2");
    expect(stringify.values([true, false, "maybe"], { conjunction: "or" })).to.equal('true, false, or "maybe"');
    expect(stringify.values(["Fred", "Wilma", "Pebbles"], { conjunction: "or" })).to.equal('"Fred", "Wilma", or "Pebbles"');
    expect(stringify.values([{}, { foo: 1 }, { foo: 1, bar: 2 }], { conjunction: "or" })).to.equal("{}, {foo}, or {foo,bar}");
    expect(stringify.values([/^regex$/, new Date(), Object.prototype.valueOf], { conjunction: "or" })).to.equal("/^regex$/, Date, or function");
  });

  it("should join a list of many values", () => {
    expect(stringify.values([null, undefined, NaN, false, 0, ""]))
      .to.equal('null, undefined, NaN, false, 0, and ""');

    expect(stringify.values([400, 401, 404, 409, 500]))
      .to.equal("400, 401, 404, 409, and 500");

    expect(stringify.values([true, false, "maybe", "possibly", "yes", "no", "definitely not"]))
      .to.equal('true, false, "maybe", "possibly", "yes", "no", and "definitely not"');

    expect(stringify.values(["Fred", "Wilma", "Pebbles", "Barney", "Betty", "Bam Bam"]))
      .to.equal('"Fred", "Wilma", "Pebbles", "Barney", "Betty", and "Bam Bam"');

    expect(stringify.values([{}, { foo: 1 }, { foo: 1, bar: 2 }, /^regex$/, new Date(), Object.prototype.valueOf]))
      .to.equal("{}, {foo}, {foo,bar}, /^regex$/, Date, and function");
  });

  it("should use the conjunction when the list has many values", () => {
    expect(stringify.values([null, undefined, NaN, false, 0, ""], { conjunction: "or" }))
      .to.equal('null, undefined, NaN, false, 0, or ""');

    expect(stringify.values([400, 401, 404, 409, 500], { conjunction: "or" }))
      .to.equal("400, 401, 404, 409, or 500");

    expect(stringify.values([true, false, "maybe", "possibly", "yes", "no", "definitely not"], { conjunction: "or" }))
      .to.equal('true, false, "maybe", "possibly", "yes", "no", or "definitely not"');

    expect(stringify.values(["Fred", "Wilma", "Pebbles", "Barney", "Betty", "Bam Bam"], { conjunction: "or" }))
      .to.equal('"Fred", "Wilma", "Pebbles", "Barney", "Betty", or "Bam Bam"');

    expect(stringify.values([{}, { foo: 1 }, { foo: 1, bar: 2 }, /^regex$/, new Date(), Object.prototype.valueOf], { conjunction: "or" }))
      .to.equal("{}, {foo}, {foo,bar}, /^regex$/, Date, or function");
  });

});
