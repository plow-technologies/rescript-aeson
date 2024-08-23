'use strict';

var Aeson_decode = require("../src/Aeson_decode.js");

function arrayOfInts(str) {
  var json = JSON.parse(str);
  return Aeson_decode.array(Aeson_decode.$$int, json);
}

console.log(arrayOfInts("[1, 2, 3]").reverse());

exports.arrayOfInts = arrayOfInts;
/*  Not a pure module */
