'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Bigint = require("bs-Zarith/lib/js/src/Bigint.js");
var Aeson_json = require("../src/Aeson_json.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

describe("json.t", (function () {
        Jest.test("is_numeric", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Aeson_json.is_numeric.test("Aeson.Json.NumberString(9)")));
              }));
        Jest.test("capture_numeric_string", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["9"], Jest.Expect[/* expect */0](Aeson_json.capture_numeric_string("Aeson.Json.NumberString(9)")));
              }));
        Jest.test("dict string", (function () {
                return Jest.Expect[/* toEqual */12]("{\"a\":\"x\",\"b\":\"y\"}", Jest.Expect[/* expect */0](Aeson_json.stringify(JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("dict string", (function () {
                return Jest.Expect[/* toEqual */12]("[\"a\",\"x\",\"b\",\"y\"]", Jest.Expect[/* expect */0](Aeson_json.stringify(JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] "))));
              }));
        Jest.test("int64", (function () {
                return Jest.Expect[/* toEqual */12]("9223372036854775807", Jest.Expect[/* expect */0](Aeson_json.stringify(Aeson_json.int64(Caml_format.caml_int64_of_string("9223372036854775807")))));
              }));
        Jest.test("bigint", (function () {
                return Jest.Expect[/* toEqual */12]("823891829388198398494893843948394892233720368547758072323123123", Jest.Expect[/* expect */0](Aeson_json.stringify(Aeson_json.bigint(Bigint.of_string("823891829388198398494893843948394892233720368547758072323123123")))));
              }));
        return Jest.test("string", (function () {
                      return Jest.Expect[/* toEqual */12]("\"foo\"", Jest.Expect[/* expect */0](Aeson_json.stringify("foo")));
                    }));
      }));

/*  Not a pure module */
