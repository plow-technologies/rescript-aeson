'use strict';

var Jest                = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Aeson_compatibility = require("../src/Aeson_compatibility.js");

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
        return Jest.test("rational", (function () {
                      return Jest.Expect[/* toEqual */12](Aeson_compatibility.Rational[/* make */0](3, 7), Jest.Expect[/* expect */0](Aeson_compatibility.Rational[/* - */44](Aeson_compatibility.Rational[/* make */0](5, 7), Aeson_compatibility.Rational[/* make */0](2, 7))));
                    }));
      }));

/*  Not a pure module */
