"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, humanize: namedExport } = require("../../");
const { expect } = require("chai");

describe("@jsdevtools/humanize-anything package exports", () => {

  it("should export the module as the default CommonJS export", () => {
    expect(commonJSExport).to.be.a("function");
    expect(commonJSExport.name).to.equal("humanizeValue");
  });

  it("should export the humanize function as the default ESM export", () => {
    expect(defaultExport).to.be.a("function");
    expect(defaultExport.name).to.equal("humanizeValue");
  });

  it("should export the humanize function as a named ESM export", () => {
    expect(namedExport).to.be.a("function");
    expect(namedExport.name).to.equal("humanizeValue");
  });

  it("should export the humanize.class function", () => {
    expect(namedExport.class).to.be.a("function");
    expect(namedExport.class.name).to.equal("humanizeClass");
    expect(namedExport.class).to.equal(commonJSExport.class);
  });

  it("should export the humanize.function function", () => {
    expect(namedExport.function).to.be.a("function");
    expect(namedExport.function.name).to.equal("humanizeFunction");
    expect(namedExport.function).to.equal(commonJSExport.function);
  });

  it("should export the humanize.list function", () => {
    expect(namedExport.list).to.be.a("function");
    expect(namedExport.list.name).to.equal("humanizeList");
    expect(namedExport.list).to.equal(commonJSExport.list);
  });

  it("should export the humanize.type function", () => {
    expect(namedExport.type).to.be.a("function");
    expect(namedExport.type.name).to.equal("humanizeType");
    expect(namedExport.type).to.equal(commonJSExport.type);
  });

  it("should export the humanize.values function", () => {
    expect(namedExport.values).to.be.a("function");
    expect(namedExport.values.name).to.equal("humanizeValues");
    expect(namedExport.values).to.equal(commonJSExport.values);
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.keys(
      "default",
      "humanize",
      "class",
      "function",
      "list",
      "type",
      "values",
    );
  });

});
