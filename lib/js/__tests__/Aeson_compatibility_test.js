'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Block = require("bs-platform/lib/js/block.js");
var Aeson_compatibility = require("../src/Aeson_compatibility.js");

Jest.describe("Either.t", (function (param) {
        Jest.test("to_result: Left", (function (param) {
                return Jest.Expect.toEqual(/* Error */Block.__(1, [123]), Jest.Expect.expect(Aeson_compatibility.Either.to_result(/* Left */Block.__(0, [123]))));
              }));
        Jest.test("to_result: Right", (function (param) {
                return Jest.Expect.toEqual(/* Ok */Block.__(0, ["Hello"]), Jest.Expect.expect(Aeson_compatibility.Either.to_result(/* Right */Block.__(1, ["Hello"]))));
              }));
        Jest.test("of_result: Error", (function (param) {
                return Jest.Expect.toEqual(/* Left */Block.__(0, [123]), Jest.Expect.expect(Aeson_compatibility.Either.of_result(/* Error */Block.__(1, [123]))));
              }));
        return Jest.test("of_result: Ok", (function (param) {
                      return Jest.Expect.toEqual(/* Right */Block.__(1, ["Goodbye"]), Jest.Expect.expect(Aeson_compatibility.Either.of_result(/* Ok */Block.__(0, ["Goodbye"]))));
                    }));
      }));

/*  Not a pure module */
