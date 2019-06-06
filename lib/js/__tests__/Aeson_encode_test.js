'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Aeson_encode = require("../src/Aeson_encode.js");

var Test = /* module */[];

Jest.test("null", (function (param) {
        return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](null));
      }));

Jest.test("string", (function (param) {
        return Jest.Expect[/* toEqual */12]("foo", Jest.Expect[/* expect */0]("foo"));
      }));

Jest.test("date - non-float time", (function (param) {
        var nowString = "2017-12-08T06:03:22Z";
        var now = new Date(nowString);
        return Jest.Expect[/* toEqual */12](nowString, Jest.Expect[/* expect */0](Aeson_encode.date(now)));
      }));

Jest.test("date - float time", (function (param) {
        var nowString = "2017-12-08T06:03:22.123Z";
        var now = new Date(nowString);
        return Jest.Expect[/* toEqual */12](nowString, Jest.Expect[/* expect */0](Aeson_encode.date(now)));
      }));

Jest.test("float", (function (param) {
        return Jest.Expect[/* toEqual */12](1.23, Jest.Expect[/* expect */0](1.23));
      }));

Jest.test("int", (function (param) {
        return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](23));
      }));

Jest.test("int32", (function (param) {
        return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](23));
      }));

Jest.test("int64_of_array", (function (param) {
        return Jest.Expect[/* toEqual */12](/* array */[
                    0,
                    23
                  ], Jest.Expect[/* expect */0](/* int64 */[
                        /* hi */0,
                        /* lo */23
                      ]));
      }));

Jest.test("nativeint", (function (param) {
        return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](23));
      }));

Jest.test("bool", (function (param) {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](true));
      }));

Jest.test("dict - empty", (function (param) {
        return Jest.Expect[/* toEqual */12]({ }, Jest.Expect[/* expect */0]({ }));
      }));

Jest.test("dict - simple", (function (param) {
        var o = { };
        o["x"] = 42;
        return Jest.Expect[/* toEqual */12](o, Jest.Expect[/* expect */0](o));
      }));

Jest.test("object_ - empty", (function (param) {
        return Jest.Expect[/* toEqual */12]({ }, Jest.Expect[/* expect */0](Aeson_encode.object_(/* [] */0)));
      }));

Jest.test("object_ - simple", (function (param) {
        return Jest.Expect[/* toEqual */12](Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "x",
                          42
                        ],
                        /* [] */0
                      ]), Jest.Expect[/* expect */0](Aeson_encode.object_(/* :: */[
                            /* tuple */[
                              "x",
                              42
                            ],
                            /* [] */0
                          ])));
      }));

Jest.test("array int", (function (param) {
        return Jest.Expect[/* toEqual */12](/* array */[
                    1,
                    2,
                    3
                  ], Jest.Expect[/* expect */0]($$Array.map((function (prim) {
                              return prim;
                            }), /* array */[
                            1,
                            2,
                            3
                          ])));
      }));

Jest.test("list int", (function (param) {
        return Jest.Expect[/* toEqual */12](/* array */[
                    1,
                    2,
                    3
                  ], Jest.Expect[/* expect */0](Aeson_encode.list((function (prim) {
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
        return Jest.Expect[/* toEqual */12](/* array */[], Jest.Expect[/* expect */0](Aeson_encode.singleEnumerator(/* SingleEnumerator */0)));
      }));

Jest.test("stringArray", (function (param) {
        return Jest.Expect[/* toEqual */12](/* array */[
                    "a",
                    "b"
                  ], Jest.Expect[/* expect */0](/* array */[
                        "a",
                        "b"
                      ]));
      }));

Jest.test("numberArray", (function (param) {
        return Jest.Expect[/* toEqual */12](/* array */[
                    0,
                    4
                  ], Jest.Expect[/* expect */0](/* array */[
                        0,
                        4
                      ]));
      }));

Jest.test("boolArray", (function (param) {
        return Jest.Expect[/* toEqual */12](/* array */[
                    true,
                    false
                  ], Jest.Expect[/* expect */0](/* array */[
                        true,
                        false
                      ]));
      }));

Jest.test("result", (function (param) {
        return Jest.Expect[/* toEqual */12](Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Error",
                          123
                        ],
                        /* [] */0
                      ]), Jest.Expect[/* expect */0](Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Error */Block.__(1, [123]))));
      }));

Jest.test("result", (function (param) {
        return Jest.Expect[/* toEqual */12](Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Ok",
                          "Good"
                        ],
                        /* [] */0
                      ]), Jest.Expect[/* expect */0](Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Ok */Block.__(0, ["Good"]))));
      }));

Jest.test("either", (function (param) {
        return Jest.Expect[/* toEqual */12](Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Left",
                          123
                        ],
                        /* [] */0
                      ]), Jest.Expect[/* expect */0](Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Left */Block.__(0, [123]))));
      }));

Jest.test("either", (function (param) {
        return Jest.Expect[/* toEqual */12](Js_dict.fromList(/* :: */[
                        /* tuple */[
                          "Right",
                          "Good"
                        ],
                        /* [] */0
                      ]), Jest.Expect[/* expect */0](Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* Right */Block.__(1, ["Good"]))));
      }));

Jest.test("pair", (function (param) {
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\"] "), Jest.Expect[/* expect */0](Aeson_encode.pair((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), /* tuple */[
                            1,
                            "a"
                          ])));
      }));

Jest.test("tuple3", (function (param) {
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false] "), Jest.Expect[/* expect */0](Aeson_encode.tuple3((function (prim) {
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
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false, 2] "), Jest.Expect[/* expect */0](Aeson_encode.tuple4((function (prim) {
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
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false, 2, true] "), Jest.Expect[/* expect */0](Aeson_encode.tuple5((function (prim) {
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
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false, 2, true, \"loop\"] "), Jest.Expect[/* expect */0](Aeson_encode.tuple6((function (prim) {
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
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\"] "), Jest.Expect[/* expect */0](Aeson_encode.tuple7((function (prim) {
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
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33] "), Jest.Expect[/* expect */0](Aeson_encode.tuple8((function (prim) {
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
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33, \"blah\"] "), Jest.Expect[/* expect */0](Aeson_encode.tuple9((function (prim) {
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
        return Jest.Expect[/* toEqual */12](JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33, \"blah\", false] "), Jest.Expect[/* expect */0](Aeson_encode.tuple10((function (prim) {
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
