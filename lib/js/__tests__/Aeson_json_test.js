'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Aeson_json = require("../src/Aeson_json.js");

describe("json.t", (function () {
        Jest.test("is_numeric", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Aeson_json.is_numeric.test("Aeson.Json.NumberString(9)")));
              }));
        Jest.test("capture_numeric_string", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["9"], Jest.Expect[/* expect */0](Aeson_json.capture_numeric_string("Aeson.Json.NumberString(9)")));
              }));
        return Jest.test("dict string", (function () {
                      return Jest.Expect[/* toEqual */12]("{\"a\":\"x\",\"b\":\"y\"}", Jest.Expect[/* expect */0](Aeson_json.stringify(JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
                    }));
      }));

/*  Not a pure module */
