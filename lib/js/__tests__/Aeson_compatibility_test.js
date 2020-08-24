'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Aeson_compatibility = require("../src/Aeson_compatibility.js");

Jest.describe("Either.t", (function (param) {
        Jest.test("to_result: Left", (function (param) {
                return Jest.Expect.toEqual({
                            TAG: /* Error */1,
                            _0: 123
                          }, Jest.Expect.expect(Aeson_compatibility.Either.to_result({
                                    TAG: /* Left */0,
                                    _0: 123
                                  })));
              }));
        Jest.test("to_result: Right", (function (param) {
                return Jest.Expect.toEqual({
                            TAG: /* Ok */0,
                            _0: "Hello"
                          }, Jest.Expect.expect(Aeson_compatibility.Either.to_result({
                                    TAG: /* Right */1,
                                    _0: "Hello"
                                  })));
              }));
        Jest.test("of_result: Error", (function (param) {
                return Jest.Expect.toEqual({
                            TAG: /* Left */0,
                            _0: 123
                          }, Jest.Expect.expect(Aeson_compatibility.Either.of_result({
                                    TAG: /* Error */1,
                                    _0: 123
                                  })));
              }));
        return Jest.test("of_result: Ok", (function (param) {
                      return Jest.Expect.toEqual({
                                  TAG: /* Right */1,
                                  _0: "Goodbye"
                                }, Jest.Expect.expect(Aeson_compatibility.Either.of_result({
                                          TAG: /* Ok */0,
                                          _0: "Goodbye"
                                        })));
                    }));
      }));

/*  Not a pure module */
