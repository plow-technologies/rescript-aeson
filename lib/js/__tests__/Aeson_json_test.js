'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Aeson_json = require("../src/Aeson_json.js");

describe("json.t", (function () {
        Jest.test("is_numeric", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Aeson_json.is_numeric("9")));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12]("\"foo\"", Jest.Expect[/* expect */0](Aeson_json.stringify("foo")));
              }));
        return Jest.test("int64", (function () {
                      return Jest.Expect[/* toEqual */12]("9", Jest.Expect[/* expect */0](Aeson_json.stringify("9")));
                    }));
      }));

/*  Not a pure module */
