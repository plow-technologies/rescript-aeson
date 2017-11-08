'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function map(f, o) {
  if (o) {
    return /* Some */[Curry._1(f, o[0])];
  } else {
    return /* None */0;
  }
}

function $$default(f, o) {
  if (o) {
    return o[0];
  } else {
    return f;
  }
}

exports.map       = map;
exports.$$default = $$default;
exports.default   = $$default;
exports.__esModule= true;
/* No side effect */
