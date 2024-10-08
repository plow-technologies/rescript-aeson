'use strict';

var Jest = require("@glennsl/rescript-jest/lib/js/src/jest.js");
var Belt_Id = require("rescript/lib/js/belt_Id.js");
var Belt_Map = require("rescript/lib/js/belt_Map.js");
var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Belt_MapInt = require("rescript/lib/js/belt_MapInt.js");
var Aeson_decode = require("../src/Aeson_decode.js");
var Aeson_encode = require("../src/Aeson_encode.js");
var Belt_MapString = require("rescript/lib/js/belt_MapString.js");

function test(decoder, prefix, x) {
  switch (x) {
    case /* Float */0 :
        return Jest.test(prefix + "float", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, Aeson_encode.$$float(1.23)));
                    }));
    case /* Int */1 :
        return Jest.test(prefix + "int", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, 23));
                    }));
    case /* String */2 :
        return Jest.test(prefix + "string", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, "test"));
                    }));
    case /* Null */3 :
        return Jest.test(prefix + "null", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, null));
                    }));
    case /* Array */4 :
        return Jest.test(prefix + "array", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, []));
                    }));
    case /* Object */5 :
        return Jest.test(prefix + "object", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, Aeson_encode.object_(/* [] */0)));
                    }));
    case /* Bool */6 :
        return Jest.test(prefix + "bool", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, true));
                    }));
    
  }
}

function throws(_prefixOpt, decoder, _x) {
  while(true) {
    var prefixOpt = _prefixOpt;
    var x = _x;
    var prefix = prefixOpt !== undefined ? prefixOpt : "";
    if (!x) {
      return ;
    }
    test(decoder, prefix, x.hd);
    _x = x.tl;
    _prefixOpt = prefix;
    continue ;
  };
}

var Test = {
  test: test,
  throws: throws
};

function decodeOnpingKey(json) {
  var x = Aeson_decode.string(json);
  return /* OnpingKey */{
          _0: x
        };
}

var cmp = Caml_obj.compare;

var OnpingKeyComparable = Belt_Id.MakeComparable({
      cmp: cmp
    });

function decodePid(json) {
  var x = Aeson_decode.$$int(json);
  return /* Pid */{
          _0: x
        };
}

var cmp$1 = Caml_obj.compare;

var PidComparable = Belt_Id.MakeComparable({
      cmp: cmp$1
    });

Jest.describe("bool", (function (param) {
        Jest.test("bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.bool(true)), true);
              }));
        Jest.test("bool - false", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.bool(false)), false);
              }));
        throws(undefined, Aeson_decode.bool, {
              hd: /* Float */0,
              tl: {
                hd: /* Int */1,
                tl: {
                  hd: /* String */2,
                  tl: {
                    hd: /* Null */3,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("float", (function (param) {
        Jest.test("float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.$$float(Aeson_encode.$$float(1.23))), 1.23);
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.$$float(23)), 23);
              }));
        Jest.test("float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.$$float(Aeson_encode.$$float(Number("Infinity")))), Number("Infinity"));
              }));
        Jest.test("float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.$$float(Aeson_encode.$$float(Number("-Infinity")))), Number("-Infinity"));
              }));
        throws(undefined, Aeson_decode.$$float, {
              hd: /* Bool */6,
              tl: {
                hd: /* String */2,
                tl: {
                  hd: /* Null */3,
                  tl: {
                    hd: /* Array */4,
                    tl: {
                      hd: /* Object */5,
                      tl: /* [] */0
                    }
                  }
                }
              }
            });
      }));

Jest.describe("int", (function (param) {
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.$$int(23)), 23);
              }));
        Jest.test("int > 32-bit", (function (param) {
                var big_int = 2147483648;
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.$$int(big_int)), big_int);
              }));
        throws(undefined, Aeson_decode.$$int, {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* String */2,
                  tl: {
                    hd: /* Null */3,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("bigint", (function (param) {
        Jest.test("23", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.bigint(Aeson_encode.bigint(BigInt(23)))), BigInt(23));
              }));
        Jest.test("26423", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.bigint(Aeson_encode.bigint(BigInt(26423)))), BigInt(26423));
              }));
        Jest.test("-1289848928492483456726423", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.bigint(Aeson_encode.bigint(BigInt("-1289848928492483456726423")))), BigInt("-1289848928492483456726423"));
              }));
      }));

