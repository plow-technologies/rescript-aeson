'use strict';

var U = require("bs-zarith/lib/js/src/U.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Bigint = require("bs-zarith/lib/js/src/Bigint.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function _isInteger(value) {
  if (isFinite(value)) {
    return Math.floor(value) === value;
  } else {
    return false;
  }
}

var DecodeError = Caml_exceptions.create("Aeson_decode.DecodeError");

function bool(json) {
  if (typeof json === "boolean") {
    return json;
  } else {
    throw [
          DecodeError,
          "Expected boolean, got " + JSON.stringify(json)
        ];
  }
}

function $$float(json) {
  if (typeof json === "number") {
    return json;
  } else {
    throw [
          DecodeError,
          "Expected number, got " + JSON.stringify(json)
        ];
  }
}

function $$int(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return f;
  } else {
    throw [
          DecodeError,
          "Expected int, got " + JSON.stringify(json)
        ];
  }
}

function int32(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return f;
  } else {
    throw [
          DecodeError,
          "Expected int32, got " + JSON.stringify(json)
        ];
  }
}

function nativeint(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return f;
  } else {
    throw [
          DecodeError,
          "Expected nativeint, got " + JSON.stringify(json)
        ];
  }
}

function string(json) {
  if (typeof json === "string") {
    return json;
  } else {
    throw [
          DecodeError,
          "Expected string, got " + JSON.stringify(json)
        ];
  }
}

function explode(s) {
  return List.init(s.length, (function (param) {
                return Caml_string.get(s, param);
              }));
}

function isDigit($$char) {
  if ($$char >= 48) {
    return $$char <= 57;
  } else {
    return false;
  }
}

function isStringOfDigits(s) {
  if (s.length === 0) {
    return false;
  } else {
    return List.fold_right((function (c, x) {
                  if (isDigit(c)) {
                    return x;
                  } else {
                    return false;
                  }
                }), explode(s), true);
  }
}

function uint8(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return U.UInt8.ofInt(f);
  } else {
    throw [
          DecodeError,
          "Expected int, got " + JSON.stringify(json)
        ];
  }
}

function uint16(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return U.UInt16.ofInt(f);
  } else {
    throw [
          DecodeError,
          "Expected int, got " + JSON.stringify(json)
        ];
  }
}

function uint32(json) {
  var v;
  try {
    v = $$int(json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      throw [
            DecodeError,
            "Expected U.UInt32.t, got " + JSON.stringify(json)
          ];
    }
    throw exn;
  }
  return U.UInt32.ofInt(v);
}

