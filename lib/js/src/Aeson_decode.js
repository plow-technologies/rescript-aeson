'use strict';

var U = require("bs-zarith/lib/js/src/U.js");
var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Js_json = require("rescript/lib/js/js_json.js");
var Belt_Int = require("rescript/lib/js/belt_Int.js");
var Belt_Map = require("rescript/lib/js/belt_Map.js");
var Js_array = require("rescript/lib/js/js_array.js");
var Caml_int64 = require("rescript/lib/js/caml_int64.js");
var Core__List = require("@rescript/core/lib/js/src/Core__List.js");
var Belt_MapInt = require("rescript/lib/js/belt_MapInt.js");
var Caml_format = require("rescript/lib/js/caml_format.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Core__Array = require("@rescript/core/lib/js/src/Core__Array.js");
var Belt_MapString = require("rescript/lib/js/belt_MapString.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function _isInteger(value) {
  if (Number.isFinite(value)) {
    return Math.floor(value) === value;
  } else {
    return false;
  }
}

var DecodeError = /* @__PURE__ */Caml_exceptions.create("Aeson_decode.DecodeError");

function unwrapResult(r) {
  if (r.TAG === /* Ok */0) {
    return r._0;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: r._0,
        Error: new Error()
      };
}

function wrapResult(decoder, json) {
  var v;
  try {
    v = Curry._1(decoder, json);
  }
  catch (raw_message){
    var message = Caml_js_exceptions.internalToOCamlException(raw_message);
    if (message.RE_EXN_ID === DecodeError) {
      return {
              TAG: /* Error */1,
              _0: message._1
            };
    }
    throw message;
  }
  return {
          TAG: /* Ok */0,
          _0: v
        };
}

function bool(json) {
  if (typeof json === "boolean") {
    return json;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected boolean, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function isStringOfDigits(s) {
  if (s.length === 0) {
    return false;
  }
  var chars = s.length > 1 && s.charAt(0) === "-" ? s.slice(1) : s;
  var mCharCodes = Core__Array.fromInitializer(chars.length, (function (i) {
          return chars.codePointAt(i);
        }));
  return Core__Array.reduce(mCharCodes, true, (function (acc, c) {
                if (acc) {
                  if (c !== undefined && c >= 48) {
                    return c <= 57;
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              }));
}

function $$float(json) {
  if (typeof json === "number") {
    return json;
  }
  if (typeof json === "string") {
    switch (json) {
      case "-Infinity" :
      case "-inf" :
          return Number("-Infinity");
      case "+Infinity" :
      case "+inf" :
      case "Infinity" :
          return Number("Infinity");
      default:
        throw {
              RE_EXN_ID: DecodeError,
              _1: "Expected \"+inf\" or \"-inf\", got " + JSON.stringify(json),
              Error: new Error()
            };
    }
  } else {
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected number, got " + JSON.stringify(json),
          Error: new Error()
        };
  }
}

function $$int(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return f;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected int, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function int32(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return f;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected int32, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function uint8(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return U.UInt8.ofInt(f);
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected int, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function uint16(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return U.UInt16.ofInt(f);
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected int, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function uint32(json) {
  var v;
  try {
    v = $$int(json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === DecodeError) {
      throw {
            RE_EXN_ID: DecodeError,
            _1: "Expected U.UInt32.t, got " + JSON.stringify(json),
            Error: new Error()
          };
    }
    throw exn;
  }
  return U.UInt32.ofInt(v);
}

function uint64(json) {
  if (typeof json === "string") {
    var s = U.UInt64.ofString(json);
    if (s !== undefined) {
      return s;
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected U.UInt64.t, got " + json,
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected U.UInt64.t, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function int64_of_string(json) {
  if (typeof json === "string") {
    if (isStringOfDigits(json)) {
      return Caml_format.int64_of_string(json);
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected int64, got " + json,
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected int64, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function string(json) {
  if (typeof json === "string") {
    return json;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected string, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function bigint(json) {
  if (typeof json === "string") {
    try {
      return BigInt(json);
    }
    catch (raw__error){
      var _error = Caml_js_exceptions.internalToOCamlException(raw__error);
      if (_error.RE_EXN_ID === Js_exn.$$Error) {
        throw {
              RE_EXN_ID: DecodeError,
              _1: "Expected bigint, got " + json,
              Error: new Error()
            };
      }
      throw _error;
    }
  } else {
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected bigint, got " + JSON.stringify(json),
          Error: new Error()
        };
  }
}

function date(json) {
  if (typeof json === "string") {
    var encodedDate = new Date(json);
    if (Number.isNaN(encodedDate.getTime())) {
      throw {
            RE_EXN_ID: DecodeError,
            _1: "Expected date, got " + json,
            Error: new Error()
          };
    }
    return encodedDate;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected date, got " + JSON.stringify(json),
        Error: new Error()
      };
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
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected null, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function array(decode, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    var target = new Array(length);
    for(var i = 0; i < length; ++i){
      var value = Curry._1(decode, json[i]);
      target[i] = value;
    }
    return target;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function list(decode, json) {
  return Core__List.fromArray(array(decode, json));
}

function pair(left, right, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 2) {
      return [
              Curry._1(left, json[0]),
              Curry._1(right, json[1])
            ];
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 2, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple3(first, second, third, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 3) {
      return [
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2])
            ];
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 3, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple4(first, second, third, fourth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 4) {
      return [
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3])
            ];
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 4, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple5(first, second, third, fourth, fifth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 5) {
      return [
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4])
            ];
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 5, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple6(first, second, third, fourth, fifth, sixth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 6) {
      return [
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5])
            ];
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 6, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple7(first, second, third, fourth, fifth, sixth, seventh, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 7) {
      return [
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5]),
              Curry._1(seventh, json[6])
            ];
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 7, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple8(first, second, third, fourth, fifth, sixth, seventh, eighth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 8) {
      return [
              Curry._1(first, json[0]),
              Curry._1(second, json[1]),
              Curry._1(third, json[2]),
              Curry._1(fourth, json[3]),
              Curry._1(fifth, json[4]),
              Curry._1(sixth, json[5]),
              Curry._1(seventh, json[6]),
              Curry._1(eighth, json[7])
            ];
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 8, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple9(first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 9) {
      return [
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
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 9, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function tuple10(first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 10) {
      return [
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
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 10, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function singleEnumerator(a, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    if (length === 0) {
      return a;
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected array of length 0, got array of length " + length.toString() + "",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected array, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function dict(decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var keys = Object.keys(json);
    var l = keys.length;
    var target = {};
    for(var i = 0; i < l; ++i){
      var key = keys[i];
      var value = Curry._1(decode, json[key]);
      target[key] = value;
    }
    return target;
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected object, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function has_some(mas) {
  var count = Core__Array.reduce(mas, 0, (function (acc, param) {
          if (param[0] !== undefined) {
            return acc;
          } else {
            return acc + 1 | 0;
          }
        }));
  return count > 0;
}

function beltMap(decodeKey, decodeValue, id, json) {
  var decoded_array;
  try {
    decoded_array = array((function (x) {
            return pair(decodeKey, decodeValue, x);
          }), json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === DecodeError) {
      var exit = 0;
      var decoded_dict;
      try {
        decoded_dict = dict(decodeValue, json);
        exit = 2;
      }
      catch (raw_exn$1){
        var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
        if (exn$1.RE_EXN_ID === DecodeError) {
          throw {
                RE_EXN_ID: DecodeError,
                _1: "Expected an array of tuples or dictionary of object with string key",
                Error: new Error()
              };
        }
        throw exn$1;
      }
      if (exit === 2) {
        var entries = Js_dict.entries(decoded_dict);
        var entries$1 = Js_array.map((function (param) {
                var k = param[0];
                var key;
                try {
                  key = Curry._1(decodeKey, k);
                }
                catch (raw_err){
                  var err = Caml_js_exceptions.internalToOCamlException(raw_err);
                  if (err.RE_EXN_ID === DecodeError) {
                    var key$1 = Belt_Int.fromString(k);
                    if (key$1 !== undefined) {
                      try {
                        key = Curry._1(decodeKey, key$1);
                      }
                      catch (raw_exn){
                        var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                        if (exn.RE_EXN_ID === DecodeError) {
                          throw {
                                RE_EXN_ID: DecodeError,
                                _1: "Object key must be a string",
                                Error: new Error()
                              };
                        }
                        throw exn;
                      }
                    } else {
                      throw {
                            RE_EXN_ID: DecodeError,
                            _1: err._1,
                            Error: new Error()
                          };
                    }
                  } else {
                    throw err;
                  }
                }
                return [
                        key,
                        param[1]
                      ];
              }), entries);
        return Belt_Map.fromArray(entries$1, id);
      }
      
    } else {
      throw exn;
    }
  }
  return Belt_Map.fromArray(decoded_array, id);
}

function beltMapInt(decodeValue, json) {
  var decoded_dict;
  try {
    decoded_dict = dict(decodeValue, json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === DecodeError) {
      throw {
            RE_EXN_ID: DecodeError,
            _1: "Expected an associative array with keys as strings",
            Error: new Error()
          };
    }
    throw exn;
  }
  var arr = Js_dict.entries(decoded_dict).map(function (param) {
        return [
                Belt_Int.fromString(param[0]),
                param[1]
              ];
      });
  if (has_some(arr)) {
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Unexpectedly received non-integer as key",
          Error: new Error()
        };
  }
  return Belt_MapInt.fromArray(Js_dict.entries(decoded_dict).map(function (param) {
                  return [
                          Caml_format.int_of_string(param[0]),
                          param[1]
                        ];
                }));
}

function beltMapString(decodeValue, json) {
  var decoded_dict;
  try {
    decoded_dict = dict(decodeValue, json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === DecodeError) {
      throw {
            RE_EXN_ID: DecodeError,
            _1: "Expected an associative array with keys as strings",
            Error: new Error()
          };
    }
    throw exn;
  }
  return Belt_MapString.fromArray(Js_dict.entries(decoded_dict));
}

function field(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var value = Js_dict.get(json, key);
    if (value !== undefined) {
      return Curry._1(decode, Caml_option.valFromOption(value));
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected field '$(key)'",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected object, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function optionalField(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var value = Js_dict.get(json, key);
    if (value === undefined) {
      return ;
    }
    var value$1 = Caml_option.valFromOption(value);
    if (value$1 === null) {
      return ;
    } else {
      return Caml_option.some(Curry._1(decode, value$1));
    }
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected object, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function at(key_path, decoder, json) {
  if (key_path) {
    var rest = key_path.tl;
    var key = key_path.hd;
    if (rest) {
      return field(key, (function (x) {
                    return at(rest, decoder, x);
                  }), json);
    } else {
      return field(key, decoder, json);
    }
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Expected key_path to contain at least one element",
        Error: new Error()
      };
}

function optional(decode, json) {
  var v;
  try {
    v = Curry._1(decode, json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === DecodeError) {
      return ;
    }
    throw exn;
  }
  return Caml_option.some(v);
}

function result(decodeA, decodeB, json) {
  var o = Js_json.decodeObject(json);
  if (o !== undefined) {
    var o$1 = Caml_option.valFromOption(o);
    var l = Js_dict.get(o$1, "Ok");
    if (l !== undefined) {
      return {
              TAG: /* Ok */0,
              _0: Curry._1(decodeA, Caml_option.valFromOption(l))
            };
    }
    var r = Js_dict.get(o$1, "Error");
    if (r !== undefined) {
      return {
              TAG: /* Error */1,
              _0: Curry._1(decodeB, Caml_option.valFromOption(r))
            };
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected object with a \"Ok\" key or \"Error\" key, got " + JSON.stringify(json),
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected object with a \"Ok\" key or \"Error\" key, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function either(decodeL, decodeR, json) {
  var o = Js_json.decodeObject(json);
  if (o !== undefined) {
    var o$1 = Caml_option.valFromOption(o);
    var l = Js_dict.get(o$1, "Left");
    if (l !== undefined) {
      return {
              TAG: /* Left */0,
              _0: Curry._1(decodeL, Caml_option.valFromOption(l))
            };
    }
    var r = Js_dict.get(o$1, "Right");
    if (r !== undefined) {
      return {
              TAG: /* Right */1,
              _0: Curry._1(decodeR, Caml_option.valFromOption(r))
            };
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected object with a \"Left\" key or \"Right\" key, got " + JSON.stringify(json),
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected object with a \"Left\" key or \"Right\" key, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function oneOf(_decoders, json) {
  while(true) {
    var decoders = _decoders;
    if (decoders) {
      try {
        return Curry._1(decoders.hd, json);
      }
      catch (exn){
        _decoders = decoders.tl;
        continue ;
      }
    } else {
      var length = Core__List.length(decoders);
      throw {
            RE_EXN_ID: DecodeError,
            _1: "Expected oneOf " + length.toString() + ", got " + JSON.stringify(json),
            Error: new Error()
          };
    }
  };
}

function tryEither(a, b, e) {
  return oneOf({
              hd: a,
              tl: {
                hd: b,
                tl: /* [] */0
              }
            }, e);
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

function int64_of_array(json) {
  var fs = array($$float, json);
  if (fs.length === 2) {
    if (_isInteger(fs[0]) && _isInteger(fs[1])) {
      var left = fs[0];
      var right = fs[1];
      var res = Caml_int64.of_int32(left);
      var res$1 = Caml_int64.lsl_(res, 32);
      return Caml_int64.or_(res$1, Caml_int64.of_int32(right));
    }
    throw {
          RE_EXN_ID: DecodeError,
          _1: "Expected int64, got " + JSON.stringify(json),
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: DecodeError,
        _1: "Expected int64, got " + JSON.stringify(json),
        Error: new Error()
      };
}

function int64(json) {
  var s;
  try {
    s = string(json);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === DecodeError) {
      var exit = 0;
      var s$1;
      try {
        s$1 = string(JSON.stringify(json));
        exit = 2;
      }
      catch (raw_exn$1){
        var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
        if (exn$1.RE_EXN_ID === DecodeError) {
          throw {
                RE_EXN_ID: DecodeError,
                _1: "Expected int64 as string, got " + JSON.stringify(json),
                Error: new Error()
              };
        }
        throw exn$1;
      }
      if (exit === 2) {
        return Caml_format.int64_of_string(s$1);
      }
      
    } else {
      throw exn;
    }
  }
  return Caml_format.int64_of_string(s);
}

var tuple2 = pair;

exports.DecodeError = DecodeError;
exports.bool = bool;
exports.$$float = $$float;
exports.$$int = $$int;
exports.uint8 = uint8;
exports.uint16 = uint16;
exports.uint32 = uint32;
exports.uint64 = uint64;
exports.int32 = int32;
exports.int64 = int64;
exports.int64_of_array = int64_of_array;
exports.int64_of_string = int64_of_string;
exports.bigint = bigint;
exports.string = string;
exports.date = date;
exports.nullable = nullable;
exports.nullAs = nullAs;
exports.array = array;
exports.beltMap = beltMap;
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