Jest.describe("string", (function (param) {
        Jest.test("string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.string("test")), "test");
              }));
        throws(undefined, Aeson_decode.string, {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* Int */1,
                  tl: {
                    hd: /* Null */3,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("date", (function (param) {
        var now = new Date("2017-12-08T06:03:22Z");
        Jest.test("date", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.date(Aeson_encode.date(now))), now);
              }));
      }));

Jest.describe("nullable", (function (param) {
        Jest.test("int -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.$$int, 23)), 23);
              }));
        Jest.test("null -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.$$int, null)), null);
              }));
        Jest.test("bool -> bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.bool, true)), true);
              }));
        Jest.test("float -> float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.$$float, Aeson_encode.$$float(1.23))), 1.23);
              }));
        Jest.test("string -> string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.string, "test")), "test");
              }));
        throws(undefined, (function (x) {
                return Aeson_decode.nullable(Aeson_decode.$$int, x);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* String */2,
                  tl: {
                    hd: /* Array */4,
                    tl: {
                      hd: /* Object */5,
                      tl: /* [] */0
                    }
                  }
                }
              }
            });
        throws(undefined, (function (x) {
                return Aeson_decode.nullable(Aeson_decode.bool, x);
              }), {
              hd: /* Int */1,
              tl: /* [] */0
            });
      }));

Jest.describe("nullAs", (function (param) {
        Jest.test("as 0 - null", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullAs(0, null)), 0);
              }));
        Jest.test("as Js.null", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullAs(null, null)), null);
              }));
        Jest.test("as None", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullAs(undefined, null)), undefined);
              }));
        Jest.test("as Some _", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.nullAs("foo", null)), "foo");
              }));
        throws(undefined, (function (x) {
                return Aeson_decode.nullAs(0, x);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* Int */1,
                  tl: {
                    hd: /* String */2,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("array", (function (param) {
        Jest.test("array", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.array(Aeson_decode.$$int, [])), []);
              }));
        Jest.test("array bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.array(Aeson_decode.bool, JSON.parse(" [true, false, true] "))), [
                            true,
                            false,
                            true
                          ]);
              }));
        Jest.test("array float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.array(Aeson_decode.$$float, JSON.parse(" [1, 2, 3] "))), [
                            1,
                            2,
                            3
                          ]);
              }));
        Jest.test("array int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.array(Aeson_decode.$$int, JSON.parse(" [1, 2, 3] "))), [
                            1,
                            2,
                            3
                          ]);
              }));
        Jest.test("array string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.array(Aeson_decode.string, JSON.parse(" [\"a\", \"b\", \"c\"] "))), [
                            "a",
                            "b",
                            "c"
                          ]);
              }));
        Jest.test("array nullAs", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.array((function (x) {
                                      return Aeson_decode.nullAs(null, x);
                                    }), JSON.parse(" [null, null, null] "))), [
                            null,
                            null,
                            null
                          ]);
              }));
        Jest.test("array int -> array bool", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.array(Aeson_decode.bool, x);
                                }), JSON.parse(" [1, 2, 3] ")));
              }));
        throws(undefined, (function (x) {
                return Aeson_decode.array(Aeson_decode.$$int, x);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* Int */1,
                  tl: {
                    hd: /* String */2,
                    tl: {
                      hd: /* Null */3,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("list", (function (param) {
        Jest.test("array", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.list(Aeson_decode.$$int, [])), /* [] */0);
              }));
        Jest.test("list bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.list(Aeson_decode.bool, JSON.parse(" [true, false, true] "))), {
                            hd: true,
                            tl: {
                              hd: false,
                              tl: {
                                hd: true,
                                tl: /* [] */0
                              }
                            }
                          });
              }));
        Jest.test("list float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.list(Aeson_decode.$$float, JSON.parse(" [1, 2, 3] "))), {
                            hd: 1,
                            tl: {
                              hd: 2,
                              tl: {
                                hd: 3,
                                tl: /* [] */0
                              }
                            }
                          });
              }));
        Jest.test("list int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.list(Aeson_decode.$$int, JSON.parse(" [1, 2, 3] "))), {
                            hd: 1,
                            tl: {
                              hd: 2,
                              tl: {
                                hd: 3,
                                tl: /* [] */0
                              }
                            }
                          });
              }));
        Jest.test("list string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.list(Aeson_decode.string, JSON.parse(" [\"a\", \"b\", \"c\"] "))), {
                            hd: "a",
                            tl: {
                              hd: "b",
                              tl: {
                                hd: "c",
                                tl: /* [] */0
                              }
                            }
                          });
              }));
        Jest.test("list nullAs", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.list((function (x) {
                                      return Aeson_decode.nullAs(null, x);
                                    }), JSON.parse(" [null, null, null] "))), {
                            hd: null,
                            tl: {
                              hd: null,
                              tl: {
                                hd: null,
                                tl: /* [] */0
                              }
                            }
                          });
              }));
        Jest.test("array int -> list bool", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.list(Aeson_decode.bool, x);
                                }), JSON.parse(" [1, 2, 3] ")));
              }));
        throws(undefined, (function (x) {
                return Aeson_decode.list(Aeson_decode.$$int, x);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* Int */1,
                  tl: {
                    hd: /* String */2,
                    tl: {
                      hd: /* Null */3,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("pair", (function (param) {
        Jest.test("pair string int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.pair(Aeson_decode.string, Aeson_decode.$$int, JSON.parse(" [\"a\", 3] "))), [
                            "a",
                            3
                          ]);
              }));
        Jest.test("pair int int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, JSON.parse(" [4, 3] "))), [
                            4,
                            3
                          ]);
              }));
        Jest.test("pair missing", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, x);
                                }), JSON.parse(" [4] ")));
              }));
        Jest.test("pair too large", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, x);
                                }), JSON.parse(" [3, 4, 5] ")));
              }));
        Jest.test("pair bad left type", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, x);
                                }), JSON.parse(" [\"3\", 4] ")));
              }));
        Jest.test("pair bad right type", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.pair(Aeson_decode.string, Aeson_decode.string, x);
                                }), JSON.parse(" [\"3\", 4] ")));
              }));
      }));

