'use strict';

var Jest = require("@glennsl/rescript-jest/lib/js/src/jest.js");
var Aeson_compatibility = require("../src/Aeson_compatibility.js");

Jest.describe("Either.t", (function () {
        Jest.test("to_result: Left", (function () {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_compatibility.Either.to_result({
                                    TAG: "Left",
                                    _0: 123
                                  })), {
                            TAG: "Error",
                            _0: 123
                          });
              }));
        Jest.test("to_result: Right", (function () {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_compatibility.Either.to_result({
                                    TAG: "Right",
                                    _0: "Hello"
                                  })), {
                            TAG: "Ok",
                            _0: "Hello"
                          });
              }));
        Jest.test("of_result: Error", (function () {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_compatibility.Either.of_result({
                                    TAG: "Error",
                                    _0: 123
                                  })), {
                            TAG: "Left",
                            _0: 123
                          });
              }));
        Jest.test("of_result: Ok", (function () {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_compatibility.Either.of_result({
                                    TAG: "Ok",
                                    _0: "Goodbye"
                                  })), {
                            TAG: "Right",
                            _0: "Goodbye"
                          });
              }));
      }));

/*  Not a pure module */
