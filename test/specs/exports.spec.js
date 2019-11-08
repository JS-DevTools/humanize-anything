"use strict";

const { expect } = require("chai");
const commonJSExport = require("../../");
const { default: defaultExport } = require("../../");
const { stringify: namedExport } = require("../../");

describe("@code-engine/stringify package exports", () => {

  it("should export the stringify function as the default CommonJS export", () => {
    expect(commonJSExport).to.be.a("function");
    expect(commonJSExport.name).to.equal("stringifyValue");
    expect(commonJSExport).to.equal(defaultExport);
    expect(commonJSExport).to.equal(namedExport);
  });

  it("should export the stringify function as the default ESM export", () => {
    expect(defaultExport).to.be.a("function");
    expect(defaultExport.name).to.equal("stringifyValue");
    expect(defaultExport).to.equal(commonJSExport);
    expect(defaultExport).to.equal(namedExport);
  });

  it("should export the stringify function as a named ESM export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport.name).to.equal("stringifyValue");
    expect(namedExport).to.equal(commonJSExport);
    expect(namedExport).to.equal(defaultExport);
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.keys(
      "default",
      "stringify",
      "class",
      "function",
      "type",
      "values",
      "list",
    );
  });

});