Jest.describe("tuple3", (function (param) {
        Jest.test("tuple3 string int string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple3(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" [\"a\", 3, \"b\"] "))), [
                            "a",
                            3,
                            "b"
                          ]);
              }));
      }));

Jest.describe("tuple4", (function (param) {
        Jest.test("tuple4 string int string bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple4(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, JSON.parse(" [\"a\", 3, \"b\", true] "))), [
                            "a",
                            3,
                            "b",
                            true
                          ]);
              }));
      }));

Jest.describe("tuple5", (function (param) {
        Jest.test("tuple5 string int string bool int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple5(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, JSON.parse(" [\"a\", 3, \"b\", true, 98] "))), [
                            "a",
                            3,
                            "b",
                            true,
                            98
                          ]);
              }));
      }));

Jest.describe("tuple6", (function (param) {
        Jest.test("tuple6 string int string bool int string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple6(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\"] "))), [
                            "a",
                            3,
                            "b",
                            true,
                            98,
                            "sleepy"
                          ]);
              }));
      }));

Jest.describe("tuple7", (function (param) {
        Jest.test("tuple7 string int string bool int string int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple7(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100] "))), [
                            "a",
                            3,
                            "b",
                            true,
                            98,
                            "sleepy",
                            100
                          ]);
              }));
      }));

Jest.describe("tuple8", (function (param) {
        Jest.test("tuple8 string int string bool int string int string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple8(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100, \"bedtime\"] "))), [
                            "a",
                            3,
                            "b",
                            true,
                            98,
                            "sleepy",
                            100,
                            "bedtime"
                          ]);
              }));
      }));

Jest.describe("tuple9", (function (param) {
        Jest.test("tuple9 string int string bool int string int string bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple9(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100, \"bedtime\", false] "))), [
                            "a",
                            3,
                            "b",
                            true,
                            98,
                            "sleepy",
                            100,
                            "bedtime",
                            false
                          ]);
              }));
      }));

Jest.describe("tuple10", (function (param) {
        Jest.test("tuple10 string int string bool int string int string bool int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tuple10(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100, \"bedtime\", false, 22] "))), [
                            "a",
                            3,
                            "b",
                            true,
                            98,
                            "sleepy",
                            100,
                            "bedtime",
                            false,
                            22
                          ]);
              }));
      }));

