'use strict';

var U = require("bs-zarith/lib/js/src/U.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Bigint = require("bs-zarith/lib/js/src/Bigint.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Aeson_encode = require("../src/Aeson_encode.js");

var Test = { };

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
                  ], Jest.Expect.expect(/* int64 */[
                        /* hi */0,
                        /* lo */23
                      ]));
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
        return Jest.Expect.toEqual({ }, Jest.Expect.expect({ }));
      }));

Jest.test("dict - simple", (function (param) {
        var o = { };
        o["x"] = 42;
        return Jest.Expect.toEqual(o, Jest.Expect.expect(o));
      }));

Jest.test("object_ - empty", (function (param) {
        return Jest.Expect.toEqual({ }, Jest.Expect.expect(Aeson_encode.object_(/* [] */0)));
      }));

Jest.test("object_ - simple", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "x",
                          42
                        ],
                        /* [] */0
                      ]), Jest.Expect.expect(Aeson_encode.object_(/* :: */[
                            /* tuple */[
                              "x",
                              42
                            ],
                            /* [] */0
                          ])));
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
                            }), /* :: */[
                            1,
                            /* :: */[
                              2,
                              /* :: */[
                                3,
                                /* [] */0
                              ]
                            ]
                          ])));
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
        return Jest.Expect.toEqual(Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Error",
                          123
                        ],
                        /* [] */0
                      ]), Jest.Expect.expect(Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Error */Block.__(1, [123]))));
      }));

Jest.test("result", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Ok",
                          "Good"
                        ],
                        /* [] */0
                      ]), Jest.Expect.expect(Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Ok */Block.__(0, ["Good"]))));
      }));

Jest.test("either", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Left",
                          123
                        ],
                        /* [] */0
                      ]), Jest.Expect.expect(Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Left */Block.__(0, [123]))));
      }));

Jest.test("either", (function (param) {
        return Jest.Expect.toEqual(Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Right",
                          "Good"
                        ],
                        /* [] */0
                      ]), Jest.Expect.expect(Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Right */Block.__(1, ["Good"]))));
      }));

Jest.test("pair", (function (param) {
        return Jest.Expect.toEqual(JSON.parse(" [1, \"a\"] "), Jest.Expect.expect(Aeson_encode.pair((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* tuple */[
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
                            }), /* tuple */[
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
                            }), /* tuple */[
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
                            }), /* tuple */[
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
                            }), /* tuple */[
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
                            }), /* tuple */[
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
                            }), /* tuple */[
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
                            }), /* tuple */[
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
                            }), /* tuple */[
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
