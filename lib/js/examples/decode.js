'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Aeson_decode = require("../src/Aeson_decode.js");

function mapJsonObjectString(f, decoder, encoder, str) {
  var json = JSON.parse(str);
  return JSON.stringify(Js_dict.map(Curry.__1(encoder), Js_dict.map(Curry.__1(f), Aeson_decode.dict(decoder, json))));
}

function sum(param) {
  return $$Array.fold_left((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, param);
}

console.log(mapJsonObjectString(sum, (function (param) {
            return Aeson_decode.array(Aeson_decode.$$int, param);
          }), (function (prim) {
            return prim;
          }), "\n      {\n        \"foo\": [1, 2, 3],\n        \"bar\": [9, 8, 7]\n      }\n    "));

var json = JSON.parse("{ \"y\": 42 } ");

var exit = 0;

var x;

try {
  x = Aeson_decode.field("x", Aeson_decode.$$int, json);
  exit = 1;
}
catch (raw_exn){
  var exn = Js_exn.internalToOCamlException(raw_exn);
  if (exn[0] === Aeson_decode.DecodeError) {
    console.log("Error:" + exn[1]);
  } else {
    throw exn;
  }
}

if (exit === 1) {
  console.log(x);
}

exports.mapJsonObjectString = mapJsonObjectString;
exports.sum = sum;
/*  Not a pure module */
