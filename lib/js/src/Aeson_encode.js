'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");

function nullable(encode, param) {
  if (param) {
    return Curry._1(encode, param[0]);
  } else {
    return null;
  }
}

function withDefault(d, encode, param) {
  if (param) {
    return Curry._1(encode, param[0]);
  } else {
    return d;
  }
}

function optional(encode, optionalValue) {
  if (optionalValue) {
    return Curry._1(encode, optionalValue[0]);
  } else {
    return null;
  }
}

function date(d) {
  return d.toISOString().replace(".000Z", "Z");
}

var object_ = Js_dict.fromList;

function list(encode, l) {
  return $$Array.of_list(List.map(encode, l));
}

function pair(encodeT0, encodeT1, tuple) {
  return /* array */[
          Curry._1(encodeT0, tuple[0]),
          Curry._1(encodeT1, tuple[1])
        ];
}

function tuple3(encodeT0, encodeT1, encodeT2, tuple) {
  return /* array */[
          Curry._1(encodeT0, tuple[0]),
          Curry._1(encodeT1, tuple[1]),
          Curry._1(encodeT2, tuple[2])
        ];
}

function tuple4(encodeT0, encodeT1, encodeT2, encodeT3, tuple) {
  return /* array */[
          Curry._1(encodeT0, tuple[0]),
          Curry._1(encodeT1, tuple[1]),
          Curry._1(encodeT2, tuple[2]),
          Curry._1(encodeT3, tuple[3])
        ];
}

function tuple5(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, tuple) {
  return /* array */[
          Curry._1(encodeT0, tuple[0]),
          Curry._1(encodeT1, tuple[1]),
          Curry._1(encodeT2, tuple[2]),
          Curry._1(encodeT3, tuple[3]),
          Curry._1(encodeT4, tuple[4])
        ];
}

function tuple6(encodeT0, encodeT1, encodeT2, encodeT3, encodeT4, encodeT5, tuple) {
  return /* array */[
          Curry._1(encodeT0, tuple[0]),
          Curry._1(encodeT1, tuple[1]),
          Curry._1(encodeT2, tuple[2]),
          Curry._1(encodeT3, tuple[3]),
          Curry._1(encodeT4, tuple[4]),
          Curry._1(encodeT5, tuple[5])
        ];
}

function result(encodeA, encodeB, e) {
  if (e.tag) {
    return Js_dict.fromList(/* :: */[
                /* tuple */[
                  "Error",
                  Curry._1(encodeB, e[0])
                ],
                /* [] */0
              ]);
  } else {
    return Js_dict.fromList(/* :: */[
                /* tuple */[
                  "Ok",
                  Curry._1(encodeA, e[0])
                ],
                /* [] */0
              ]);
  }
}

function either(encodeL, encodeR, e) {
  if (e.tag) {
    return Js_dict.fromList(/* :: */[
                /* tuple */[
                  "Right",
                  Curry._1(encodeR, e[0])
                ],
                /* [] */0
              ]);
  } else {
    return Js_dict.fromList(/* :: */[
                /* tuple */[
                  "Left",
                  Curry._1(encodeL, e[0])
                ],
                /* [] */0
              ]);
  }
}

function singleEnumerator() {
  return /* array */[];
}

var tuple2 = pair;

exports.nullable = nullable;
exports.withDefault = withDefault;
exports.object_ = object_;
exports.optional = optional;
exports.date = date;
exports.list = list;
exports.pair = pair;
exports.tuple2 = tuple2;
exports.tuple3 = tuple3;
exports.tuple4 = tuple4;
exports.tuple5 = tuple5;
exports.tuple6 = tuple6;
exports.result = result;
exports.either = either;
exports.singleEnumerator = singleEnumerator;
/* Js_dict Not a pure module */
