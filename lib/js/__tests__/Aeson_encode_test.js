'use strict';

var Jest = require("@glennsl/rescript-jest/lib/js/src/jest.js");
var Belt_Id = require("rescript/lib/js/belt_Id.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Belt_Map = require("rescript/lib/js/belt_Map.js");
var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Belt_MapInt = require("rescript/lib/js/belt_MapInt.js");
var Aeson_encode = require("../src/Aeson_encode.js");
var Belt_MapString = require("rescript/lib/js/belt_MapString.js");

var Test = {};

function encodeOnpingKey(x) {
  return x._0;
}

var cmp = Caml_obj.compare;

var OnpingKeyComparable = Belt_Id.MakeComparableU({
      cmp: cmp
    });

function encodeOnpingDescription(x) {
  var v = Aeson_encode.beltMap(encodeOnpingKey, (function (prim) {
          return prim;
        }), x.descriptions);
  return Aeson_encode.object_({
              hd: [
                "descriptions",
                v
              ],
              tl: /* [] */0
            });
}

function encodePid(x) {
  return x._0;
}

var cmp$1 = Caml_obj.compare;

var PidComparable = Belt_Id.MakeComparableU({
      cmp: cmp$1
    });

Jest.test("null", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(null), null);
      }));

Jest.test("string", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect("foo"), "foo");
      }));

Jest.test("date - non-float time", (function () {
        var nowString = "2017-12-08T06:03:22Z";
        var now = new Date(nowString);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.date(now)), nowString);
      }));

Jest.test("date - float time", (function () {
        var nowString = "2017-12-08T06:03:22.123Z";
        var now = new Date(nowString);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.date(now)), nowString);
      }));

Jest.test("float", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(1.23), 1.23);
      }));

Jest.test("int", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(23), 23);
      }));

Jest.test("bigint", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.bigint(BigInt("38293829382888882338928"))), "38293829382888882338928");
      }));

Jest.test("bigint", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.bigint(BigInt("-38293829382888882338928"))), "-38293829382888882338928");
      }));

Jest.test("bool", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(true), true);
      }));

Jest.test("onpingKey string Belt.Map.t (encoded as array of tuples)", (function () {
        var arr = [
          [
            "a",
            "A"
          ],
          [
            "b",
            "B"
          ]
        ];
        var arrWithKey = arr.map(function (param) {
              return [
                      {
                        TAG: "OnpingKey",
                        _0: param[0]
                      },
                      param[1]
                    ];
            });
        var bm = Belt_Map.fromArray(arrWithKey, OnpingKeyComparable);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.beltMap(encodeOnpingKey, (function (prim) {
                              return prim;
                            }), bm)), arr);
      }));

Jest.test("onpingKey string Belt.Map.t (encoded as dictionary)", (function () {
        var arr = [
          [
            "a",
            "A"
          ],
          [
            "b",
            "B"
          ]
        ];
        var arrWithKey = arr.map(function (param) {
              return [
                      {
                        TAG: "OnpingKey",
                        _0: param[0]
                      },
                      param[1]
                    ];
            });
        var bm = Belt_Map.fromArray(arrWithKey, OnpingKeyComparable);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.beltMap1(encodeOnpingKey, (function (prim) {
                              return prim;
                            }), bm)), Js_dict.fromArray(arr));
      }));

Jest.test("pid string Belt.Map.t (encoded as array of tuples)", (function () {
        var arr = [
          [
            1,
            "A"
          ],
          [
            2,
            "B"
          ]
        ];
        var arrWithKey = arr.map(function (param) {
              return [
                      {
                        TAG: "Pid",
                        _0: param[0]
                      },
                      param[1]
                    ];
            });
        var bm = Belt_Map.fromArray(arrWithKey, PidComparable);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.beltMap(encodePid, (function (prim) {
                              return prim;
                            }), bm)), arr);
      }));

Jest.test("pid string Belt.Map.t (encoded as dictionary)", (function () {
        var arr = [
          [
            1,
            "A"
          ],
          [
            2,
            "B"
          ]
        ];
        var arrWithKey = arr.map(function (param) {
              return [
                      {
                        TAG: "Pid",
                        _0: param[0]
                      },
                      param[1]
                    ];
            });
        var bm = Belt_Map.fromArray(arrWithKey, PidComparable);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.beltMap1(encodePid, (function (prim) {
                              return prim;
                            }), bm)), Js_dict.fromArray(arr.map(function (param) {
                            return [
                                    String(param[0]),
                                    param[1]
                                  ];
                          })));
      }));

Jest.test("string Belt.Map.Int.t", (function () {
        var arr = [
          [
            1,
            "A"
          ],
          [
            2,
            "B"
          ]
        ];
        var bm = Belt_MapInt.fromArray(arr);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.beltMapInt((function (prim) {
                              return prim;
                            }), bm)), Js_dict.fromArray(arr.map(function (param) {
                            return [
                                    String(param[0]),
                                    param[1]
                                  ];
                          })));
      }));

