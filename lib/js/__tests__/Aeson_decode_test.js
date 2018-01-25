'use strict';

var Jest                = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Curry               = require("bs-platform/lib/js/curry.js");
var Aeson_decode        = require("../src/Aeson_decode.js");
var Aeson_encode        = require("../src/Aeson_encode.js");
var Aeson_compatibility = require("../src/Aeson_compatibility.js");

function test(decoder, prefix, param) {
  switch (param) {
    case 0 : 
        return Jest.test(prefix + "float", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, 1.23));
                    }));
    case 1 : 
        return Jest.test(prefix + "int", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, 23));
                    }));
    case 2 : 
        return Jest.test(prefix + "string", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, "test"));
                    }));
    case 3 : 
        return Jest.test(prefix + "null", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, null));
                    }));
    case 4 : 
        return Jest.test(prefix + "array", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, /* array */[]));
                    }));
    case 5 : 
        return Jest.test(prefix + "object", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, Aeson_encode.object_(/* [] */0)));
                    }));
    case 6 : 
        return Jest.test(prefix + "boolean", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1](decoder, true));
                    }));
    
  }
}

function throws(_$staropt$star, decoder, _param) {
  while(true) {
    var param = _param;
    var $staropt$star = _$staropt$star;
    var prefix = $staropt$star ? $staropt$star[0] : "";
    if (param) {
      test(decoder, prefix, param[0]);
      _param = param[1];
      _$staropt$star = /* Some */[prefix];
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

var Test = /* module */[
  /* test */test,
  /* throws */throws
];

describe("boolean", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Aeson_decode.$$boolean(true)));
              }));
        return throws(/* None */0, Aeson_decode.$$boolean, /* :: */[
                    /* Float */0,
                    /* :: */[
                      /* Int */1,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("bool", (function () {
        Jest.test("bool", (function () {
                return Jest.Expect[/* toEqual */12](/* true */1, Jest.Expect[/* expect */0](Aeson_decode.bool(true)));
              }));
        Jest.test("bool - false", (function () {
                return Jest.Expect[/* toEqual */12](/* false */0, Jest.Expect[/* expect */0](Aeson_decode.bool(false)));
              }));
        return throws(/* None */0, Aeson_decode.bool, /* :: */[
                    /* Float */0,
                    /* :: */[
                      /* Int */1,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("float", (function () {
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](1.23, Jest.Expect[/* expect */0](Aeson_decode.$$float(1.23)));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.$$float(23)));
              }));
        return throws(/* None */0, Aeson_decode.$$float, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* String */2,
                      /* :: */[
                        /* Null */3,
                        /* :: */[
                          /* Array */4,
                          /* :: */[
                            /* Object */5,
                            /* [] */0
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("int", (function () {
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.$$int(23)));
              }));
        Jest.test("int > 32-bit", (function () {
                var big_int = (2147483648);
                return Jest.Expect[/* toEqual */12](big_int, Jest.Expect[/* expect */0](Aeson_decode.$$int(big_int)));
              }));
        return throws(/* None */0, Aeson_decode.$$int, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("string", (function () {
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12]("test", Jest.Expect[/* expect */0](Aeson_decode.string("test")));
              }));
        return throws(/* None */0, Aeson_decode.string, /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("date", (function () {
        var now = new Date("2017-12-08T06:03:22Z");
        return Jest.test("date", (function () {
                      return Jest.Expect[/* toEqual */12](now, Jest.Expect[/* expect */0](Aeson_decode.date(Aeson_encode.date(now))));
                    }));
      }));

describe("rational", (function () {
        return Jest.test("int -> int", (function () {
                      return Jest.Expect[/* toEqual */12](Aeson_compatibility.Rational[/* make */0](3, 4), Jest.Expect[/* expect */0](Aeson_decode.rational(Aeson_encode.rational(Aeson_compatibility.Rational[/* make */0](3, 4)))));
                    }));
      }));

describe("nullable", (function () {
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.nullable(Aeson_decode.$$int, 23)));
              }));
        Jest.test("null -> int", (function () {
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Aeson_decode.nullable(Aeson_decode.$$int, null)));
              }));
        Jest.test("boolean -> boolean ", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Aeson_decode.nullable(Aeson_decode.$$boolean, true)));
              }));
        Jest.test("float -> float", (function () {
                return Jest.Expect[/* toEqual */12](1.23, Jest.Expect[/* expect */0](Aeson_decode.nullable(Aeson_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function () {
                return Jest.Expect[/* toEqual */12]("test", Jest.Expect[/* expect */0](Aeson_decode.nullable(Aeson_decode.string, "test")));
              }));
        Jest.test("null -> null", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Aeson_decode.nullable((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), null)));
              }));
        throws(/* None */0, (function (param) {
                return Aeson_decode.nullable(Aeson_decode.$$int, param);
              }), /* :: */[
              /* Bool */6,
              /* :: */[
                /* Float */0,
                /* :: */[
                  /* String */2,
                  /* :: */[
                    /* Array */4,
                    /* :: */[
                      /* Object */5,
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]);
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.nullable(Aeson_decode.$$boolean, param);
                    }), /* :: */[
                    /* Int */1,
                    /* [] */0
                  ]);
      }));

