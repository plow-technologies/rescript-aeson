'use strict';

var Block                   = require("bs-platform/lib/js/block.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var Buffer                  = require("bs-platform/lib/js/buffer.js");
var Format                  = require("bs-platform/lib/js/format.js");
var Js_exn                  = require("bs-platform/lib/js/js_exn.js");
var $$String                = require("bs-platform/lib/js/string.js");
var Caml_obj                = require("bs-platform/lib/js/caml_obj.js");
var Caml_float              = require("bs-platform/lib/js/caml_float.js");
var Caml_int32              = require("bs-platform/lib/js/caml_int32.js");
var Pervasives              = require("bs-platform/lib/js/pervasives.js");
var Caml_format             = require("bs-platform/lib/js/caml_format.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

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
                return /* true */1;
              }), (function () {
                return /* false */0;
              }), v);
}

function is_right(v) {
  return either((function () {
                return /* false */0;
              }), (function () {
                return /* true */1;
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

function gcd(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    var r = Caml_int32.mod_(a, b);
    if (r !== 0) {
      _b = r;
      _a = b;
      continue ;
      
    } else {
      return b;
    }
  };
}

function sign(n) {
  if (n) {
    if (n < 0) {
      return -1;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

function make_real(n, d) {
  if (n === 0 || d === 1) {
    return /* record */[
            /* numerator */n,
            /* denominator */1
          ];
  } else {
    var g = gcd(n, d);
    if (g === 1) {
      return /* record */[
              /* numerator */n,
              /* denominator */d
            ];
    } else {
      return /* record */[
              /* numerator */Caml_int32.div(n, g),
              /* denominator */Caml_int32.div(d, g)
            ];
    }
  }
}

function make(n, d) {
  var sd = sign(d);
  if (sd) {
    if (sd > 0) {
      return make_real(n, d);
    } else {
      return make_real(-n | 0, -d | 0);
    }
  } else {
    return /* record */[
            /* numerator */sign(n),
            /* denominator */0
          ];
  }
}

function classify(n) {
  if (n[/* denominator */1]) {
    if (n[/* numerator */0]) {
      return /* NZERO */4;
    } else {
      return /* ZERO */0;
    }
  } else {
    var match = sign(n[/* numerator */0]);
    var switcher = match + 1 | 0;
    if (switcher > 2 || switcher < 0) {
      return /* UNDEF */3;
    } else {
      switch (switcher) {
        case 0 : 
            return /* MINF */2;
        case 1 : 
            return /* UNDEF */3;
        case 2 : 
            return /* INF */1;
        
      }
    }
  }
}

function neg(x) {
  return /* record */[
          /* numerator */-x[/* numerator */0] | 0,
          /* denominator */x[/* denominator */1]
        ];
}

function abs(x) {
  return /* record */[
          /* numerator */Pervasives.abs(x[/* numerator */0]),
          /* denominator */x[/* denominator */1]
        ];
}

function compare(x, y) {
  var match = classify(x);
  var match$1 = classify(y);
  var exit = 0;
  var exit$1 = 0;
  var exit$2 = 0;
  switch (match) {
    case 1 : 
        var switcher = match$1 - 1 | 0;
        if (switcher > 2 || switcher < 0) {
          exit$1 = 2;
        } else {
          switch (switcher) {
            case 0 : 
                return 0;
            case 1 : 
                exit$1 = 2;
                break;
            case 2 : 
                exit$2 = 3;
                break;
            
          }
        }
        break;
    case 2 : 
        if (match$1 !== 1) {
          if (match$1 !== 0) {
            switch (match$1 - 2 | 0) {
              case 0 : 
                  return 0;
              case 1 : 
                  exit$2 = 3;
                  break;
              case 2 : 
                  exit$1 = 2;
                  break;
              
            }
          } else {
            exit$1 = 2;
          }
        } else {
          exit$2 = 3;
        }
        break;
    case 3 : 
        if (match$1 !== 3) {
          return -1;
        } else {
          return 0;
        }
    case 0 : 
    case 4 : 
        exit$2 = 3;
        break;
    
  }
  if (exit$2 === 3) {
    var switcher$1 = match$1 - 1 | 0;
    if (switcher$1 > 2 || switcher$1 < 0) {
      exit$1 = 2;
    } else {
      switch (switcher$1) {
        case 0 : 
            return -1;
        case 1 : 
            exit$1 = 2;
            break;
        case 2 : 
            return 1;
        
      }
    }
  }
  if (exit$1 === 2) {
    if (match >= 4) {
      exit = 1;
    } else {
      switch (match) {
        case 0 : 
            exit = 1;
            break;
        case 1 : 
            return 1;
        case 2 : 
            return -1;
        
      }
    }
  }
  if (exit === 1) {
    if (match$1 !== 2) {
      if (x[/* denominator */1] === y[/* denominator */1]) {
        return Caml_obj.caml_int_compare(x[/* numerator */0], y[/* numerator */0]);
      } else {
        return Caml_obj.caml_int_compare(Caml_int32.imul(x[/* numerator */0], y[/* denominator */1]), Caml_int32.imul(y[/* numerator */0], x[/* denominator */1]));
      }
    } else {
      return 1;
    }
  }
  
}

function equal(x, y) {
  if (x[/* numerator */0] === y[/* numerator */0]) {
    return +(x[/* denominator */1] === y[/* denominator */1]);
  } else {
    return /* false */0;
  }
}

function min(a, b) {
  if (compare(a, b) <= 0) {
    return a;
  } else {
    return b;
  }
}

function max(a, b) {
  if (compare(a, b) >= 0) {
    return a;
  } else {
    return b;
  }
}

function leq(a, b) {
  return +(compare(a, b) <= 0);
}

function geq(a, b) {
  return +(compare(a, b) >= 0);
}

function lt(a, b) {
  return +(compare(a, b) < 0);
}

function gt(a, b) {
  return +(compare(a, b) > 0);
}

function to_int(n) {
  return Caml_int32.div(n[/* numerator */0], n[/* denominator */1]);
}

function to_string$1(n) {
  var match = classify(n);
  switch (match) {
    case 0 : 
        return "0";
    case 1 : 
        return "+inf";
    case 2 : 
        return "-inf";
    case 3 : 
        return "undef";
    case 4 : 
        if (n[/* denominator */1] === 1) {
          return Pervasives.string_of_int(n[/* numerator */0]);
        } else {
          return Pervasives.string_of_int(n[/* numerator */0]) + ("/" + Pervasives.string_of_int(n[/* denominator */1]));
        }
    
  }
}

function to_float(x) {
  var match = classify(x);
  switch (match) {
    case 0 : 
        return 0.0;
    case 1 : 
        return Pervasives.infinity;
    case 2 : 
        return Pervasives.neg_infinity;
    case 3 : 
        return Pervasives.nan;
    case 4 : 
        return x[/* numerator */0] / x[/* denominator */1];
    
  }
}

var zero = /* record */[
  /* numerator */0,
  /* denominator */1
];

var one = /* record */[
  /* numerator */1,
  /* denominator */1
];

var minus_one = /* record */[
  /* numerator */-1,
  /* denominator */1
];

var inf = /* record */[
  /* numerator */1,
  /* denominator */0
];

var minus_inf = /* record */[
  /* numerator */-1,
  /* denominator */0
];

var undef = /* record */[
  /* numerator */0,
  /* denominator */0
];

function of_int(n) {
  return /* record */[
          /* numerator */n,
          /* denominator */1
        ];
}

function of_ints(n, d) {
  return /* record */[
          /* numerator */n,
          /* denominator */d
        ];
}

function of_float(d) {
  if (d === Pervasives.infinity) {
    return inf;
  } else if (d === Pervasives.neg_infinity) {
    return minus_inf;
  } else if (Caml_float.caml_classify_float(d) === /* FP_nan */4) {
    return undef;
  } else {
    var match = Caml_float.caml_frexp_float(d);
    var match_000 = Caml_float.caml_ldexp_float(match[0], 53);
    var match_001 = match[1] - 53 | 0;
    var e = match_001;
    var m = match_000;
    if (e >= 0) {
      return /* record */[
              /* numerator */((m | 0) << e),
              /* denominator */1
            ];
    } else {
      return make_real(m | 0, (1 << (-e | 0)));
    }
  }
}

function of_string(s) {
  try {
    var i = $$String.index(s, /* "/" */47);
    return make(Caml_format.caml_int_of_string($$String.sub(s, 0, i)), Caml_format.caml_int_of_string($$String.sub(s, i + 1 | 0, (s.length - i | 0) - 1 | 0)));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      if (s === "inf" || s === "+inf") {
        return inf;
      } else if (s === "-inf") {
        return minus_inf;
      } else {
        return undef;
      }
    } else {
      throw exn;
    }
  }
}

function is_real(n) {
  return +(n[/* denominator */1] !== 0);
}

function num(t) {
  return t[/* numerator */0];
}

function den(t) {
  return t[/* denominator */1];
}

function aors(zaors, x, y) {
  if (x[/* denominator */1] === y[/* denominator */1]) {
    return make_real(Curry._2(zaors, x[/* numerator */0], y[/* numerator */0]), x[/* denominator */1]);
  } else {
    return make_real(Curry._2(zaors, Caml_int32.imul(x[/* numerator */0], y[/* denominator */1]), Caml_int32.imul(y[/* numerator */0], x[/* denominator */1])), Caml_int32.imul(x[/* denominator */1], y[/* denominator */1]));
  }
}

function add(x, y) {
  if (x[/* denominator */1] === 0 || y[/* denominator */1] === 0) {
    var match = classify(x);
    var match$1 = classify(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return y;
      case 1 : 
          switch (match$1) {
            case 2 : 
                return undef;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 1 : 
            case 4 : 
                exit = 1;
                break;
            
          }
          break;
      case 2 : 
          switch (match$1) {
            case 1 : 
                return undef;
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf;
            
          }
          break;
      case 3 : 
          exit$1 = 3;
          break;
      case 4 : 
          switch (match$1) {
            case 1 : 
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return Pervasives.failwith("impossible case");
            
          }
          break;
      
    }
    if (exit$1 === 3) {
      if (match$1 !== 3) {
        if (match$1 !== 0) {
          exit = 1;
        } else {
          return x;
        }
      } else {
        return undef;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef;
          } else {
            return inf;
          }
      case 2 : 
          if (match$1 >= 2) {
            return minus_inf;
          } else {
            return inf;
          }
      
    }
  } else {
    return aors((function (prim, prim$1) {
                  return prim + prim$1 | 0;
                }), x, y);
  }
}

function sub(x, y) {
  if (x[/* denominator */1] === 0 || y[/* denominator */1] === 0) {
    var match = classify(x);
    var match$1 = classify(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return neg(y);
      case 1 : 
          switch (match$1) {
            case 1 : 
                return undef;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 2 : 
            case 4 : 
                exit = 1;
                break;
            
          }
          break;
      case 2 : 
          switch (match$1) {
            case 1 : 
                exit = 2;
                break;
            case 2 : 
                return undef;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf;
            
          }
          break;
      case 3 : 
          exit$1 = 3;
          break;
      case 4 : 
          switch (match$1) {
            case 1 : 
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return Pervasives.failwith("impossible case");
            
          }
          break;
      
    }
    if (exit$1 === 3) {
      if (match$1 !== 3) {
        if (match$1 !== 0) {
          exit = 1;
        } else {
          return x;
        }
      } else {
        return undef;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef;
          } else {
            return inf;
          }
      case 2 : 
          if (match$1 >= 2) {
            return inf;
          } else {
            return minus_inf;
          }
      
    }
  } else {
    return aors((function (prim, prim$1) {
                  return prim - prim$1 | 0;
                }), x, y);
  }
}

function mul(x, y) {
  if (x[/* denominator */1] === 0 || y[/* denominator */1] === 0) {
    return /* record */[
            /* numerator */Caml_int32.imul(sign(x[/* numerator */0]), sign(y[/* numerator */0])),
            /* denominator */0
          ];
  } else {
    return make_real(Caml_int32.imul(x[/* numerator */0], y[/* numerator */0]), Caml_int32.imul(x[/* denominator */1], y[/* denominator */1]));
  }
}

function inv(x) {
  var match = sign(x[/* numerator */0]);
  var exit = 0;
  var switcher = match + 1 | 0;
  if (switcher > 2 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* record */[
                  /* numerator */-x[/* denominator */1] | 0,
                  /* denominator */-x[/* numerator */0] | 0
                ];
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return /* record */[
                  /* numerator */x[/* denominator */1],
                  /* denominator */x[/* numerator */0]
                ];
      
    }
  }
  if (exit === 1) {
    if (x[/* denominator */1]) {
      return inf;
    } else {
      return undef;
    }
  }
  
}

function div(x, y) {
  if (sign(y[/* numerator */0]) >= 0) {
    return mul(x, /* record */[
                /* numerator */y[/* denominator */1],
                /* denominator */y[/* numerator */0]
              ]);
  } else {
    return mul(x, /* record */[
                /* numerator */-y[/* denominator */1] | 0,
                /* denominator */-y[/* numerator */0] | 0
              ]);
  }
}

function mul_2exp(x, n) {
  if (x[/* denominator */1]) {
    return make_real((x[/* numerator */0] << n), x[/* denominator */1]);
  } else {
    return x;
  }
}

function div_2exp(x, n) {
  if (x[/* denominator */1]) {
    return make_real(x[/* numerator */0], (x[/* denominator */1] << n));
  } else {
    return x;
  }
}

function print(x) {
  return Pervasives.print_string(to_string$1(x));
}

function output(chan, x) {
  return Pervasives.output_string(chan, to_string$1(x));
}

function sprint(_, x) {
  return to_string$1(x);
}

function bprint(b, x) {
  return Buffer.add_string(b, to_string$1(x));
}

function pp_print(f, x) {
  return Format.pp_print_string(f, to_string$1(x));
}

function $tilde$plus(x) {
  return x;
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

var Rational = [
  make,
  zero,
  one,
  minus_one,
  inf,
  minus_inf,
  undef,
  of_int,
  of_ints,
  of_float,
  of_string,
  num,
  den,
  classify,
  is_real,
  sign,
  compare,
  equal,
  min,
  max,
  leq,
  geq,
  lt,
  gt,
  to_int,
  to_string$1,
  to_float,
  neg,
  abs,
  add,
  sub,
  mul,
  inv,
  div,
  mul_2exp,
  div_2exp,
  print,
  output,
  sprint,
  bprint,
  pp_print,
  neg,
  $tilde$plus,
  add,
  sub,
  mul,
  div,
  mul_2exp,
  div_2exp,
  make
];

exports.Either   = Either;
exports.Rational = Rational;
/* Format Not a pure module */