function uint64(json) {
  if (typeof json === "string") {
    var match = U.UInt64.ofString(json);
    if (match !== undefined) {
      return match;
    } else {
      throw [
            DecodeError,
            "Expected U.UInt64.t, got " + json
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected U.UInt64.t, got " + JSON.stringify(json)
        ];
  }
}

function int64_of_string(json) {
  if (typeof json === "string") {
    if (isStringOfDigits(json)) {
      return Caml_format.caml_int64_of_string(json);
    } else {
      throw [
            DecodeError,
            "Expected int64, got " + json
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected int64, got " + JSON.stringify(json)
        ];
  }
}

function bigint(json) {
  if (typeof json === "string") {
    if (isStringOfDigits(json)) {
      return Bigint.of_string(json);
    } else {
      throw [
            DecodeError,
            "Expected Bigint.t, got " + json
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected Bigint.t, got " + JSON.stringify(json)
        ];
  }
}

function date(json) {
  if (typeof json === "string") {
    var encodedDate = new Date(json);
    if (isNaN(encodedDate.getTime())) {
      throw [
            DecodeError,
            "Expected date, got " + json
          ];
    }
    return encodedDate;
  } else {
    throw [
          DecodeError,
          "Expected date, got " + JSON.stringify(json)
        ];
  }
}

function nullable(decode, json) {
  if (json === null) {
    return null;
  } else {
    return Curry._1(decode, json);
  }
}

function nullAs(value, json) {
  if (json === null) {
    return value;
  } else {
    throw [
          DecodeError,
          "Expected null, got " + JSON.stringify(json)
        ];
  }
}

function array(decode, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    var target = new Array(length);
    for(var i = 0 ,i_finish = length - 1 | 0; i <= i_finish; ++i){
      var value = Curry._1(decode, json[i]);
      target[i] = value;
    }
    return target;
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function list(decode, json) {
  return $$Array.to_list(array(decode, json));
}

function pair(left, right, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 2) {
      return /* tuple */[
              Curry._1(left, json[0]),
              Curry._1(right, json[1])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 2, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple3(first, second, third, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 3) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 3, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple4(first, second, third, fourth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 4) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 4, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple5(first, second, third, fourth, fifth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 5) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 5, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple6(first, second, third, fourth, fifth, sixth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 6) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 6, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple7(first, second, third, fourth, fifth, sixth, seventh, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 7) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5]),
              Curry._1(seventh, json[6])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 7, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple8(first, second, third, fourth, fifth, sixth, seventh, eighth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 8) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5]),
              Curry._1(seventh, json[6]),
              Curry._1(eighth, json[7])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 8, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple9(first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 9) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5]),
              Curry._1(seventh, json[6]),
              Curry._1(eighth, json[7]),
              Curry._1(ninth, json[8])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 9, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function tuple10(first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 10) {
      return /* tuple */[
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5]),
              Curry._1(seventh, json[6]),
              Curry._1(eighth, json[7]),
              Curry._1(ninth, json[8]),
              Curry._1(tenth, json[9])
            ];
    } else {
      throw [
            DecodeError,
            "Expected array of length 10, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function singleEnumerator(a, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 0) {
      return a;
    } else {
      throw [
            DecodeError,
            "Expected array of length 0, got array of length " + (String(length) + "")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function dict(decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var keys = Object.keys(json);
    var l = keys.length;
    var target = { };
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      var key = keys[i];
      var value = Curry._1(decode, json[key]);
      target[key] = value;
    }
    return target;
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function field(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var match = Js_dict.get(json, key);
    if (match !== undefined) {
      return Curry._1(decode, Caml_option.valFromOption(match));
    } else {
      throw [
            DecodeError,
            "Expected field \'" + (String(key) + "\'")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function optionalField(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var match = Js_dict.get(json, key);
    if (match !== undefined) {
      return Caml_option.some(Curry._1(decode, Caml_option.valFromOption(match)));
    } else {
      return ;
    }
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function at(key_path, decoder) {
  if (key_path) {
    var rest = key_path[1];
    var key = key_path[0];
    if (rest) {
      var partial_arg = at(rest, decoder);
      return (function (param) {
          return field(key, partial_arg, param);
        });
    } else {
      return (function (param) {
          return field(key, decoder, param);
        });
    }
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Expected key_path to contain at least one element"
        ];
  }
}

function optional(decode, json) {
  var v;
  try {
    v = Curry._1(decode, json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      return ;
    } else {
      throw exn;
    }
  }
  return Caml_option.some(v);
}

function result(decodeA, decodeB, json) {
  var match = Js_json.decodeObject(json);
  if (match !== undefined) {
    var o = Caml_option.valFromOption(match);
    var match$1 = Js_dict.get(o, "Ok");
    if (match$1 !== undefined) {
      return /* Ok */Block.__(0, [Curry._1(decodeA, Caml_option.valFromOption(match$1))]);
    } else {
      var match$2 = Js_dict.get(o, "Error");
      if (match$2 !== undefined) {
        return /* Error */Block.__(1, [Curry._1(decodeB, Caml_option.valFromOption(match$2))]);
      } else {
        throw [
              DecodeError,
              "Expected object with a \"Ok\" key or \"Error\" key, got " + JSON.stringify(json)
            ];
      }
    }
  } else {
    throw [
          DecodeError,
          "Expected object with a \"Ok\" key or \"Error\" key, got " + JSON.stringify(json)
        ];
  }
}

function either(decodeL, decodeR, json) {
  var match = Js_json.decodeObject(json);
  if (match !== undefined) {
    var o = Caml_option.valFromOption(match);
    var match$1 = Js_dict.get(o, "Left");
    if (match$1 !== undefined) {
      return /* Left */Block.__(0, [Curry._1(decodeL, Caml_option.valFromOption(match$1))]);
    } else {
      var match$2 = Js_dict.get(o, "Right");
      if (match$2 !== undefined) {
        return /* Right */Block.__(1, [Curry._1(decodeR, Caml_option.valFromOption(match$2))]);
      } else {
        throw [
              DecodeError,
              "Expected object with a \"Left\" key or \"Right\" key, got " + JSON.stringify(json)
            ];
      }
    }
  } else {
    throw [
          DecodeError,
          "Expected object with a \"Left\" key or \"Right\" key, got " + JSON.stringify(json)
        ];
  }
}

function oneOf(_decoders, json) {
  while(true) {
    var decoders = _decoders;
    if (decoders) {
      try {
        return Curry._1(decoders[0], json);
      }
      catch (exn){
        _decoders = decoders[1];
        continue ;
      }
    } else {
      var length = List.length(decoders);
      throw [
            DecodeError,
            "Expected oneOf " + (String(length) + ", got ") + JSON.stringify(json)
          ];
    }
  };
}

function tryEither(a, b) {
  var partial_arg_001 = /* :: */[
    b,
    /* [] */0
  ];
  var partial_arg = /* :: */[
    a,
    partial_arg_001
  ];
  return (function (param) {
      return oneOf(partial_arg, param);
    });
}

function withDefault($$default, decode, json) {
  try {
    return Curry._1(decode, json);
  }
  catch (exn){
    return $$default;
  }
}

function map(f, decode, json) {
  return Curry._1(f, Curry._1(decode, json));
}

function andThen(b, a, json) {
  return Curry._2(b, Curry._1(a, json), json);
}

function unwrapResult(r) {
  if (r.tag) {
    throw [
          DecodeError,
          r[0]
        ];
  } else {
    return r[0];
  }
}

function wrapResult(decoder, json) {
  var v;
  try {
    v = Curry._1(decoder, json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      return /* Error */Block.__(1, [exn[1]]);
    } else {
      throw exn;
    }
  }
  return /* Ok */Block.__(0, [v]);
}

function int64_of_array(json) {
  var fs = array($$float, json);
  if (fs.length === 2) {
    if (_isInteger(Caml_array.caml_array_get(fs, 0)) && _isInteger(Caml_array.caml_array_get(fs, 1))) {
      var left = Caml_array.caml_array_get(fs, 0);
      var right = Caml_array.caml_array_get(fs, 1);
      var res = Caml_int64.of_int32(left);
      var res$1 = Caml_int64.lsl_(res, 32);
      return Caml_int64.or_(res$1, Caml_int64.of_int32(right));
    } else {
      throw [
            DecodeError,
            "Expected int64, got " + JSON.stringify(json)
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected int64, got " + JSON.stringify(json)
        ];
  }
}

function int64(json) {
  var s;
  try {
    s = string(json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      var exit = 0;
      var s$1;
      try {
        s$1 = string(JSON.stringify(json));
        exit = 2;
      }
      catch (raw_exn$1){
        var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
        if (exn$1[0] === DecodeError) {
          throw [
                DecodeError,
                "Expected int64 as string, got " + JSON.stringify(json)
              ];
        }
        throw exn$1;
      }
      if (exit === 2) {
        return Caml_format.caml_int64_of_string(s$1);
      }
      
    } else {
      throw exn;
    }
  }
  return Caml_format.caml_int64_of_string(s);
}

var tuple2 = pair;

exports.DecodeError = DecodeError;
exports.bool = bool;
exports.$$float = $$float;
exports.$$int = $$int;
exports.int32 = int32;
exports.int64 = int64;
exports.int64_of_array = int64_of_array;
exports.int64_of_string = int64_of_string;
exports.nativeint = nativeint;
exports.uint8 = uint8;
exports.uint16 = uint16;
exports.uint32 = uint32;
exports.uint64 = uint64;
exports.bigint = bigint;
exports.string = string;
exports.date = date;
exports.nullable = nullable;
exports.nullAs = nullAs;
exports.array = array;
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
exports.singleEnumerator = singleEnumerator;
exports.dict = dict;
exports.field = field;
exports.optionalField = optionalField;
exports.at = at;
exports.optional = optional;
exports.result = result;
exports.either = either;
exports.oneOf = oneOf;
exports.tryEither = tryEither;
exports.withDefault = withDefault;
exports.map = map;
exports.andThen = andThen;
exports.unwrapResult = unwrapResult;
exports.wrapResult = wrapResult;
/* U Not a pure module */