describe("nullAs", (function () {
        Jest.test("as 0 - null", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Aeson_decode.nullAs(0, null)));
              }));
        Jest.test("as Js.null", (function () {
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Aeson_decode.nullAs(null, null)));
              }));
        Jest.test("as None", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.nullAs(/* None */0, null)));
              }));
        Jest.test("as Some _", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["foo"], Jest.Expect[/* expect */0](Aeson_decode.nullAs(/* Some */["foo"], null)));
              }));
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.nullAs(0, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("array", (function () {
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](/* int array */[], Jest.Expect[/* expect */0](Aeson_decode.array(Aeson_decode.$$int, /* array */[])));
              }));
        Jest.test("array boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                            true,
                            false,
                            true
                          ], Jest.Expect[/* expect */0](Aeson_decode.array(Aeson_decode.$$boolean, JSON.parse(" [true, false, true] "))));
              }));
        Jest.test("array float", (function () {
                return Jest.Expect[/* toEqual */12](/* float array */[
                            1,
                            2,
                            3
                          ], Jest.Expect[/* expect */0](Aeson_decode.array(Aeson_decode.$$float, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("array int", (function () {
                return Jest.Expect[/* toEqual */12](/* int array */[
                            1,
                            2,
                            3
                          ], Jest.Expect[/* expect */0](Aeson_decode.array(Aeson_decode.$$int, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("array string", (function () {
                return Jest.Expect[/* toEqual */12](/* array */[
                            "a",
                            "b",
                            "c"
                          ], Jest.Expect[/* expect */0](Aeson_decode.array(Aeson_decode.string, JSON.parse(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("array nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* array */[
                            null,
                            null,
                            null
                          ], Jest.Expect[/* expect */0](Aeson_decode.array((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" [null, null, null] "))));
              }));
        Jest.test("array int -> array boolean", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.array(Aeson_decode.$$boolean, param);
                                }), JSON.parse(" [1, 2, 3] ")));
              }));
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.array(Aeson_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("list", (function () {
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](/* [] */0, Jest.Expect[/* expect */0](Aeson_decode.list(Aeson_decode.$$int, /* array */[])));
              }));
        Jest.test("list boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            true,
                            /* :: */[
                              false,
                              /* :: */[
                                true,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Aeson_decode.list(Aeson_decode.$$boolean, JSON.parse(" [true, false, true] "))));
              }));
        Jest.test("list float", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            1,
                            /* :: */[
                              2,
                              /* :: */[
                                3,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Aeson_decode.list(Aeson_decode.$$float, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("list int", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            1,
                            /* :: */[
                              2,
                              /* :: */[
                                3,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Aeson_decode.list(Aeson_decode.$$int, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("list string", (function () {
                return Jest.Expect[/* toEqual */12](/* :: */[
                            "a",
                            /* :: */[
                              "b",
                              /* :: */[
                                "c",
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Aeson_decode.list(Aeson_decode.string, JSON.parse(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("list nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* :: */[
                            null,
                            /* :: */[
                              null,
                              /* :: */[
                                null,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](Aeson_decode.list((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" [null, null, null] "))));
              }));
        Jest.test("array int -> list boolean", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.list(Aeson_decode.$$boolean, param);
                                }), JSON.parse(" [1, 2, 3] ")));
              }));
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.list(Aeson_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("pair", (function () {
        Jest.test("pair string int", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            "a",
                            3
                          ], Jest.Expect[/* expect */0](Aeson_decode.pair(Aeson_decode.string, Aeson_decode.$$int, JSON.parse(" [\"a\", 3] "))));
              }));
        Jest.test("pair int int", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            4,
                            3
                          ], Jest.Expect[/* expect */0](Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, JSON.parse(" [4, 3] "))));
              }));
        Jest.test("pair missing", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, param);
                                }), JSON.parse(" [4] ")));
              }));
        Jest.test("pair too large", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, param);
                                }), JSON.parse(" [3, 4, 5] ")));
              }));
        Jest.test("pair bad left type", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, param);
                                }), JSON.parse(" [\"3\", 4] ")));
              }));
        return Jest.test("pair bad right type", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Aeson_decode.pair(Aeson_decode.string, Aeson_decode.string, param);
                                      }), JSON.parse(" [\"3\", 4] ")));
                    }));
      }));

