'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Block = require("bs-platform/lib/js/block.js");
var Aeson_compatibility = require("../src/Aeson_compatibility.js");

Jest.describe("Either.t", (function (param) {
        Jest.test("to_result: Left", (function (param) {
                return Jest.Expect[/* toEqual */12](/* Error */Block.__(1, [123]), Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* to_result */3](/* Left */Block.__(0, [123]))));
              }));
        Jest.test("to_result: Right", (function (param) {
                return Jest.Expect[/* toEqual */12](/* Ok */Block.__(0, ["Hello"]), Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* to_result */3](/* Right */Block.__(1, ["Hello"]))));
              }));
        Jest.test("of_result: Error", (function (param) {
                return Jest.Expect[/* toEqual */12](/* Left */Block.__(0, [123]), Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* of_result */4](/* Error */Block.__(1, [123]))));
              }));
        return Jest.test("of_result: Ok", (function (param) {
                      return Jest.Expect[/* toEqual */12](/* Right */Block.__(1, ["Goodbye"]), Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* of_result */4](/* Ok */Block.__(0, ["Goodbye"]))));
                    }));
      }));

/*  Not a pure module */
