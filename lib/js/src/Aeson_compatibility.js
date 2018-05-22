'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");

function left(a) {
  return /* Left */Block.__(0, [a]);
}

function right(b) {
  return /* Right */Block.__(1, [b]);
}

function either(l, r, param) {
  if (param.tag) {
    return Curry._1(r, param[0]);
  } else {
    return Curry._1(l, param[0]);
  }
}

function bimap(l, r) {
  return (function (param) {
      return either((function (v) {
                    return /* Left */Block.__(0, [Curry._1(l, v)]);
                  }), (function (v) {
                    return /* Right */Block.__(1, [Curry._1(r, v)]);
                  }), param);
    });
}

function map(f) {
  return bimap((function (prim) {
                return prim;
              }), f);
}

function map_left(f) {
  return bimap(f, (function (prim) {
                return prim;
              }));
}

function bind(m, k) {
  return either(left, k, m);
}

function apply(f, v) {
  return either(left, (function (f$prime) {
                return either(left, (function (v$prime) {
                              return /* Right */Block.__(1, [Curry._1(f$prime, v$prime)]);
                            }), v);
              }), f);
}

function try_(f) {
  try {
    return /* Right */Block.__(1, [Curry._1(f, /* () */0)]);
  }
  catch (raw_exn){
    return /* Left */Block.__(0, [Js_exn.internalToOCamlException(raw_exn)]);
  }
}

function is_left(v) {
  return either((function () {
                return true;
              }), (function () {
                return false;
              }), v);
}

function is_right(v) {
  return either((function () {
                return false;
              }), (function () {
                return true;
              }), v);
}

function to_string(l, r) {
  return (function (param) {
      return either((function (v) {
                    return "Left (" + (Curry._1(l, v) + ")");
                  }), (function (v) {
                    return "Right (" + (Curry._1(r, v) + ")");
                  }), param);
    });
}

function error(v) {
  return either((function (e) {
                throw e;
              }), (function (prim) {
                return prim;
              }), v);
}

function hush(v) {
  return either((function () {
                return /* None */0;
              }), (function (v$prime) {
                return /* Some */[v$prime];
              }), v);
}

function note(e, param) {
  if (param) {
    return /* Right */Block.__(1, [param[0]]);
  } else {
    return /* Left */Block.__(0, [e]);
  }
}

function fold(f, z) {
  return (function (param) {
      return either((function () {
                    return z;
                  }), (function (v) {
                    return Curry._2(f, v, z);
                  }), param);
    });
}

var Either = [
  left,
  right,
  either,
  map,
  map,
  map_left,
  bimap,
  right,
  apply,
  apply,
  right,
  bind,
  bind,
  left,
  is_left,
  is_right,
  to_string,
  error,
  try_,
  hush,
  note,
  fold
];

exports.Either = Either;
/* No side effect */