describe("singleEnumerator", (function () {
        return Jest.test("singleEnumerator", (function () {
                      return Jest.Expect[/* toEqual */12](/* SingleEnumerator */0, Jest.Expect[/* expect */0](Aeson_decode.singleEnumerator(/* SingleEnumerator */0, /* array */[])));
                    }));
      }));

describe("dict", (function () {
        Jest.test("object", (function () {
                return Jest.Expect[/* toEqual */12]({ }, Jest.Expect[/* expect */0](Aeson_decode.dict(Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))));
              }));
        Jest.test("dict boolean", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: true,
                            b: false
                          }, Jest.Expect[/* expect */0](Aeson_decode.dict(Aeson_decode.$$boolean, JSON.parse(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("dict float", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: 1.2,
                            b: 2.3
                          }, Jest.Expect[/* expect */0](Aeson_decode.dict(Aeson_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("dict int", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: 1,
                            b: 2
                          }, Jest.Expect[/* expect */0](Aeson_decode.dict(Aeson_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("dict string", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: "x",
                            b: "y"
                          }, Jest.Expect[/* expect */0](Aeson_decode.dict(Aeson_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("dict nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12]({
                            a: null,
                            b: null
                          }, Jest.Expect[/* expect */0](Aeson_decode.dict((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("dict null -> dict string", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.dict(Aeson_decode.string, param);
                                }), JSON.parse(" { \"a\": null, \"b\": null } ")));
              }));
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.dict(Aeson_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Array */4,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("field", (function () {
        Jest.test("field boolean", (function () {
                return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Aeson_decode.field("b", Aeson_decode.$$boolean, JSON.parse(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("field float", (function () {
                return Jest.Expect[/* toEqual */12](2.3, Jest.Expect[/* expect */0](Aeson_decode.field("b", Aeson_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("field int", (function () {
                return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Aeson_decode.field("b", Aeson_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("field string", (function () {
                return Jest.Expect[/* toEqual */12]("y", Jest.Expect[/* expect */0](Aeson_decode.field("b", Aeson_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("field nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Aeson_decode.field("b", (function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("field null -> field string", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.field("b", Aeson_decode.string, param);
                                }), JSON.parse(" { \"a\": null, \"b\": null } ")));
              }));
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.field("foo", Aeson_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Array */4,
                              /* :: */[
                                /* Object */5,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("at", (function () {
        Jest.test("at boolean", (function () {
                return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Curry._1(Aeson_decode.at(/* :: */[
                                        "a",
                                        /* :: */[
                                          "x",
                                          /* :: */[
                                            "y",
                                            /* [] */0
                                          ]
                                        ]
                                      ], Aeson_decode.$$boolean), JSON.parse(" {\n        \"a\": { \"x\" : { \"y\" : false } }, \n        \"b\": false \n      } "))));
              }));
        Jest.test("field nullAs", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](null, Jest.Expect[/* expect */0](Curry._1(Aeson_decode.at(/* :: */[
                                        "a",
                                        /* :: */[
                                          "x",
                                          /* [] */0
                                        ]
                                      ], (function (param) {
                                          return Aeson_decode.nullAs(partial_arg, param);
                                        })), JSON.parse(" {\n        \"a\": { \"x\" : null }, \n        \"b\": null \n      } "))));
              }));
        return throws(/* None */0, Aeson_decode.at(/* :: */[
                        "foo",
                        /* :: */[
                          "bar",
                          /* [] */0
                        ]
                      ], Aeson_decode.$$int), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* Int */1,
                        /* :: */[
                          /* String */2,
                          /* :: */[
                            /* Null */3,
                            /* :: */[
                              /* Array */4,
                              /* :: */[
                                /* Object */5,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("optional", (function () {
        Jest.test("boolean -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$int, true)));
              }));
        Jest.test("float -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$int, 1.23)));
              }));
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[23], Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$int, 23)));
              }));
        Jest.test("string -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$int, "test")));
              }));
        Jest.test("null -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$int, null)));
              }));
        Jest.test("array -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$int, /* array */[])));
              }));
        Jest.test("object -> int", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))));
              }));
        Jest.test("boolean -> boolean ", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[true], Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$boolean, true)));
              }));
        Jest.test("float -> float", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[1.23], Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */["test"], Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.string, "test")));
              }));
        Jest.test("null -> null", (function () {
                var partial_arg = null;
                return Jest.Expect[/* toEqual */12](/* Some */[null], Jest.Expect[/* expect */0](Aeson_decode.optional((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), null)));
              }));
        Jest.test("int -> boolean", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional(Aeson_decode.$$boolean, 1)));
              }));
        Jest.test("optional field", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[2], Jest.Expect[/* expect */0](Aeson_decode.optional((function (param) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("optional field - incorrect type", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional((function (param) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2.3} "))));
              }));
        Jest.test("optional field - no such field", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.optional((function (param) {
                                      return Aeson_decode.field("y", Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("field optional", (function () {
                return Jest.Expect[/* toEqual */12](/* Some */[2], Jest.Expect[/* expect */0](Aeson_decode.field("x", (function (param) {
                                      return Aeson_decode.optional(Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("field optional - incorrect type", (function () {
                return Jest.Expect[/* toEqual */12](/* None */0, Jest.Expect[/* expect */0](Aeson_decode.field("x", (function (param) {
                                      return Aeson_decode.optional(Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2.3} "))));
              }));
        return Jest.test("field optional - no such field", (function () {
                      return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                        return Aeson_decode.field("y", (function (param) {
                                                      return Aeson_decode.optional(Aeson_decode.$$int, param);
                                                    }), param);
                                      }), JSON.parse(" { \"x\": 2} ")));
                    }));
      }));

describe("oneOf", (function () {
        Jest.test("object with field", (function () {
                return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Aeson_decode.oneOf(/* :: */[
                                    Aeson_decode.$$int,
                                    /* :: */[
                                      (function (param) {
                                          return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                        }),
                                      /* [] */0
                                    ]
                                  ], JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.oneOf(/* :: */[
                                    Aeson_decode.$$int,
                                    /* :: */[
                                      (function (param) {
                                          return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                        }),
                                      /* [] */0
                                    ]
                                  ], 23)));
              }));
        var partial_arg_001 = /* :: */[
          (function (param) {
              return Aeson_decode.field("x", Aeson_decode.$$int, param);
            }),
          /* [] */0
        ];
        var partial_arg = /* :: */[
          Aeson_decode.$$int,
          partial_arg_001
        ];
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.oneOf(partial_arg, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("tryEither", (function () {
        Jest.test("object with field", (function () {
                return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](Aeson_decode.tryEither(Aeson_decode.$$int, (function (param) {
                                        return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                      }))(JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.tryEither(Aeson_decode.$$int, (function (param) {
                                        return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                      }))(23)));
              }));
        return throws(/* None */0, Aeson_decode.tryEither(Aeson_decode.$$int, (function (param) {
                          return Aeson_decode.field("x", Aeson_decode.$$int, param);
                        })), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("withDefault", (function () {
        Jest.test("boolean", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Aeson_decode.withDefault(0, Aeson_decode.$$int, true)));
              }));
        Jest.test("float", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Aeson_decode.withDefault(0, Aeson_decode.$$int, 1.23)));
              }));
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.withDefault(0, Aeson_decode.$$int, 23)));
              }));
        Jest.test("string", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Aeson_decode.withDefault(0, Aeson_decode.$$int, "test")));
              }));
        Jest.test("null", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Aeson_decode.withDefault(0, Aeson_decode.$$int, null)));
              }));
        Jest.test("array", (function () {
                return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Aeson_decode.withDefault(0, Aeson_decode.$$int, /* array */[])));
              }));
        return Jest.test("object", (function () {
                      return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Aeson_decode.withDefault(0, Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))));
                    }));
      }));

