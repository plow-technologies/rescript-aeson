'use strict';

var Jest = require("@glennsl/rescript-jest/lib/js/src/jest.js");
var Belt_Id = require("rescript/lib/js/belt_Id.js");
var Caml_obj = require("rescript/lib/js/caml_obj.js");
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
