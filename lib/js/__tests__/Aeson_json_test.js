'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Bigint = require("bs-Zarith/lib/js/src/Bigint.js");
var Aeson_json = require("../src/Aeson_json.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

describe("json.t", (function () {
        Jest.test("test regex against unicode string", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0]((/\u4E0A/).test("\"上\"")));
              }));
        Jest.test("test regex against unicode code point string", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0]((/\u4E0A/).test("\"\u4E0A\"")));
              }));
        Jest.test("test regex against unicode code point string", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0]((/^\u4E0A$/).test(String.fromCharCode(19978))));
              }));
        Jest.test("test regex against unicode code point string in private use area", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0]((/^\uE000$/).test(String.fromCharCode(57344))));
              }));
        Jest.test("is_numeric", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Aeson_json.is_numeric.test(String.fromCharCode(57344) + "9.0")));
              }));
        Jest.test("dict", (function () {
                return Jest.Expect[/* toEqual */12]("{\"a\":\"x\",\"b\":\"y\"}", Jest.Expect[/* expect */0](Aeson_json.stringify(JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12]("[\"a\",\"x\",\"b\",\"y\"]", Jest.Expect[/* expect */0](Aeson_json.stringify(JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] "))));
              }));
        Jest.test("dict", (function () {
                return Jest.Expect[/* toEqual */12](JSON.stringify(JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } ")), Jest.Expect[/* expect */0](Aeson_json.stringify(JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](JSON.stringify(JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] ")), Jest.Expect[/* expect */0](Aeson_json.stringify(JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] "))));
              }));
        Jest.test("int64", (function () {
                return Jest.Expect[/* toEqual */12]("9223372036854775807", Jest.Expect[/* expect */0](Aeson_json.stringify(Aeson_json.int64(Caml_format.caml_int64_of_string("9223372036854775807")))));
              }));
        Jest.test("bigint", (function () {
                return Jest.Expect[/* toEqual */12]("823891829388198398494893843948394892233720368547758072323123123", Jest.Expect[/* expect */0](Aeson_json.stringify(Aeson_json.bigint(Bigint.of_string("823891829388198398494893843948394892233720368547758072323123123")))));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12]("\"foo\"", Jest.Expect[/* expect */0](Aeson_json.stringify("foo")));
              }));
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] "), Jest.Expect[/* expect */0](Aeson_json.to_js_json(JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] "))));
              }));
        return Jest.test("array", (function () {
                      return Jest.Expect[/* toEqual */12](JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] "), Jest.Expect[/* expect */0](Aeson_json.from_js_json(JSON.parse(" [ \"a\", \"x\", \"b\", \"y\" ] "))));
                    }));
      }));

/*  Not a pure module */
