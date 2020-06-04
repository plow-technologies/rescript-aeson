'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

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

function to_result(e) {
  if (e.tag) {
    return /* Ok */Block.__(0, [e[0]]);
  } else {
    return /* Error */Block.__(1, [e[0]]);
  }
}

function of_result(r) {
  if (r.tag) {
    return /* Left */Block.__(0, [r[0]]);
  } else {
    return /* Right */Block.__(1, [r[0]]);
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
    return /* Left */Block.__(0, [Caml_js_exceptions.internalToOCamlException(raw_exn)]);
  }
}

function is_left(v) {
  return either((function (param) {
                return true;
              }), (function (param) {
                return false;
              }), v);
}

function is_right(v) {
  return either((function (param) {
                return false;
              }), (function (param) {
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
  return either((function (param) {
                return ;
              }), (function (v$prime) {
                return Caml_option.some(v$prime);
              }), v);
}

function note(e, param) {
  if (param !== undefined) {
    return /* Right */Block.__(1, [Caml_option.valFromOption(param)]);
  } else {
    return /* Left */Block.__(0, [e]);
  }
}

function fold(f, z) {
  return (function (param) {
      return either((function (param) {
                    return z;
                  }), (function (v) {
                    return Curry._2(f, v, z);
                  }), param);
    });
}

var Either = {
  left: left,
  right: right,
  either: either,
  to_result: to_result,
  of_result: of_result,
  map: map,
  $less$$great: map,
  map_left: map_left,
  bimap: bimap,
  pure: right,
  apply: apply,
  $less$star$great: apply,
  $$return: right,
  bind: bind,
  $great$great$eq: bind,
  $$throw: left,
  is_left: is_left,
  is_right: is_right,
  to_string: to_string,
  error: error,
  try_: try_,
  hush: hush,
  note: note,
  fold: fold
};

exports.Either = Either;
/* No side effect */
