'use strict';

var U = require("bs-zarith/lib/js/src/U.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Bigint = require("bs-zarith/lib/js/src/Bigint.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Aeson_encode = require("../src/Aeson_encode.js");

var Test = {};

Jest.test("null", (function (param) {
        return Jest.Expect.toEqual(null, Jest.Expect.expect(null));
      }));

Jest.test("string", (function (param) {
        return Jest.Expect.toEqual("foo", Jest.Expect.expect("foo"));
      }));

Jest.test("date - non-float time", (function (param) {
        var nowString = "2017-12-08T06:03:22Z";
        var now = new Date(nowString);
        return Jest.Expect.toEqual(nowString, Jest.Expect.expect(Aeson_encode.date(now)));
      }));

Jest.test("date - float time", (function (param) {
        var nowString = "2017-12-08T06:03:22.123Z";
        var now = new Date(nowString);
        return Jest.Expect.toEqual(nowString, Jest.Expect.expect(Aeson_encode.date(now)));
      }));

Jest.test("float", (function (param) {
        return Jest.Expect.toEqual(1.23, Jest.Expect.expect(1.23));
      }));

Jest.test("int", (function (param) {
        return Jest.Expect.toEqual(23, Jest.Expect.expect(23));
      }));

Jest.test("int32", (function (param) {
        return Jest.Expect.toEqual(23, Jest.Expect.expect(23));
      }));

Jest.test("int64_of_array", (function (param) {
        return Jest.Expect.toEqual([
                    0,
                    23
                  ], Jest.Expect.expect(Caml_int64.mk(23, 0)));
      }));

Jest.test("nativeint", (function (param) {
        return Jest.Expect.toEqual(23, Jest.Expect.expect(23));
      }));

Jest.test("uint8", (function (param) {
        return Jest.Expect.toEqual(18, Jest.Expect.expect(Aeson_encode.uint8(U.UInt8.ofInt(18))));
      }));

Jest.test("uint16", (function (param) {
        return Jest.Expect.toEqual(18, Jest.Expect.expect(Aeson_encode.uint16(U.UInt16.ofInt(18))));
      }));

Jest.test("uint32", (function (param) {
        return Jest.Expect.toEqual(18, Jest.Expect.expect(Aeson_encode.uint32(U.UInt32.ofInt(18))));
      }));

Jest.test("uint64", (function (param) {
        return Jest.Expect.toEqual("233", Jest.Expect.expect(Aeson_encode.uint64(U.UInt64.ofInt(233))));
      }));

Jest.test("bigint", (function (param) {
        return Jest.Expect.toEqual("38293829382888882338928", Jest.Expect.expect(Aeson_encode.bigint(Bigint.of_string("38293829382888882338928"))));
      }));

Jest.test("bool", (function (param) {
        return Jest.Expect.toEqual(true, Jest.Expect.expect(true));
      }));

Jest.test("dict - empty", (function (param) {
        return Jest.Expect.toEqual({}, Jest.Expect.expect({}));
      }));

Jest.test("dict - simple", (function (param) {
        var o = {};
        o["x"] = 42;
        return Jest.Expect.toEqual(o, Jest.Expect.expect(o));
      }));

Jest.test("object_ - empty", (function (param) {
        return Jest.Expect.toEqual({}, Jest.Expect.expect(Aeson_encode.object_(/* [] */0)));
      }));

Jest.test("object_ - simple", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              42
                            ],
                            tl: /* [] */0
                          })));
      }));

Jest.test("object_ - option", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              Aeson_encode.optional((function (prim) {
                                      return prim;
                                    }), 42)
                            ],
                            tl: /* [] */0
                          })));
      }));

Jest.test("object_ - option Some", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              Aeson_encode.optional((function (prim) {
                                      return prim;
                                    }), 42)
                            ],
                            tl: /* [] */0
                          })));
      }));

Jest.test("object_ - option None", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "x",
                          null
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              Aeson_encode.optional((function (prim) {
                                      return prim;
                                    }), undefined)
                            ],
                            tl: /* [] */0
                          })));
      }));

Jest.test("object_ - optionalField Some", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.object_(Aeson_encode.optionalField("x", (function (prim) {
                                  return prim;
                                }), 42))));
      }));

