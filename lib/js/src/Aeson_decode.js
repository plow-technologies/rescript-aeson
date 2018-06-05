'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
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

function date(json) {
  if (typeof json === "string") {
    var encodedDate = new Date(json);
    if (isNaN(encodedDate.getTime())) {
      throw [
            DecodeError,
            "Expected date, got " + json
          ];
    } else {
      return encodedDate;
    }
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
    if (length === 5) {
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
    var match = json[key];
    if (match !== undefined) {
      return Curry._1(decode, match);
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
  var exit = 0;
  var v;
  try {
    v = Curry._1(decode, json);
    exit = 1;
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      return /* None */0;
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    return /* Some */[v];
  }
  
}

function result(decodeA, decodeB, json) {
  var match = Js_json.decodeObject(json);
  if (match) {
    var o = match[0];
    var match$1 = o["Ok"];
    if (match$1 !== undefined) {
      return /* Ok */Block.__(0, [Curry._1(decodeA, match$1)]);
    } else {
      var match$2 = o["Error"];
      if (match$2 !== undefined) {
        return /* Error */Block.__(1, [Curry._1(decodeB, match$2)]);
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
  if (match) {
    var o = match[0];
    var match$1 = o["Left"];
    if (match$1 !== undefined) {
      return /* Left */Block.__(0, [Curry._1(decodeL, match$1)]);
    } else {
      var match$2 = o["Right"];
      if (match$2 !== undefined) {
        return /* Right */Block.__(1, [Curry._1(decodeR, match$2)]);
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
  var exit = 0;
  var v;
  try {
    v = Curry._1(decoder, json);
    exit = 1;
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      return /* Error */Block.__(1, [exn[1]]);
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    return /* Ok */Block.__(0, [v]);
  }
  
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
  var exit = 0;
  var s;
  try {
    s = string(json);
    exit = 1;
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      var exit$1 = 0;
      var s$1;
      try {
        s$1 = string(JSON.stringify(json));
        exit$1 = 2;
      }
      catch (raw_exn$1){
        var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
        if (exn$1[0] === DecodeError) {
          throw [
                DecodeError,
                "Expected int64 as string, got " + JSON.stringify(json)
              ];
        } else {
          throw exn$1;
        }
      }
      if (exit$1 === 2) {
        return Caml_format.caml_int64_of_string(s$1);
      }
      
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    return Caml_format.caml_int64_of_string(s);
  }
  
}

var tuple2 = pair;

exports.DecodeError = DecodeError;
exports.bool = bool;
exports.$$float = $$float;
exports.$$int = $$int;
exports.int32 = int32;
exports.int64 = int64;
exports.int64_of_array = int64_of_array;
exports.nativeint = nativeint;
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
exports.singleEnumerator = singleEnumerator;
exports.dict = dict;
exports.field = field;
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
/* No side effect */