Jest.describe("singleEnumerator", (function (param) {
        Jest.test("singleEnumerator", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.singleEnumerator(/* SingleEnumerator */0, [])), /* SingleEnumerator */0);
              }));
      }));

Jest.describe("string pid Belt.Map.t", (function (param) {
        Jest.test("test", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.beltMap(decodePid, Aeson_decode.string, PidComparable, JSON.parse(" [[1, \"A\"], [2, \"B\"]] "))), Belt_Map.fromArray([
                                [
                                  /* Pid */{
                                    _0: 1
                                  },
                                  "A"
                                ],
                                [
                                  /* Pid */{
                                    _0: 2
                                  },
                                  "B"
                                ]
                              ], PidComparable));
              }));
      }));

Jest.describe("string onpingKey Belt.Map.t", (function (param) {
        Jest.test("test", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.beltMap(decodeOnpingKey, Aeson_decode.string, OnpingKeyComparable, JSON.parse(" [[\"a\", \"A\"], [\"b\", \"B\"]] "))), Belt_Map.fromArray([
                                [
                                  /* OnpingKey */{
                                    _0: "a"
                                  },
                                  "A"
                                ],
                                [
                                  /* OnpingKey */{
                                    _0: "b"
                                  },
                                  "B"
                                ]
                              ], OnpingKeyComparable));
              }));
      }));

Jest.describe("decode Belt.Map.t when object is given with string key", (function (param) {
        Jest.test("test", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.beltMap(decodeOnpingKey, Aeson_decode.string, OnpingKeyComparable, JSON.parse(" {\"a\": \"A\", \"b\": \"B\"} "))), Belt_Map.fromArray([
                                [
                                  /* OnpingKey */{
                                    _0: "a"
                                  },
                                  "A"
                                ],
                                [
                                  /* OnpingKey */{
                                    _0: "b"
                                  },
                                  "B"
                                ]
                              ], OnpingKeyComparable));
              }));
      }));

Jest.describe("decode Belt.Map.t when object is given with int key", (function (param) {
        Jest.test("test", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.beltMap(decodePid, Aeson_decode.string, PidComparable, JSON.parse(" {\"1\": \"A\", \"2\": \"B\"} "))), Belt_Map.fromArray([
                                [
                                  /* Pid */{
                                    _0: 1
                                  },
                                  "A"
                                ],
                                [
                                  /* Pid */{
                                    _0: 2
                                  },
                                  "B"
                                ]
                              ], PidComparable));
              }));
      }));

Jest.describe("string Belt.Map.Int.t", (function (param) {
        Jest.test("test", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.beltMapInt(Aeson_decode.string, JSON.parse(" {\"1\": \"A\", \"2\": \"B\"} "))), Belt_MapInt.fromArray([
                                [
                                  1,
                                  "A"
                                ],
                                [
                                  2,
                                  "B"
                                ]
                              ]));
              }));
      }));

Jest.describe("string Belt.Map.String.t", (function (param) {
        Jest.test("test", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.beltMapString(Aeson_decode.string, JSON.parse(" {\"a\": \"A\", \"b\": \"B\"} "))), Belt_MapString.fromArray([
                                [
                                  "a",
                                  "A"
                                ],
                                [
                                  "b",
                                  "B"
                                ]
                              ]));
              }));
      }));

