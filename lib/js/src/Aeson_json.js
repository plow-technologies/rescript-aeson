'use strict';

var Block = require("bs-platform/lib/js/block.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

function is_int64(s) {
  try {
    Caml_format.caml_int64_of_string(s);
    return true;
  }
  catch (exn){
    return false;
  }
}

function is_float(s) {
  try {
    Caml_format.caml_float_of_string(s);
    return true;
  }
  catch (exn){
    return false;
  }
}

function is_numeric(s) {
  if (is_int64(s)) {
    return true;
  } else {
    return is_float(s);
  }
}

function classify(x) {
  var ty = typeof x;
  if (ty === "string") {
    if (is_numeric(x)) {
      return /* JSONNumberString */Block.__(1, [x]);
    } else {
      return /* JSONString */Block.__(0, [x]);
    }
  } else if (ty === "number") {
    return /* JSONNumber */Block.__(2, [x]);
  } else if (ty === "boolean") {
    if (x === true) {
      return /* JSONTrue */1;
    } else {
      return /* JSONFalse */0;
    }
  } else if (x === null) {
    return /* JSONNull */2;
  } else if (Array.isArray(x)) {
    return /* JSONArray */Block.__(4, [x]);
  } else {
    return /* JSONObject */Block.__(3, [x]);
  }
}

function stringify(x) {
  var match = classify(x);
  if (typeof match === "number") {
    return "";
  } else {
    switch (match.tag | 0) {
      case 0 : 
          return $$String.concat("", /* :: */[
                      "\"",
                      /* :: */[
                        match[0],
                        /* :: */[
                          "\"",
                          /* [] */0
                        ]
                      ]
                    ]);
      case 1 : 
          return match[0];
      default:
        return "";
    }
  }
}

function test(x, v) {
  switch (v) {
    case 0 : 
    case 1 : 
        return typeof x === "string";
    case 2 : 
        return typeof x === "number";
    case 3 : 
        if (x !== null && typeof x === "object") {
          return !Array.isArray(x);
        } else {
          return false;
        }
    case 4 : 
        return Array.isArray(x);
    case 5 : 
        return typeof x === "boolean";
    case 6 : 
        return x === null;
    
  }
}

function decodeString(json) {
  if (typeof json === "string") {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeNumber(json) {
  if (typeof json === "number") {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeObject(json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeArray(json) {
  if (Array.isArray(json)) {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeBoolean(json) {
  if (typeof json === "boolean") {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeNull(json) {
  if (json === null) {
    return /* Some */[null];
  } else {
    return /* None */0;
  }
}

exports.is_int64 = is_int64;
exports.is_float = is_float;
exports.is_numeric = is_numeric;
exports.classify = classify;
exports.stringify = stringify;
exports.test = test;
exports.decodeString = decodeString;
exports.decodeNumber = decodeNumber;
exports.decodeObject = decodeObject;
exports.decodeArray = decodeArray;
exports.decodeBoolean = decodeBoolean;
exports.decodeNull = decodeNull;
/* No side effect */