Jest.test("object_ - optionalField Some", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList(/* [] */0), Jest.Expect.expect(Aeson_encode.object_(Aeson_encode.optionalField("x", (function (prim) {
                                  return prim;
                                }), undefined))));
      }));

Jest.test("array int", (function (param) {
        return Jest.Expect.toEqual([
                    1,
                    2,
                    3
                  ], Jest.Expect.expect($$Array.map((function (prim) {
                              return prim;
                            }), [
                            1,
                            2,
                            3
                          ])));
      }));

Jest.test("list int", (function (param) {
        return Jest.Expect.toEqual([
                    1,
                    2,
                    3
                  ], Jest.Expect.expect(Aeson_encode.list((function (prim) {
                              return prim;
                            }), {
                            hd: 1,
                            tl: {
                              hd: 2,
                              tl: {
                                hd: 3,
                                tl: /* [] */0
                              }
                            }
                          })));
      }));

Jest.test("singleEnumerator typeParameterRef0", (function (param) {
        return Jest.Expect.toEqual([], Jest.Expect.expect(Aeson_encode.singleEnumerator(/* SingleEnumerator */0)));
      }));

Jest.test("stringArray", (function (param) {
        return Jest.Expect.toEqual([
                    "a",
                    "b"
                  ], Jest.Expect.expect([
                        "a",
                        "b"
                      ]));
      }));

Jest.test("numberArray", (function (param) {
        return Jest.Expect.toEqual([
                    0,
                    4
                  ], Jest.Expect.expect([
                        0,
                        4
                      ]));
      }));

Jest.test("boolArray", (function (param) {
        return Jest.Expect.toEqual([
                    true,
                    false
                  ], Jest.Expect.expect([
                        true,
                        false
                      ]));
      }));

Jest.test("result", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "Error",
                          123
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: /* Error */1,
                            _0: 123
                          })));
      }));

Jest.test("result", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "Ok",
                          "Good"
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: /* Ok */0,
                            _0: "Good"
                          })));
      }));

Jest.test("either", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "Left",
                          123
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: /* Left */0,
                            _0: 123
                          })));
      }));

Jest.test("either", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList({
                        hd: [
                          "Right",
                          "Good"
                        ],
                        tl: /* [] */0
                      }), Jest.Expect.expect(Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: /* Right */1,
                            _0: "Good"
                          })));
      }));

Jest.test("pair", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\"] "), Jest.Expect.expect(Aeson_encode.pair((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a"
                          ])));
      }));

Jest.test("tuple3", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false] "), Jest.Expect.expect(Aeson_encode.tuple3((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false
                          ])));
      }));

Jest.test("tuple4", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false, 2] "), Jest.Expect.expect(Aeson_encode.tuple4((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false,
                            2
                          ])));
      }));

Jest.test("tuple5", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false, 2, true] "), Jest.Expect.expect(Aeson_encode.tuple5((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false,
                            2,
                            true
                          ])));
      }));

Jest.test("tuple6", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false, 2, true, \"loop\"] "), Jest.Expect.expect(Aeson_encode.tuple6((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false,
                            2,
                            true,
                            "loop"
                          ])));
      }));

Jest.test("tuple7", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\"] "), Jest.Expect.expect(Aeson_encode.tuple7((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false,
                            2,
                            true,
                            "loop",
                            "recursion"
                          ])));
      }));

Jest.test("tuple8", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33] "), Jest.Expect.expect(Aeson_encode.tuple8((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false,
                            2,
                            true,
                            "loop",
                            "recursion",
                            33
                          ])));
      }));

Jest.test("tuple9", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33, \"blah\"] "), Jest.Expect.expect(Aeson_encode.tuple9((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false,
                            2,
                            true,
                            "loop",
                            "recursion",
                            33,
                            "blah"
                          ])));
      }));

Jest.test("tuple10", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33, \"blah\", false] "), Jest.Expect.expect(Aeson_encode.tuple10((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false,
                            2,
                            true,
                            "loop",
                            "recursion",
                            33,
                            "blah",
                            false
                          ])));
      }));

exports.Test = Test;
/*  Not a pure module */