describe("map", (function () {
        Jest.test("int", (function () {
                return Jest.Expect[/* toEqual */12](25, Jest.Expect[/* expect */0](Aeson_decode.map((function (param) {
                                      return 2 + param | 0;
                                    }), Aeson_decode.$$int, 23)));
              }));
        return throws(/* None */0, (function (param) {
                      return Aeson_decode.map((function (param) {
                                    return 2 + param | 0;
                                  }), Aeson_decode.$$int, param);
                    }), /* :: */[
                    /* Bool */6,
                    /* :: */[
                      /* Float */0,
                      /* :: */[
                        /* String */2,
                        /* :: */[
                          /* Null */3,
                          /* :: */[
                            /* Array */4,
                            /* :: */[
                              /* Object */5,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      }));

describe("andThen", (function () {
        Jest.test("int -> int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.andThen((function () {
                                      return Aeson_decode.$$int;
                                    }), Aeson_decode.$$int, 23)));
              }));
        Jest.test("int -> int andThen float", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.andThen((function () {
                                      return Aeson_decode.$$float;
                                    }), Aeson_decode.$$int, 23)));
              }));
        Jest.test("int -> float andThen int", (function () {
                return Jest.Expect[/* toEqual */12](23, Jest.Expect[/* expect */0](Aeson_decode.andThen((function () {
                                      return Aeson_decode.$$int;
                                    }), Aeson_decode.$$float, 23)));
              }));
        throws(/* Some */["int andThen int "], (function (param) {
                return Aeson_decode.andThen((function () {
                              return Aeson_decode.$$int;
                            }), Aeson_decode.$$int, param);
              }), /* :: */[
              /* Bool */6,
              /* :: */[
                /* Float */0,
                /* :: */[
                  /* String */2,
                  /* :: */[
                    /* Null */3,
                    /* :: */[
                      /* Array */4,
                      /* :: */[
                        /* Object */5,
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]);
        throws(/* Some */["float andThen int "], (function (param) {
                return Aeson_decode.andThen((function () {
                              return Aeson_decode.$$int;
                            }), Aeson_decode.$$float, param);
              }), /* :: */[
              /* Float */0,
              /* [] */0
            ]);
        return throws(/* Some */["int to "], (function (param) {
                      return Aeson_decode.andThen((function () {
                                    return Aeson_decode.$$float;
                                  }), Aeson_decode.$$int, param);
                    }), /* :: */[
                    /* Float */0,
                    /* [] */0
                  ]);
      }));

describe("composite expressions", (function () {
        Jest.test("dict array array int", (function () {
                return Jest.Expect[/* toEqual */12]({
                            a: /* array */[
                              /* int array */[
                                1,
                                2
                              ],
                              /* int array */[3]
                            ],
                            b: /* array */[
                              /* int array */[4],
                              /* int array */[
                                5,
                                6
                              ]
                            ]
                          }, Jest.Expect[/* expect */0](Aeson_decode.dict((function (param) {
                                      return Aeson_decode.array((function (param) {
                                                    return Aeson_decode.array(Aeson_decode.$$int, param);
                                                  }), param);
                                    }), JSON.parse(" { \"a\": [[1, 2], [3]], \"b\": [[4], [5, 6]] } "))));
              }));
        Jest.test("dict array array int - heterogenous structure", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.dict((function (param) {
                                                return Aeson_decode.array((function (param) {
                                                              return Aeson_decode.array(Aeson_decode.$$int, param);
                                                            }), param);
                                              }), param);
                                }), JSON.parse(" { \"a\": [[1, 2], [true]], \"b\": [[4], [5, 6]] } ")));
              }));
        Jest.test("dict array array int - heterogenous structure 2", (function () {
                return Jest.Expect[/* toThrow */18](Jest.Expect[/* expectFn */1]((function (param) {
                                  return Aeson_decode.dict((function (param) {
                                                return Aeson_decode.array((function (param) {
                                                              return Aeson_decode.array(Aeson_decode.$$int, param);
                                                            }), param);
                                              }), param);
                                }), JSON.parse(" { \"a\": [[1, 2], \"foo\"], \"b\": [[4], [5, 6]] } ")));
              }));
        return Jest.test("field", (function () {
                      var json = JSON.parse(" { \"foo\": [1, 2, 3], \"bar\": \"baz\" } ");
                      return Jest.Expect[/* toEqual */12](/* tuple */[
                                  /* int array */[
                                    1,
                                    2,
                                    3
                                  ],
                                  "baz"
                                ], Jest.Expect[/* expect */0](/* tuple */[
                                      Aeson_decode.field("foo", (function (param) {
                                              return Aeson_decode.array(Aeson_decode.$$int, param);
                                            }), json),
                                      Aeson_decode.field("bar", Aeson_decode.string, json)
                                    ]));
                    }));
      }));

exports.Test = Test;
/*  Not a pure module */