Jest.test("string Belt.Map.String.t", (function () {
        var arr = [
          [
            "a",
            "A"
          ],
          [
            "b",
            "B"
          ]
        ];
        var bm = Belt_MapString.fromArray(arr);
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.beltMapString((function (prim) {
                              return prim;
                            }), bm)), Js_dict.fromArray(arr));
      }));

Jest.test("dict - empty", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect({}), {});
      }));

Jest.test("dict - simple", (function () {
        var o = {};
        o["x"] = 42;
        return Jest.Expect.toEqual(Jest.Expect.expect(o), o);
      }));

Jest.test("object_ - empty", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.object_(/* [] */0)), {});
      }));

Jest.test("object_ - simple", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              42
                            ],
                            tl: /* [] */0
                          })), Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("object_ - option", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              Aeson_encode.optional((function (prim) {
                                      return prim;
                                    }), 42)
                            ],
                            tl: /* [] */0
                          })), Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("object_ - option Some", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              Aeson_encode.optional((function (prim) {
                                      return prim;
                                    }), 42)
                            ],
                            tl: /* [] */0
                          })), Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("object_ - option None", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.object_({
                            hd: [
                              "x",
                              Aeson_encode.optional((function (prim) {
                                      return prim;
                                    }), undefined)
                            ],
                            tl: /* [] */0
                          })), Js_dict.fromList({
                        hd: [
                          "x",
                          null
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("object_ - optionalField Some", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.object_(Aeson_encode.optionalField("x", (function (prim) {
                                  return prim;
                                }), 42))), Js_dict.fromList({
                        hd: [
                          "x",
                          42
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("object_ - optionalField Some", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.object_(Aeson_encode.optionalField("x", (function (prim) {
                                  return prim;
                                }), undefined))), Js_dict.fromList(/* [] */0));
      }));

Jest.test("array int", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect([
                          1,
                          2,
                          3
                        ].map(function (prim) {
                            return prim;
                          })), [
                    1,
                    2,
                    3
                  ]);
      }));

Jest.test("list int", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.list((function (prim) {
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
                          })), [
                    1,
                    2,
                    3
                  ]);
      }));

Jest.test("singleEnumerator typeParameterRef0", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.singleEnumerator("SingleEnumerator")), []);
      }));

Jest.test("stringArray", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect([
                        "a",
                        "b"
                      ]), [
                    "a",
                    "b"
                  ]);
      }));

Jest.test("numberArray", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect([
                        0,
                        4
                      ]), [
                    0,
                    4
                  ]);
      }));

Jest.test("boolArray", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect([
                        true,
                        false
                      ]), [
                    true,
                    false
                  ]);
      }));

Jest.test("result", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: "Error",
                            _0: 123
                          })), Js_dict.fromList({
                        hd: [
                          "Error",
                          123
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("result", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.result((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: "Ok",
                            _0: "Good"
                          })), Js_dict.fromList({
                        hd: [
                          "Ok",
                          "Good"
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("either", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: "Left",
                            _0: 123
                          })), Js_dict.fromList({
                        hd: [
                          "Left",
                          123
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("either", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.either((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), {
                            TAG: "Right",
                            _0: "Good"
                          })), Js_dict.fromList({
                        hd: [
                          "Right",
                          "Good"
                        ],
                        tl: /* [] */0
                      }));
      }));

Jest.test("pair", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.pair((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a"
                          ])), JSON.parse(" [1, \"a\"] "));
      }));

Jest.test("tuple3", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple3((function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), (function (prim) {
                              return prim;
                            }), [
                            1,
                            "a",
                            false
                          ])), JSON.parse(" [1, \"a\", false] "));
      }));

Jest.test("tuple4", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple4((function (prim) {
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
                          ])), JSON.parse(" [1, \"a\", false, 2] "));
      }));

Jest.test("tuple5", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple5((function (prim) {
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
                          ])), JSON.parse(" [1, \"a\", false, 2, true] "));
      }));

Jest.test("tuple6", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple6((function (prim) {
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
                          ])), JSON.parse(" [1, \"a\", false, 2, true, \"loop\"] "));
      }));

Jest.test("tuple7", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple7((function (prim) {
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
                          ])), JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\"] "));
      }));

Jest.test("tuple8", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple8((function (prim) {
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
                          ])), JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33] "));
      }));

Jest.test("tuple9", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple9((function (prim) {
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
                          ])), JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33, \"blah\"] "));
      }));

Jest.test("tuple10", (function () {
        return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_encode.tuple10((function (prim) {
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
                          ])), JSON.parse(" [1, \"a\", false, 2, true, \"loop\", \"recursion\", 33, \"blah\", false] "));
      }));

exports.Test = Test;
exports.encodeOnpingKey = encodeOnpingKey;
exports.OnpingKeyComparable = OnpingKeyComparable;
exports.encodeOnpingDescription = encodeOnpingDescription;
exports.encodePid = encodePid;
exports.PidComparable = PidComparable;
/* OnpingKeyComparable Not a pure module */