Jest.describe("dict", (function (param) {
        Jest.test("object", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))), {});
              }));
        Jest.test("dict bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.bool, JSON.parse(" { \"a\": true, \"b\": false } "))), {
                            a: true,
                            b: false
                          });
              }));
        Jest.test("dict float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))), {
                            a: 1.2,
                            b: 2.3
                          });
              }));
        Jest.test("dict int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))), {
                            a: 1,
                            b: 2
                          });
              }));
        Jest.test("dict string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))), {
                            a: "x",
                            b: "y"
                          });
              }));
        Jest.test("dict nullAs", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.dict((function (x) {
                                      return Aeson_decode.nullAs(null, x);
                                    }), JSON.parse(" { \"a\": null, \"b\": null } "))), {
                            a: null,
                            b: null
                          });
              }));
        Jest.test("dict null -> dict string", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.dict(Aeson_decode.string, x);
                                }), JSON.parse(" { \"a\": null, \"b\": null } ")));
              }));
        throws(undefined, (function (x) {
                return Aeson_decode.dict(Aeson_decode.$$int, x);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* Int */1,
                  tl: {
                    hd: /* String */2,
                    tl: {
                      hd: /* Null */3,
                      tl: {
                        hd: /* Array */4,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("field", (function (param) {
        Jest.test("field bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.bool, JSON.parse(" { \"a\": true, \"b\": false } "))), false);
              }));
        Jest.test("field float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))), 2.3);
              }));
        Jest.test("field int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))), 2);
              }));
        Jest.test("field string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))), "y");
              }));
        Jest.test("field nullAs", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.field("b", (function (x) {
                                      return Aeson_decode.nullAs(null, x);
                                    }), JSON.parse(" { \"a\": null, \"b\": null } "))), null);
              }));
        Jest.test("field null -> field string", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.field("b", Aeson_decode.string, x);
                                }), JSON.parse(" { \"a\": null, \"b\": null } ")));
              }));
        throws(undefined, (function (x) {
                return Aeson_decode.field("foo", Aeson_decode.$$int, x);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* Int */1,
                  tl: {
                    hd: /* String */2,
                    tl: {
                      hd: /* Null */3,
                      tl: {
                        hd: /* Array */4,
                        tl: {
                          hd: /* Object */5,
                          tl: /* [] */0
                        }
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("at", (function (param) {
        Jest.test("at bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.at({
                                    hd: "a",
                                    tl: {
                                      hd: "x",
                                      tl: {
                                        hd: "y",
                                        tl: /* [] */0
                                      }
                                    }
                                  }, Aeson_decode.bool, JSON.parse(" {\n        \"a\": { \"x\" : { \"y\" : false } }, \n        \"b\": false \n      } "))), false);
              }));
        Jest.test("field nullAs", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.at({
                                    hd: "a",
                                    tl: {
                                      hd: "x",
                                      tl: /* [] */0
                                    }
                                  }, (function (x) {
                                      return Aeson_decode.nullAs(null, x);
                                    }), JSON.parse(" {\n        \"a\": { \"x\" : null },\n        \"b\": null\n      } "))), null);
              }));
        throws(undefined, (function (x) {
                return Aeson_decode.at({
                            hd: "foo",
                            tl: {
                              hd: "bar",
                              tl: /* [] */0
                            }
                          }, Aeson_decode.$$int, x);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* Int */1,
                  tl: {
                    hd: /* String */2,
                    tl: {
                      hd: /* Null */3,
                      tl: {
                        hd: /* Array */4,
                        tl: {
                          hd: /* Object */5,
                          tl: /* [] */0
                        }
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("optional", (function (param) {
        Jest.test("bool -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, true)), undefined);
              }));
        Jest.test("float -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, Aeson_encode.$$float(1.23))), undefined);
              }));
        Jest.test("int -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, 23)), 23);
              }));
        Jest.test("string -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, "test")), undefined);
              }));
        Jest.test("null -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, null)), undefined);
              }));
        Jest.test("array -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, [])), undefined);
              }));
        Jest.test("object -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))), undefined);
              }));
        Jest.test("bool -> bool ", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.bool, true)), true);
              }));
        Jest.test("float -> float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$float, Aeson_encode.$$float(1.23))), 1.23);
              }));
        Jest.test("string -> string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.string, "test")), "test");
              }));
        Jest.test("null -> null", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional((function (x) {
                                      return Aeson_decode.nullAs(null, x);
                                    }), null)), null);
              }));
        Jest.test("int -> bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.bool, 1)), undefined);
              }));
        Jest.test("optional field", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional((function (x) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, x);
                                    }), JSON.parse(" { \"x\": 2} "))), 2);
              }));
        Jest.test("optional field - incorrect type", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional((function (x) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, x);
                                    }), JSON.parse(" { \"x\": 2.3} "))), undefined);
              }));
        Jest.test("optional field - no such field", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optional((function (x) {
                                      return Aeson_decode.field("y", Aeson_decode.$$int, x);
                                    }), JSON.parse(" { \"x\": 2} "))), undefined);
              }));
        Jest.test("field optional", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.field("x", (function (x) {
                                      return Aeson_decode.optional(Aeson_decode.$$int, x);
                                    }), JSON.parse(" { \"x\": 2} "))), 2);
              }));
        Jest.test("field optional - incorrect type", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.field("x", (function (x) {
                                      return Aeson_decode.optional(Aeson_decode.$$int, x);
                                    }), JSON.parse(" { \"x\": 2.3} "))), undefined);
              }));
        Jest.test("field optional - no such field", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (json) {
                                  return Aeson_decode.field("y", (function (x) {
                                                return Aeson_decode.optional(Aeson_decode.$$int, x);
                                              }), json);
                                }), JSON.parse(" { \"x\": 2} ")));
              }));
      }));

