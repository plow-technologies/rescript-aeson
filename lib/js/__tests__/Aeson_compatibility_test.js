'use strict';

var Jest                = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Block               = require("bs-platform/lib/js/block.js");
var Pervasives          = require("bs-platform/lib/js/pervasives.js");
var Aeson_compatibility = require("../src/Aeson_compatibility.js");

describe("either", (function () {
        Jest.test("left", (function () {
                return Jest.Expect[/* toEqual */12](/* Left */Block.__(0, [1]), Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* left */0](1)));
              }));
        Jest.test("right", (function () {
                return Jest.Expect[/* toEqual */12](/* Right */Block.__(1, [1]), Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* right */1](1)));
              }));
        Jest.test("left", (function () {
                return Jest.Expect[/* toEqual */12]("Left (1)", Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* to_string */16](Pervasives.string_of_int, Pervasives.string_of_int)(Aeson_compatibility.Either[/* left */0](1))));
              }));
        return Jest.test("right", (function () {
                      return Jest.Expect[/* toEqual */12]("Right (1)", Jest.Expect[/* expect */0](Aeson_compatibility.Either[/* to_string */16](Pervasives.string_of_int, Pervasives.string_of_int)(Aeson_compatibility.Either[/* right */1](1))));
                    }));
      }));

describe("rational", (function () {
        Jest.test("rational", (function () {
                return Jest.Expect[/* toEqual */12](Aeson_compatibility.Rational[/* make */0](2, 6), Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* make */0](1, 3)));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toEqual */12](Aeson_compatibility.Rational[/* make */0](1, 4), Jest.Expect[/* not_ */23](Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* make */0](1, 3))));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toEqual */12](0.5, Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* to_float */26](Aeson_compatibility.Rational[/* make */0](1, 2))));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toBeGreaterThan */5](0.3, Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* to_float */26](Aeson_compatibility.Rational[/* make */0](1, 3))));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toBeLessThan */7](0.26, Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* to_float */26](Aeson_compatibility.Rational[/* make */0](1, 4))));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toEqual */12](Aeson_compatibility.Rational[/* one */2], Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* + */43](Aeson_compatibility.Rational[/* make */0](1, 2), Aeson_compatibility.Rational[/* make */0](1, 2))));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toEqual */12](Aeson_compatibility.Rational[/* make */0](3, 7), Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* - */44](Aeson_compatibility.Rational[/* make */0](5, 7), Aeson_compatibility.Rational[/* make */0](2, 7))));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toEqual */12]("1/3", Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* to_string */25](Aeson_compatibility.Rational[/* make */0](1, 3))));
              }));
        Jest.test("rational", (function () {
                return Jest.Expect[/* toEqual */12]("-1/3", Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* to_string */25](Aeson_compatibility.Rational[/* make */0](-1, 3))));
              }));
        return Jest.test("rational", (function () {
                      return Jest.Expect[/* toEqual */12]("108583231403255/695053048136", Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* to_string */25](Aeson_compatibility.Rational[/* make */0](-2131774217, -731653816))));
                    }));
      }));

/*  Not a pure module */
