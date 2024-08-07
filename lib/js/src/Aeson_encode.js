'use strict';

var Js_dict = require("rescript/lib/js/js_dict.js");
var Js_json = require("rescript/lib/js/js_json.js");
var Belt_Map = require("rescript/lib/js/belt_Map.js");
var Js_string = require("rescript/lib/js/js_string.js");
var Core__List = require("@rescript/core/lib/js/src/Core__List.js");
var Belt_MapInt = require("rescript/lib/js/belt_MapInt.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Belt_MapString = require("rescript/lib/js/belt_MapString.js");

function bigint(x) {
  return x.toString();
}

function nullable(encode, x) {
  if (x !== undefined) {
    return encode(Caml_option.valFromOption(x));
  } else {
    return null;
  }
}

function withDefault(d, encode, x) {
  if (x !== undefined) {
    return encode(Caml_option.valFromOption(x));
  } else {
    return d;
  }
}

function optional(encode, optionalValue) {
  if (optionalValue !== undefined) {
    return encode(Caml_option.valFromOption(optionalValue));
  } else {
    return null;
  }
}

function optionalField(fieldName, encode, optionalValue) {
  if (optionalValue !== undefined) {
    return {
            hd: [
              fieldName,
              encode(Caml_option.valFromOption(optionalValue))
            ],
            tl: /* [] */0
          };
  } else {
    return /* [] */0;
  }
}

function date(d) {
  return Js_string.replace(".000Z", "Z", d.toISOString());
}

var object_ = Js_dict.fromList;

function list(encode, l) {
  return Core__List.toArray(Core__List.map(l, (function (x) {
                    return encode(x);
                  })));
}

function pair(encodeT0, encodeT1, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1])
        ];
}

function beltMap(encodeKey, encodeValue, obj) {
  return list((function (extra) {
                return pair(encodeKey, encodeValue, extra);
              }), Core__List.fromArray(Belt_Map.toArray(obj)));
}

function beltMap1(encodeKey, encodeValue, obj) {
  var xs = Belt_Map.toArray(obj);
  var encodeKey1 = function (key) {
    var str = Js_json.classify(encodeKey(key));
    if (typeof str !== "object" || str.TAG !== "JSONString") {
      return JSON.stringify(encodeKey(key));
    } else {
      return str._0;
    }
  };
  var xs$1 = xs.map(function (param) {
        return [
                encodeKey1(param[0]),
                encodeValue(param[1])
              ];
      });
  return Js_dict.fromList(Core__List.fromArray(xs$1));
}

function beltMapInt(encodeValue, obj) {
  return Js_dict.fromList(Core__List.map(Core__List.fromArray(Belt_MapInt.toArray(obj)), (function (param) {
                    return [
                            String(param[0]),
                            encodeValue(param[1])
                          ];
                  })));
}

function beltMapString(encodeValue, obj) {
  return Js_dict.fromList(Core__List.map(Core__List.fromArray(Belt_MapString.toArray(obj)), (function (param) {
                    return [
                            param[0],
                            encodeValue(param[1])
                          ];
                  })));
}

function tuple3(encodeT0, encodeT1, encodeT2, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2])
        ];
}

function tuple4(encodeT0, encodeT1, encodeT2, encodeT3, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2]),
          encodeT3(tuple[3])
        ];
}

function tuple5(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2]),
          encodeT3(tuple[3]),
          encodeT4(tuple[4])
        ];
}

function tuple6(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2]),
          encodeT3(tuple[3]),
          encodeT4(tuple[4]),
          encodeT5(tuple[5])
        ];
}

function tuple7(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, encodeT6, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2]),
          encodeT3(tuple[3]),
          encodeT4(tuple[4]),
          encodeT5(tuple[5]),
          encodeT6(tuple[6])
        ];
}

function tuple8(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, encodeT6, encodeT7, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2]),
          encodeT3(tuple[3]),
          encodeT4(tuple[4]),
          encodeT5(tuple[5]),
          encodeT6(tuple[6]),
          encodeT7(tuple[7])
        ];
}

function tuple9(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, encodeT6, encodeT7, encodeT8, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2]),
          encodeT3(tuple[3]),
          encodeT4(tuple[4]),
          encodeT5(tuple[5]),
          encodeT6(tuple[6]),
          encodeT7(tuple[7]),
          encodeT8(tuple[8])
        ];
}

function tuple10(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, encodeT6, encodeT7, encodeT8, encodeT9, tuple) {
  return [
          encodeT0(tuple[0]),
          encodeT1(tuple[1]),
          encodeT2(tuple[2]),
          encodeT3(tuple[3]),
          encodeT4(tuple[4]),
          encodeT5(tuple[5]),
          encodeT6(tuple[6]),
          encodeT7(tuple[7]),
          encodeT8(tuple[8]),
          encodeT9(tuple[9])
        ];
}

function result(encodeA, encodeB, e) {
  if (e.TAG === "Ok") {
    return Js_dict.fromList({
                hd: [
                  "Ok",
                  encodeA(e._0)
                ],
                tl: /* [] */0
              });
  } else {
    return Js_dict.fromList({
                hd: [
                  "Error",
                  encodeB(e._0)
                ],
                tl: /* [] */0
              });
  }
}

function either(encodeL, encodeR, e) {
  if (e.TAG === "Left") {
    return Js_dict.fromList({
                hd: [
                  "Left",
                  encodeL(e._0)
                ],
                tl: /* [] */0
              });
  } else {
    return Js_dict.fromList({
                hd: [
                  "Right",
                  encodeR(e._0)
                ],
                tl: /* [] */0
              });
  }
}

function singleEnumerator(_x) {
  return [];
}

var tuple2 = pair;

exports.bigint = bigint;
exports.nullable = nullable;
exports.withDefault = withDefault;
exports.object_ = object_;
exports.optional = optional;
exports.optionalField = optionalField;
exports.date = date;
exports.beltMap = beltMap;
exports.beltMap1 = beltMap1;
exports.beltMapInt = beltMapInt;
exports.beltMapString = beltMapString;
exports.list = list;
exports.pair = pair;
exports.tuple2 = tuple2;
exports.tuple3 = tuple3;
exports.tuple4 = tuple4;
exports.tuple5 = tuple5;
exports.tuple6 = tuple6;
exports.tuple7 = tuple7;
exports.tuple8 = tuple8;
exports.tuple9 = tuple9;
exports.tuple10 = tuple10;
exports.result = result;
exports.either = either;
exports.singleEnumerator = singleEnumerator;
/* No side effect */