Jest.describe("optionalField", (function (param) {
        Jest.test("optionalField", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optionalField("x", Aeson_decode.$$int, JSON.parse(" { \"x\": 2} "))), 2);
              }));
        Jest.test("optionalField - null returns None", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optionalField("x", Aeson_decode.$$int, JSON.parse(" { \"x\": null} "))), undefined);
              }));
        Jest.test("optionalField - null returns None", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optionalField("x", Aeson_decode.string, JSON.parse(" { \"x\": null} "))), undefined);
              }));
        Jest.test("optionalField - field does not exist", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.optionalField("y", Aeson_decode.$$int, JSON.parse(" { \"x\": 2} "))), undefined);
              }));
        Jest.test("field optional - no such field", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.optionalField("x", Aeson_decode.string, x);
                                }), JSON.parse(" { \"x\": 2} ")));
              }));
      }));

Jest.describe("oneOf", (function (param) {
        Jest.test("object with field", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.oneOf({
                                    hd: Aeson_decode.$$int,
                                    tl: {
                                      hd: (function (x) {
                                          return Aeson_decode.field("x", Aeson_decode.$$int, x);
                                        }),
                                      tl: /* [] */0
                                    }
                                  }, JSON.parse(" { \"x\": 2} "))), 2);
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.oneOf({
                                    hd: Aeson_decode.$$int,
                                    tl: {
                                      hd: (function (x) {
                                          return Aeson_decode.field("x", Aeson_decode.$$int, x);
                                        }),
                                      tl: /* [] */0
                                    }
                                  }, 23)), 23);
              }));
        throws(undefined, (function (json) {
                return Aeson_decode.oneOf({
                            hd: Aeson_decode.$$int,
                            tl: {
                              hd: (function (x) {
                                  return Aeson_decode.field("x", Aeson_decode.$$int, x);
                                }),
                              tl: /* [] */0
                            }
                          }, json);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* String */2,
                  tl: {
                    hd: /* Null */3,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("result", (function (param) {
        Jest.test("Ok", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.result(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Error\": \"hello\"} "))), {
                            TAG: /* Error */1,
                            _0: "hello"
                          });
              }));
        Jest.test("Error", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.result(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Ok\": 2} "))), {
                            TAG: /* Ok */0,
                            _0: 2
                          });
              }));
      }));

Jest.describe("either", (function (param) {
        Jest.test("Right", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.either(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Right\": \"hello\"} "))), {
                            TAG: /* Right */1,
                            _0: "hello"
                          });
              }));
        Jest.test("Left", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.either(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Left\": 2} "))), {
                            TAG: /* Left */0,
                            _0: 2
                          });
              }));
      }));

Jest.describe("tryEither", (function (param) {
        Jest.test("object with field", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tryEither(Aeson_decode.$$int, (function (x) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, x);
                                    }), JSON.parse(" { \"x\": 2} "))), 2);
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.tryEither(Aeson_decode.$$int, (function (x) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, x);
                                    }), 23)), 23);
              }));
        throws(undefined, (function (json) {
                return Aeson_decode.tryEither(Aeson_decode.$$int, (function (x) {
                              return Aeson_decode.field("x", Aeson_decode.$$int, x);
                            }), json);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* String */2,
                  tl: {
                    hd: /* Null */3,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("withDefault", (function (param) {
        Jest.test("bool", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, true)), 0);
              }));
        Jest.test("float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, Aeson_encode.$$float(1.23))), 0);
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, 23)), 23);
              }));
        Jest.test("string", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, "test")), 0);
              }));
        Jest.test("null", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, null)), 0);
              }));
        Jest.test("array", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, [])), 0);
              }));
        Jest.test("object", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))), 0);
              }));
      }));

