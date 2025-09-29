'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function left(a) {
  return {
          TAG: "Left",
          _0: a
        };
}

function right(b) {
  return {
          TAG: "Right",
          _0: b
        };
}

function either(l, r, x) {
  if (x.TAG === "Left") {
    return l(x._0);
  } else {
    return r(x._0);
  }
}

function to_result(e) {
  if (e.TAG === "Left") {
    return {
            TAG: "Error",
            _0: e._0
          };
  } else {
    return {
            TAG: "Ok",
            _0: e._0
          };
  }
}

function of_result(r) {
  if (r.TAG === "Ok") {
    return {
            TAG: "Right",
            _0: r._0
          };
  } else {
    return {
            TAG: "Left",
            _0: r._0
          };
  }
}

function bimap(l, r, e) {
  return either((function (v) {
                return {
                        TAG: "Left",
                        _0: l(v)
                      };
              }), (function (v) {
                return {
                        TAG: "Right",
                        _0: r(v)
                      };
              }), e);
}

function map(f, e) {
  return bimap((function (prim) {
                return prim;
              }), f, e);
}

function map_left(f, e) {
  return bimap(f, (function (prim) {
                return prim;
              }), e);
}

function bind(m, k) {
  return either(left, k, m);
}

function apply(f, v) {
  return bind(f, (function (f$p) {
                return bind(v, (function (v$p) {
                              return {
                                      TAG: "Right",
                                      _0: f$p(v$p)
                                    };
                            }));
              }));
}

function try_(f) {
  try {
    return {
            TAG: "Right",
            _0: f()
          };
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    return {
            TAG: "Left",
            _0: exn
          };
  }
}

function is_left(v) {
  return either((function (x) {
                return true;
              }), (function (x) {
                return false;
              }), v);
}

function is_right(v) {
  return either((function (x) {
                return false;
              }), (function (x) {
                return true;
              }), v);
}

function to_string(l, r, e) {
  return either((function (v) {
                return "Left (" + (l(v) + ")");
              }), (function (v) {
                return "Right (" + (r(v) + ")");
              }), e);
}

function error(v) {
  return either((function (e) {
                throw e;
              }), (function (prim) {
                return prim;
              }), v);
}

function hush(v) {
  return either((function (x) {
                
              }), (function (v$p) {
                return Caml_option.some(v$p);
              }), v);
}

function note(e, x) {
  if (x !== undefined) {
    return {
            TAG: "Right",
            _0: Caml_option.valFromOption(x)
          };
  } else {
    return {
            TAG: "Left",
            _0: e
          };
  }
}

function fold(f, z, e) {
  return either((function (x) {
                return z;
              }), (function (v) {
                return f(v, z);
              }), e);
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
