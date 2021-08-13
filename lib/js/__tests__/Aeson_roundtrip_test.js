'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Aeson_decode = require("../src/Aeson_decode.js");
var Aeson_encode = require("../src/Aeson_encode.js");

function resultMap(f, r) {
  if (r.TAG === /* Ok */0) {
    return {
            TAG: /* Ok */0,
            _0: Curry._1(f, r._0)
          };
  } else {
    return {
            TAG: /* Error */1,
            _0: r._0
          };
  }
}

function jsonRoundtripSpec(decode, encode, json) {
  var rDecoded = Curry._1(decode, json);
  return Jest.Expect.toEqual({
              TAG: /* Ok */0,
              _0: json
            }, Jest.Expect.expect(resultMap(encode, rDecoded)));
}

Jest.describe("Belt.Map.String.t", (function (param) {
        return Jest.test("simple map", (function (param) {
                      return jsonRoundtripSpec((function (param) {
                                    return Aeson_decode.wrapResult((function (param) {
                                                  return Aeson_decode.beltMapString(Aeson_decode.string, param);
                                                }), param);
                                  }), (function (param) {
                                    return Aeson_encode.beltMapString((function (prim) {
                                                  return prim;
                                                }), param);
                                  }), JSON.parse("{\"a\":\"A\",\"b\":\"B\"}"));
                    }));
      }));

Jest.describe("Belt.Map.Int.t", (function (param) {
        return Jest.test("simple map", (function (param) {
                      return jsonRoundtripSpec((function (param) {
                                    return Aeson_decode.wrapResult((function (param) {
                                                  return Aeson_decode.beltMapInt(Aeson_decode.string, param);
                                                }), param);
                                  }), (function (param) {
                                    return Aeson_encode.beltMapInt((function (prim) {
                                                  return prim;
                                                }), param);
                                  }), JSON.parse("{\"1\":\"A\",\"2\":\"B\"}"));
                    }));
      }));

exports.resultMap = resultMap;
exports.jsonRoundtripSpec = jsonRoundtripSpec;
/*  Not a pure module */
