'use strict';

var Js_dict = require("rescript/lib/js/js_dict.js");
var Core__Array = require("@rescript/core/lib/js/src/Core__Array.js");
var Aeson_decode = require("../src/Aeson_decode.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function mapJsonObjectString(f, decoder, encoder, str) {
  var json = JSON.parse(str);
  var m = Aeson_decode.dict(decoder, json);
  return JSON.stringify(Js_dict.map(encoder, Js_dict.map(f, m)));
}

function sum(xs) {
  return Core__Array.reduce(xs, 0, (function (prim0, prim1) {
                return prim0 + prim1 | 0;
              }));
}

console.log(mapJsonObjectString(sum, (function (param) {
            return Aeson_decode.array(Aeson_decode.$$int, param);
          }), (function (x) {
            return x;
          }), "\n      {\n        \"foo\": [1, 2, 3],\n        \"bar\": [9, 8, 7]\n      }\n    "));

var json = JSON.parse("{ \"y\": 42 } ");

var exit = 0;

var x;

try {
  x = Aeson_decode.field("x", Aeson_decode.$$int, json);
  exit = 1;
}
catch (raw_msg){
  var msg = Caml_js_exceptions.internalToOCamlException(raw_msg);
  if (msg.RE_EXN_ID === Aeson_decode.DecodeError) {
    console.log("Error:" + msg._1);
  } else {
    throw msg;
  }
}

if (exit === 1) {
  console.log(x);
}

exports.mapJsonObjectString = mapJsonObjectString;
exports.sum = sum;
/*  Not a pure module */
