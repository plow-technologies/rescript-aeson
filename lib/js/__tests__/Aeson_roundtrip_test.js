'use strict';

var Jest = require("@glennsl/rescript-jest/lib/js/src/jest.js");
var Belt_Id = require("rescript/lib/js/belt_Id.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Core__List = require("@rescript/core/lib/js/src/Core__List.js");
var Aeson_decode = require("../src/Aeson_decode.js");
var Aeson_encode = require("../src/Aeson_encode.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function resultMap(f, r) {
  if (r.TAG === "Ok") {
    return {
            TAG: "Ok",
            _0: f(r._0)
          };
  } else {
    return {
            TAG: "Error",
            _0: r._0
          };
  }
}

function jsonRoundtripSpec(decode, encode, json) {
  var rDecoded = decode(json);
  return Jest.Expect.toEqual(Jest.Expect.expect(resultMap(encode, rDecoded)), {
              TAG: "Ok",
              _0: json
            });
}

function cmp(a, b) {
  return Caml_obj.compare(a._0, b._0);
}

var PairKeyComparable = Belt_Id.MakeComparableU({
      cmp: cmp
    });

function encodePairKey(x) {
  return Aeson_encode.pair((function (prim) {
                return prim;
              }), (function (prim) {
                return prim;
              }), x._0);
}

function decodePairKey(json) {
  var v;
  try {
    v = Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.string, json);
  }
  catch (raw_msg){
    var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);
    if (msg.RE_EXN_ID === Aeson_decode.DecodeError) {
      return {
              TAG: "Error",
              _0: "decodePairKey: " + msg._1
            };
    }
    throw msg;
  }
  return {
          TAG: "Ok",
          _0: {
            TAG: "PairKey",
            _0: v
          }
        };
}

function encodePairKeyMap(x) {
  return Aeson_encode.object_({
              hd: [
                "pairKeyMap",
                Aeson_encode.beltMap(encodePairKey, (function (prim) {
                        return prim;
                      }), x.pairKeyMap)
              ],
              tl: /* [] */0
            });
}

function decodePairKeyMap(json) {
  var v;
  try {
    v = {
      pairKeyMap: Aeson_decode.field("pairKeyMap", (function (x) {
              return Aeson_decode.beltMap((function (a) {
                            return Aeson_decode.unwrapResult(decodePairKey(a));
                          }), Aeson_decode.string, PairKeyComparable, x);
            }), json)
    };
  }
  catch (raw_msg){
    var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);
    if (msg.RE_EXN_ID === Aeson_decode.DecodeError) {
      return {
              TAG: "Error",
              _0: "decodePairKey: " + msg._1
            };
    }
    throw msg;
  }
  return {
          TAG: "Ok",
          _0: v
        };
}

Jest.describe("encodeArray", (function () {
        Jest.test("encodeArray with int", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array(Aeson_decode.$$int, j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray((function (prim) {
                                            return prim;
                                          }), arr);
                            }), JSON.parse("[1, 2, 3, 4, 5]"));
              }));
        Jest.test("encodeArray with string", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array(Aeson_decode.string, j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray((function (prim) {
                                            return prim;
                                          }), arr);
                            }), JSON.parse("[\"hello\", \"world\", \"test\"]"));
              }));
        Jest.test("encodeArray with bool", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array(Aeson_decode.bool, j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray((function (prim) {
                                            return prim;
                                          }), arr);
                            }), JSON.parse("[true, false, true, true, false]"));
              }));
        Jest.test("encodeArray with float", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array(Aeson_decode.$$float, j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray(Aeson_encode.$$float, arr);
                            }), JSON.parse("[1.5, 2.7, 3.14159, 42.0]"));
              }));
        Jest.test("encodeArray with nested arrays", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array((function (json) {
                                                          return Aeson_decode.array(Aeson_decode.$$int, json);
                                                        }), j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray((function (innerArr) {
                                            return Aeson_encode.encodeArray((function (prim) {
                                                          return prim;
                                                        }), innerArr);
                                          }), arr);
                            }), JSON.parse("[[1, 2], [3, 4, 5], [], [6]]"));
              }));
        Jest.test("encodeArray with objects", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array((function (json) {
                                                          return Aeson_decode.dict(Aeson_decode.string, json);
                                                        }), j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray((function (dict) {
                                            return Aeson_encode.object_(Core__List.fromArray(Js_dict.entries(dict).map(function (param) {
                                                                return [
                                                                        param[0],
                                                                        param[1]
                                                                      ];
                                                              })));
                                          }), arr);
                            }), JSON.parse("[{\"name\": \"Alice\", \"role\": \"dev\"}, {\"name\": \"Bob\", \"role\": \"admin\"}]"));
              }));
        Jest.test("encodeArray with optional values", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array((function (json) {
                                                          return Aeson_decode.optional(Aeson_decode.$$int, json);
                                                        }), j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray((function (val) {
                                            return Aeson_encode.nullable((function (prim) {
                                                          return prim;
                                                        }), val);
                                          }), arr);
                            }), JSON.parse("[1, null, 3, null, 5]"));
              }));
        Jest.test("empty encodeArray", (function () {
                return jsonRoundtripSpec((function (json) {
                              return Aeson_decode.wrapResult((function (j) {
                                            return Aeson_decode.array(Aeson_decode.$$int, j);
                                          }), json);
                            }), (function (arr) {
                              return Aeson_encode.encodeArray((function (prim) {
                                            return prim;
                                          }), arr);
                            }), JSON.parse("[]"));
              }));
      }));

Jest.describe("Belt.Map.String.t", (function () {
        Jest.test("string key map", (function () {
                return jsonRoundtripSpec((function (y) {
                              return Aeson_decode.wrapResult((function (x) {
                                            return Aeson_decode.beltMapString(Aeson_decode.string, x);
                                          }), y);
                            }), (function (x) {
                              return Aeson_encode.beltMapString((function (prim) {
                                            return prim;
                                          }), x);
                            }), JSON.parse("{\"a\":\"A\",\"b\":\"B\"}"));
              }));
      }));

Jest.describe("Belt.Map.Int.t", (function () {
        Jest.test("int key map", (function () {
                return jsonRoundtripSpec((function (y) {
                              return Aeson_decode.wrapResult((function (x) {
                                            return Aeson_decode.beltMapInt(Aeson_decode.string, x);
                                          }), y);
                            }), (function (x) {
                              return Aeson_encode.beltMapInt((function (prim) {
                                            return prim;
                                          }), x);
                            }), JSON.parse("{\"1\":\"A\",\"2\":\"B\"}"));
              }));
      }));

Jest.describe("(pairKey, string, PairKeyComparable.identity) Belt.Map.t", (function () {
        Jest.test("custom key map", (function () {
                return jsonRoundtripSpec(decodePairKeyMap, encodePairKeyMap, JSON.parse("{\"pairKeyMap\":[[[0,\"a\"],\"A\"],[[1,\"b\"],\"B\"]]}"));
              }));
      }));

exports.resultMap = resultMap;
exports.jsonRoundtripSpec = jsonRoundtripSpec;
exports.PairKeyComparable = PairKeyComparable;
exports.encodePairKey = encodePairKey;
exports.decodePairKey = decodePairKey;
exports.encodePairKeyMap = encodePairKeyMap;
exports.decodePairKeyMap = decodePairKeyMap;
/* PairKeyComparable Not a pure module */
