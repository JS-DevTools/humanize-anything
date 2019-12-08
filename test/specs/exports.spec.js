"use strict";

const { expect } = require("chai");
const commonJSExport = require("../../");
const { default: defaultExport } = require("../../");
const { stringify: namedExport } = require("../../");

describe("@code-engine/stringify package exports", () => {

  it("should export the module as the default CommonJS export", () => {
    expect(commonJSExport).to.be.an("object");
    expect(commonJSExport.default).to.equal(defaultExport);
    expect(commonJSExport.stringify).to.equal(namedExport);
  });

  it("should export the stringify function as the default ESM export", () => {
    expect(defaultExport).to.be.a("function");
    expect(defaultExport.name).to.equal("stringifyValue");
  });

  it("should export the stringify function as a named ESM export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport.name).to.equal("stringifyValue");
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.keys(
      "default",
      "stringify",
    );
  });

});