Jest.describe("map", (function (param) {
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.map((function (x) {
                                      return x + 2 | 0;
                                    }), Aeson_decode.$$int, 23)), 25);
              }));
        throws(undefined, (function (json) {
                return Aeson_decode.map((function (x) {
                              return x + 2 | 0;
                            }), Aeson_decode.$$int, json);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* String */2,
                  tl: {
                    hd: /* Null */3,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
      }));

Jest.describe("andThen", (function (param) {
        Jest.test("int -> int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.andThen((function (param, b) {
                                      return Aeson_decode.$$int(b);
                                    }), Aeson_decode.$$int, 23)), 23);
              }));
        Jest.test("int -> int andThen float", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.andThen((function (param, b) {
                                      return Aeson_decode.$$float(b);
                                    }), Aeson_decode.$$int, 23)), 23);
              }));
        Jest.test("int -> float andThen int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.andThen((function (param, b) {
                                      return Aeson_decode.$$int(b);
                                    }), Aeson_decode.$$float, 23)), 23);
              }));
        throws("int andThen int ", (function (json) {
                return Aeson_decode.andThen((function (param, b) {
                              return Aeson_decode.$$int(b);
                            }), Aeson_decode.$$int, json);
              }), {
              hd: /* Bool */6,
              tl: {
                hd: /* Float */0,
                tl: {
                  hd: /* String */2,
                  tl: {
                    hd: /* Null */3,
                    tl: {
                      hd: /* Array */4,
                      tl: {
                        hd: /* Object */5,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            });
        throws("float andThen int ", (function (json) {
                return Aeson_decode.andThen((function (param, b) {
                              return Aeson_decode.$$int(b);
                            }), Aeson_decode.$$float, json);
              }), {
              hd: /* Float */0,
              tl: /* [] */0
            });
        throws("int to ", (function (json) {
                return Aeson_decode.andThen((function (param, b) {
                              return Aeson_decode.$$float(b);
                            }), Aeson_decode.$$int, json);
              }), {
              hd: /* Float */0,
              tl: /* [] */0
            });
      }));

Jest.describe("composite expressions", (function (param) {
        Jest.test("dict array array int", (function (param) {
                return Jest.Expect.toEqual(Jest.Expect.expect(Aeson_decode.dict((function (x) {
                                      return Aeson_decode.array((function (y) {
                                                    return Aeson_decode.array(Aeson_decode.$$int, y);
                                                  }), x);
                                    }), JSON.parse(" { \"a\": [[1, 2], [3]], \"b\": [[4], [5, 6]] } "))), {
                            a: [
                              [
                                1,
                                2
                              ],
                              [3]
                            ],
                            b: [
                              [4],
                              [
                                5,
                                6
                              ]
                            ]
                          });
              }));
        Jest.test("dict array array int - heterogenous structure", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.array((function (y) {
                                                return Aeson_decode.array(Aeson_decode.$$int, y);
                                              }), x);
                                }), JSON.parse(" { \"a\": [[1, 2], [true]], \"b\": [[4], [5, 6]] } ")));
              }));
        Jest.test("dict array array int - heterogenous structure 2", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (x) {
                                  return Aeson_decode.array((function (y) {
                                                return Aeson_decode.array(Aeson_decode.$$int, y);
                                              }), x);
                                }), JSON.parse(" { \"a\": [[1, 2], \"foo\"], \"b\": [[4], [5, 6]] } ")));
              }));
        Jest.test("field", (function (param) {
                var json = JSON.parse(" { \"foo\": [1, 2, 3], \"bar\": \"baz\" } ");
                return Jest.Expect.toEqual(Jest.Expect.expect([
                                Aeson_decode.field("foo", (function (x) {
                                        return Aeson_decode.array(Aeson_decode.$$int, x);
                                      }), json),
                                Aeson_decode.field("bar", Aeson_decode.string, json)
                              ]), [
                            [
                              1,
                              2,
                              3
                            ],
                            "baz"
                          ]);
              }));
      }));

exports.Test = Test;
exports.decodeOnpingKey = decodeOnpingKey;
exports.OnpingKeyComparable = OnpingKeyComparable;
exports.decodePid = decodePid;
exports.PidComparable = PidComparable;
/* OnpingKeyComparable Not a pure module */
