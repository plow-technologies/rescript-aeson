'use strict';

var U = require("bs-zarith/lib/js/src/U.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Bigint = require("bs-zarith/lib/js/src/Bigint.js");
var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Belt_MapInt = require("bs-platform/lib/js/belt_MapInt.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Aeson_decode = require("../src/Aeson_decode.js");
var Aeson_encode = require("../src/Aeson_encode.js");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");

function test(decoder, prefix, param) {
  switch (param) {
    case /* Float */0 :
        return Jest.test(prefix + "float", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn(decoder, 1.23));
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

function throws(_$staropt$star, decoder, _param) {
  while(true) {
    var param = _param;
    var $staropt$star = _$staropt$star;
    var prefix = $staropt$star !== undefined ? $staropt$star : "";
    if (!param) {
      return ;
    }
    test(decoder, prefix, param.hd);
    _param = param.tl;
    _$staropt$star = prefix;
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

var cmp = Caml_obj.caml_compare;

var OnpingKeyComparable = Belt_Id.MakeComparable({
      cmp: cmp
    });

function decodePid(json) {
  var x = Aeson_decode.$$int(json);
  return /* Pid */{
          _0: x
        };
}

var cmp$1 = Caml_obj.caml_compare;

var PidComparable = Belt_Id.MakeComparable({
      cmp: cmp$1
    });

Jest.describe("bool", (function (param) {
        Jest.test("bool", (function (param) {
                return Jest.Expect.toEqual(true, Jest.Expect.expect(Aeson_decode.bool(true)));
              }));
        Jest.test("bool - false", (function (param) {
                return Jest.Expect.toEqual(false, Jest.Expect.expect(Aeson_decode.bool(false)));
              }));
        return throws(undefined, Aeson_decode.bool, {
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
                return Jest.Expect.toEqual(1.23, Jest.Expect.expect(Aeson_decode.$$float(1.23)));
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.$$float(23)));
              }));
        return throws(undefined, Aeson_decode.$$float, {
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
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.$$int(23)));
              }));
        Jest.test("int > 32-bit", (function (param) {
                var big_int = 2147483648;
                return Jest.Expect.toEqual(big_int, Jest.Expect.expect(Aeson_decode.$$int(big_int)));
              }));
        return throws(undefined, Aeson_decode.$$int, {
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

Jest.describe("int32", (function (param) {
        Jest.test("int32", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.int32(23)));
              }));
        return Jest.test("int32", (function (param) {
                      return Jest.Expect.toEqual(-23223, Jest.Expect.expect(Aeson_decode.int32(-23223)));
                    }));
      }));

Jest.describe("int64", (function (param) {
        Jest.test("int64", (function (param) {
                return Jest.Expect.toEqual(Caml_int64.mk(23, 0), Jest.Expect.expect(Aeson_decode.int64("23")));
              }));
        Jest.test("int64", (function (param) {
                return Jest.Expect.toEqual(Caml_int64.mk(23, 0), Jest.Expect.expect(Aeson_decode.int64(23)));
              }));
        return Jest.test("int64", (function (param) {
                      return Jest.Expect.toEqual([
                                  0,
                                  23
                                ], Jest.Expect.expect(Aeson_decode.int64(23)));
                    }));
      }));

Jest.describe("int64_of_array", (function (param) {
        Jest.test("int64_of_array", (function (param) {
                return Jest.Expect.toEqual(Caml_int64.mk(23, 0), Jest.Expect.expect(Aeson_decode.int64_of_array(Caml_int64.mk(23, 0))));
              }));
        Jest.test("int64_of_array", (function (param) {
                return Jest.Expect.toEqual(Caml_format.caml_int64_of_string("9223372036854775807"), Jest.Expect.expect(Aeson_decode.int64_of_array(Caml_format.caml_int64_of_string("9223372036854775807"))));
              }));
        return Jest.test("int64_of_array", (function (param) {
                      return Jest.Expect.toEqual(Caml_format.caml_int64_of_string("-9223372036854775807"), Jest.Expect.expect(Aeson_decode.int64_of_array(Caml_format.caml_int64_of_string("-9223372036854775807"))));
                    }));
      }));

Jest.describe("int64_of_string", (function (param) {
        Jest.test("23", (function (param) {
                return Jest.Expect.toEqual(Caml_int64.mk(23, 0), Jest.Expect.expect(Aeson_decode.int64_of_string(Aeson_encode.int64_to_string(Caml_int64.mk(23, 0)))));
              }));
        Jest.test("-1000", (function (param) {
                return Jest.Expect.toEqual(Caml_int64.mk(-1000, -1), Jest.Expect.expect(Aeson_decode.int64_of_string(Aeson_encode.int64_to_string(Caml_int64.mk(-1000, -1)))));
              }));
        Jest.test("-1", (function (param) {
                return Jest.Expect.toEqual(Caml_int64.neg_one, Jest.Expect.expect(Aeson_decode.int64_of_string(Aeson_encode.int64_to_string(Caml_int64.neg_one))));
              }));
        return Jest.test("23", (function (param) {
                      return Jest.Expect.toEqual(Caml_format.caml_int64_of_string("999999999999"), Jest.Expect.expect(Aeson_decode.int64_of_string(Aeson_encode.int64_to_string(Caml_format.caml_int64_of_string("999999999999")))));
                    }));
      }));

Jest.describe("uint8", (function (param) {
        Jest.test("uint8", (function (param) {
                return Jest.Expect.toEqual(U.UInt8.ofInt(23), Jest.Expect.expect(Aeson_decode.uint8(Aeson_encode.uint8(U.UInt8.ofInt(23)))));
              }));
        return Jest.test("uint8", (function (param) {
                      return Jest.Expect.toEqual(U.UInt8.ofInt(255), Jest.Expect.expect(Aeson_decode.uint8(Aeson_encode.uint8(U.UInt8.ofInt(255)))));
                    }));
      }));

Jest.describe("uint16", (function (param) {
        Jest.test("uint16", (function (param) {
                return Jest.Expect.toEqual(U.UInt16.ofInt(23), Jest.Expect.expect(Aeson_decode.uint16(Aeson_encode.uint16(U.UInt16.ofInt(23)))));
              }));
        return Jest.test("uint16", (function (param) {
                      return Jest.Expect.toEqual(U.UInt16.ofInt(1233), Jest.Expect.expect(Aeson_decode.uint16(Aeson_encode.uint16(U.UInt16.ofInt(1233)))));
                    }));
      }));

Jest.describe("uint32", (function (param) {
        Jest.test("uint32", (function (param) {
                return Jest.Expect.toEqual(U.UInt32.ofInt(23), Jest.Expect.expect(Aeson_decode.uint32(Aeson_encode.uint32(U.UInt32.ofInt(23)))));
              }));
        return Jest.test("uint32", (function (param) {
                      return Jest.Expect.toEqual(U.UInt32.ofInt(23223), Jest.Expect.expect(Aeson_decode.uint32(Aeson_encode.uint32(U.UInt32.ofInt(23223)))));
                    }));
      }));

Jest.describe("uint64", (function (param) {
        Jest.test("uint64", (function (param) {
                return Jest.Expect.toEqual(U.UInt64.ofInt(23), Jest.Expect.expect(Aeson_decode.uint64(Aeson_encode.uint64(U.UInt64.ofInt(23)))));
              }));
        return Jest.test("uint64", (function (param) {
                      return Jest.Expect.toEqual(U.UInt64.ofInt(26423), Jest.Expect.expect(Aeson_decode.uint64(Aeson_encode.uint64(U.UInt64.ofInt(26423)))));
                    }));
      }));

Jest.describe("bigint", (function (param) {
        Jest.test("23", (function (param) {
                return Jest.Expect.toEqual(Bigint.of_int(23), Jest.Expect.expect(Aeson_decode.bigint(Aeson_encode.bigint(Bigint.of_int(23)))));
              }));
        Jest.test("26423", (function (param) {
                return Jest.Expect.toEqual(Bigint.of_int(26423), Jest.Expect.expect(Aeson_decode.bigint(Aeson_encode.bigint(Bigint.of_int(26423)))));
              }));
        return Jest.test("-1289848928492483456726423", (function (param) {
                      return Jest.Expect.toEqual(Bigint.of_string("-1289848928492483456726423"), Jest.Expect.expect(Aeson_decode.bigint(Aeson_encode.bigint(Bigint.of_string("-1289848928492483456726423")))));
                    }));
      }));

Jest.describe("string", (function (param) {
        Jest.test("string", (function (param) {
                return Jest.Expect.toEqual("test", Jest.Expect.expect(Aeson_decode.string("test")));
              }));
        return throws(undefined, Aeson_decode.string, {
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
        return Jest.test("date", (function (param) {
                      return Jest.Expect.toEqual(now, Jest.Expect.expect(Aeson_decode.date(Aeson_encode.date(now))));
                    }));
      }));

Jest.describe("nullable", (function (param) {
        Jest.test("int -> int", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.$$int, 23)));
              }));
        Jest.test("null -> int", (function (param) {
                return Jest.Expect.toEqual(null, Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.$$int, null)));
              }));
        Jest.test("bool -> bool", (function (param) {
                return Jest.Expect.toEqual(true, Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.bool, true)));
              }));
        Jest.test("float -> float", (function (param) {
                return Jest.Expect.toEqual(1.23, Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function (param) {
                return Jest.Expect.toEqual("test", Jest.Expect.expect(Aeson_decode.nullable(Aeson_decode.string, "test")));
              }));
        Jest.test("null -> null", (function (param) {
                var partial_arg = null;
                return Jest.Expect.toEqual(null, Jest.Expect.expect(Aeson_decode.nullable((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), null)));
              }));
        throws(undefined, (function (param) {
                return Aeson_decode.nullable(Aeson_decode.$$int, param);
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
        return throws(undefined, (function (param) {
                      return Aeson_decode.nullable(Aeson_decode.bool, param);
                    }), {
                    hd: /* Int */1,
                    tl: /* [] */0
                  });
      }));

Jest.describe("nullAs", (function (param) {
        Jest.test("as 0 - null", (function (param) {
                return Jest.Expect.toEqual(0, Jest.Expect.expect(Aeson_decode.nullAs(0, null)));
              }));
        Jest.test("as Js.null", (function (param) {
                return Jest.Expect.toEqual(null, Jest.Expect.expect(Aeson_decode.nullAs(null, null)));
              }));
        Jest.test("as None", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.nullAs(undefined, null)));
              }));
        Jest.test("as Some _", (function (param) {
                return Jest.Expect.toEqual("foo", Jest.Expect.expect(Aeson_decode.nullAs("foo", null)));
              }));
        return throws(undefined, (function (param) {
                      return Aeson_decode.nullAs(0, param);
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
                return Jest.Expect.toEqual([], Jest.Expect.expect(Aeson_decode.array(Aeson_decode.$$int, [])));
              }));
        Jest.test("array bool", (function (param) {
                return Jest.Expect.toEqual([
                            true,
                            false,
                            true
                          ], Jest.Expect.expect(Aeson_decode.array(Aeson_decode.bool, JSON.parse(" [true, false, true] "))));
              }));
        Jest.test("array float", (function (param) {
                return Jest.Expect.toEqual([
                            1,
                            2,
                            3
                          ], Jest.Expect.expect(Aeson_decode.array(Aeson_decode.$$float, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("array int", (function (param) {
                return Jest.Expect.toEqual([
                            1,
                            2,
                            3
                          ], Jest.Expect.expect(Aeson_decode.array(Aeson_decode.$$int, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("array string", (function (param) {
                return Jest.Expect.toEqual([
                            "a",
                            "b",
                            "c"
                          ], Jest.Expect.expect(Aeson_decode.array(Aeson_decode.string, JSON.parse(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("array nullAs", (function (param) {
                var partial_arg = null;
                return Jest.Expect.toEqual([
                            null,
                            null,
                            null
                          ], Jest.Expect.expect(Aeson_decode.array((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" [null, null, null] "))));
              }));
        Jest.test("array int -> array bool", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.array(Aeson_decode.bool, param);
                                }), JSON.parse(" [1, 2, 3] ")));
              }));
        return throws(undefined, (function (param) {
                      return Aeson_decode.array(Aeson_decode.$$int, param);
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
                return Jest.Expect.toEqual(/* [] */0, Jest.Expect.expect(Aeson_decode.list(Aeson_decode.$$int, [])));
              }));
        Jest.test("list bool", (function (param) {
                return Jest.Expect.toEqual({
                            hd: true,
                            tl: {
                              hd: false,
                              tl: {
                                hd: true,
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Aeson_decode.list(Aeson_decode.bool, JSON.parse(" [true, false, true] "))));
              }));
        Jest.test("list float", (function (param) {
                return Jest.Expect.toEqual({
                            hd: 1,
                            tl: {
                              hd: 2,
                              tl: {
                                hd: 3,
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Aeson_decode.list(Aeson_decode.$$float, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("list int", (function (param) {
                return Jest.Expect.toEqual({
                            hd: 1,
                            tl: {
                              hd: 2,
                              tl: {
                                hd: 3,
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Aeson_decode.list(Aeson_decode.$$int, JSON.parse(" [1, 2, 3] "))));
              }));
        Jest.test("list string", (function (param) {
                return Jest.Expect.toEqual({
                            hd: "a",
                            tl: {
                              hd: "b",
                              tl: {
                                hd: "c",
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Aeson_decode.list(Aeson_decode.string, JSON.parse(" [\"a\", \"b\", \"c\"] "))));
              }));
        Jest.test("list nullAs", (function (param) {
                var partial_arg = null;
                return Jest.Expect.toEqual({
                            hd: null,
                            tl: {
                              hd: null,
                              tl: {
                                hd: null,
                                tl: /* [] */0
                              }
                            }
                          }, Jest.Expect.expect(Aeson_decode.list((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" [null, null, null] "))));
              }));
        Jest.test("array int -> list bool", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.list(Aeson_decode.bool, param);
                                }), JSON.parse(" [1, 2, 3] ")));
              }));
        return throws(undefined, (function (param) {
                      return Aeson_decode.list(Aeson_decode.$$int, param);
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
                return Jest.Expect.toEqual([
                            "a",
                            3
                          ], Jest.Expect.expect(Aeson_decode.pair(Aeson_decode.string, Aeson_decode.$$int, JSON.parse(" [\"a\", 3] "))));
              }));
        Jest.test("pair int int", (function (param) {
                return Jest.Expect.toEqual([
                            4,
                            3
                          ], Jest.Expect.expect(Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, JSON.parse(" [4, 3] "))));
              }));
        Jest.test("pair missing", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, param);
                                }), JSON.parse(" [4] ")));
              }));
        Jest.test("pair too large", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, param);
                                }), JSON.parse(" [3, 4, 5] ")));
              }));
        Jest.test("pair bad left type", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.pair(Aeson_decode.$$int, Aeson_decode.$$int, param);
                                }), JSON.parse(" [\"3\", 4] ")));
              }));
        return Jest.test("pair bad right type", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                        return Aeson_decode.pair(Aeson_decode.string, Aeson_decode.string, param);
                                      }), JSON.parse(" [\"3\", 4] ")));
                    }));
      }));

Jest.describe("tuple3", (function (param) {
        return Jest.test("tuple3 string int string", (function (param) {
                      return Jest.Expect.toEqual([
                                  "a",
                                  3,
                                  "b"
                                ], Jest.Expect.expect(Aeson_decode.tuple3(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" [\"a\", 3, \"b\"] "))));
                    }));
      }));

Jest.describe("tuple4", (function (param) {
        return Jest.test("tuple4 string int string bool", (function (param) {
                      return Jest.Expect.toEqual([
                                  "a",
                                  3,
                                  "b",
                                  true
                                ], Jest.Expect.expect(Aeson_decode.tuple4(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, JSON.parse(" [\"a\", 3, \"b\", true] "))));
                    }));
      }));

Jest.describe("tuple5", (function (param) {
        return Jest.test("tuple5 string int string bool int", (function (param) {
                      return Jest.Expect.toEqual([
                                  "a",
                                  3,
                                  "b",
                                  true,
                                  98
                                ], Jest.Expect.expect(Aeson_decode.tuple5(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, JSON.parse(" [\"a\", 3, \"b\", true, 98] "))));
                    }));
      }));

Jest.describe("tuple6", (function (param) {
        return Jest.test("tuple6 string int string bool int string", (function (param) {
                      return Jest.Expect.toEqual([
                                  "a",
                                  3,
                                  "b",
                                  true,
                                  98,
                                  "sleepy"
                                ], Jest.Expect.expect(Aeson_decode.tuple6(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\"] "))));
                    }));
      }));

Jest.describe("tuple7", (function (param) {
        return Jest.test("tuple7 string int string bool int string int", (function (param) {
                      return Jest.Expect.toEqual([
                                  "a",
                                  3,
                                  "b",
                                  true,
                                  98,
                                  "sleepy",
                                  100
                                ], Jest.Expect.expect(Aeson_decode.tuple7(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100] "))));
                    }));
      }));

Jest.describe("tuple8", (function (param) {
        return Jest.test("tuple8 string int string bool int string int string", (function (param) {
                      return Jest.Expect.toEqual([
                                  "a",
                                  3,
                                  "b",
                                  true,
                                  98,
                                  "sleepy",
                                  100,
                                  "bedtime"
                                ], Jest.Expect.expect(Aeson_decode.tuple8(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100, \"bedtime\"] "))));
                    }));
      }));

Jest.describe("tuple9", (function (param) {
        return Jest.test("tuple9 string int string bool int string int string bool", (function (param) {
                      return Jest.Expect.toEqual([
                                  "a",
                                  3,
                                  "b",
                                  true,
                                  98,
                                  "sleepy",
                                  100,
                                  "bedtime",
                                  false
                                ], Jest.Expect.expect(Aeson_decode.tuple9(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100, \"bedtime\", false] "))));
                    }));
      }));

Jest.describe("tuple10", (function (param) {
        return Jest.test("tuple10 string int string bool int string int string bool int", (function (param) {
                      return Jest.Expect.toEqual([
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
                                ], Jest.Expect.expect(Aeson_decode.tuple10(Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.$$int, Aeson_decode.string, Aeson_decode.bool, Aeson_decode.$$int, JSON.parse(" [\"a\", 3, \"b\", true, 98, \"sleepy\", 100, \"bedtime\", false, 22] "))));
                    }));
      }));

Jest.describe("singleEnumerator", (function (param) {
        return Jest.test("singleEnumerator", (function (param) {
                      return Jest.Expect.toEqual(/* SingleEnumerator */0, Jest.Expect.expect(Aeson_decode.singleEnumerator(/* SingleEnumerator */0, [])));
                    }));
      }));

Jest.describe("string pid Belt.Map.t", (function (param) {
        return Jest.test("test", (function (param) {
                      return Jest.Expect.toEqual(Belt_Map.fromArray([
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
                                    ], PidComparable), Jest.Expect.expect(Aeson_decode.beltMap(decodePid, Aeson_decode.string, PidComparable, JSON.parse(" [[1, \"A\"], [2, \"B\"]] "))));
                    }));
      }));

Jest.describe("string onpingKey Belt.Map.t", (function (param) {
        return Jest.test("test", (function (param) {
                      return Jest.Expect.toEqual(Belt_Map.fromArray([
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
                                    ], OnpingKeyComparable), Jest.Expect.expect(Aeson_decode.beltMap(decodeOnpingKey, Aeson_decode.string, OnpingKeyComparable, JSON.parse(" [[\"a\", \"A\"], [\"b\", \"B\"]] "))));
                    }));
      }));

Jest.describe("string Belt.Map.Int.t", (function (param) {
        return Jest.test("test", (function (param) {
                      return Jest.Expect.toEqual(Belt_MapInt.fromArray([
                                      [
                                        1,
                                        "A"
                                      ],
                                      [
                                        2,
                                        "B"
                                      ]
                                    ]), Jest.Expect.expect(Aeson_decode.beltMapInt(Aeson_decode.string, JSON.parse(" {\"1\": \"A\", \"2\": \"B\"} "))));
                    }));
      }));

Jest.describe("string Belt.Map.String.t", (function (param) {
        return Jest.test("test", (function (param) {
                      return Jest.Expect.toEqual(Belt_MapString.fromArray([
                                      [
                                        "a",
                                        "A"
                                      ],
                                      [
                                        "b",
                                        "B"
                                      ]
                                    ]), Jest.Expect.expect(Aeson_decode.beltMapString(Aeson_decode.string, JSON.parse(" {\"a\": \"A\", \"b\": \"B\"} "))));
                    }));
      }));

Jest.describe("dict", (function (param) {
        Jest.test("object", (function (param) {
                return Jest.Expect.toEqual({}, Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))));
              }));
        Jest.test("dict bool", (function (param) {
                return Jest.Expect.toEqual({
                            a: true,
                            b: false
                          }, Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.bool, JSON.parse(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("dict float", (function (param) {
                return Jest.Expect.toEqual({
                            a: 1.2,
                            b: 2.3
                          }, Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("dict int", (function (param) {
                return Jest.Expect.toEqual({
                            a: 1,
                            b: 2
                          }, Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("dict string", (function (param) {
                return Jest.Expect.toEqual({
                            a: "x",
                            b: "y"
                          }, Jest.Expect.expect(Aeson_decode.dict(Aeson_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("dict nullAs", (function (param) {
                var partial_arg = null;
                return Jest.Expect.toEqual({
                            a: null,
                            b: null
                          }, Jest.Expect.expect(Aeson_decode.dict((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("dict null -> dict string", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.dict(Aeson_decode.string, param);
                                }), JSON.parse(" { \"a\": null, \"b\": null } ")));
              }));
        return throws(undefined, (function (param) {
                      return Aeson_decode.dict(Aeson_decode.$$int, param);
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
                return Jest.Expect.toEqual(false, Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.bool, JSON.parse(" { \"a\": true, \"b\": false } "))));
              }));
        Jest.test("field float", (function (param) {
                return Jest.Expect.toEqual(2.3, Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.$$float, JSON.parse(" { \"a\": 1.2, \"b\": 2.3 } "))));
              }));
        Jest.test("field int", (function (param) {
                return Jest.Expect.toEqual(2, Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.$$int, JSON.parse(" { \"a\": 1, \"b\": 2 } "))));
              }));
        Jest.test("field string", (function (param) {
                return Jest.Expect.toEqual("y", Jest.Expect.expect(Aeson_decode.field("b", Aeson_decode.string, JSON.parse(" { \"a\": \"x\", \"b\": \"y\" } "))));
              }));
        Jest.test("field nullAs", (function (param) {
                var partial_arg = null;
                return Jest.Expect.toEqual(null, Jest.Expect.expect(Aeson_decode.field("b", (function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), JSON.parse(" { \"a\": null, \"b\": null } "))));
              }));
        Jest.test("field null -> field string", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.field("b", Aeson_decode.string, param);
                                }), JSON.parse(" { \"a\": null, \"b\": null } ")));
              }));
        return throws(undefined, (function (param) {
                      return Aeson_decode.field("foo", Aeson_decode.$$int, param);
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
                return Jest.Expect.toEqual(false, Jest.Expect.expect(Aeson_decode.at({
                                      hd: "a",
                                      tl: {
                                        hd: "x",
                                        tl: {
                                          hd: "y",
                                          tl: /* [] */0
                                        }
                                      }
                                    }, Aeson_decode.bool)(JSON.parse(" {\n        \"a\": { \"x\" : { \"y\" : false } }, \n        \"b\": false \n      } "))));
              }));
        Jest.test("field nullAs", (function (param) {
                var partial_arg = null;
                return Jest.Expect.toEqual(null, Jest.Expect.expect(Aeson_decode.at({
                                      hd: "a",
                                      tl: {
                                        hd: "x",
                                        tl: /* [] */0
                                      }
                                    }, (function (param) {
                                        return Aeson_decode.nullAs(partial_arg, param);
                                      }))(JSON.parse(" {\n        \"a\": { \"x\" : null }, \n        \"b\": null \n      } "))));
              }));
        return throws(undefined, Aeson_decode.at({
                        hd: "foo",
                        tl: {
                          hd: "bar",
                          tl: /* [] */0
                        }
                      }, Aeson_decode.$$int), {
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
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, true)));
              }));
        Jest.test("float -> int", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, 1.23)));
              }));
        Jest.test("int -> int", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, 23)));
              }));
        Jest.test("int32 -> int32", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.int32, 23)));
              }));
        Jest.test("int64 -> int64", (function (param) {
                return Jest.Expect.toEqual(Caml_int64.mk(64, 0), Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.int64_of_array, Caml_int64.mk(64, 0))));
              }));
        Jest.test("string -> int", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, "test")));
              }));
        Jest.test("null -> int", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, null)));
              }));
        Jest.test("array -> int", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, [])));
              }));
        Jest.test("object -> int", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))));
              }));
        Jest.test("bool -> bool ", (function (param) {
                return Jest.Expect.toEqual(true, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.bool, true)));
              }));
        Jest.test("float -> float", (function (param) {
                return Jest.Expect.toEqual(1.23, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.$$float, 1.23)));
              }));
        Jest.test("string -> string", (function (param) {
                return Jest.Expect.toEqual("test", Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.string, "test")));
              }));
        Jest.test("null -> null", (function (param) {
                var partial_arg = null;
                return Jest.Expect.toEqual(null, Jest.Expect.expect(Aeson_decode.optional((function (param) {
                                      return Aeson_decode.nullAs(partial_arg, param);
                                    }), null)));
              }));
        Jest.test("int -> bool", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional(Aeson_decode.bool, 1)));
              }));
        Jest.test("optional field", (function (param) {
                return Jest.Expect.toEqual(2, Jest.Expect.expect(Aeson_decode.optional((function (param) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("optional field - incorrect type", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional((function (param) {
                                      return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2.3} "))));
              }));
        Jest.test("optional field - no such field", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optional((function (param) {
                                      return Aeson_decode.field("y", Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("field optional", (function (param) {
                return Jest.Expect.toEqual(2, Jest.Expect.expect(Aeson_decode.field("x", (function (param) {
                                      return Aeson_decode.optional(Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("field optional - incorrect type", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.field("x", (function (param) {
                                      return Aeson_decode.optional(Aeson_decode.$$int, param);
                                    }), JSON.parse(" { \"x\": 2.3} "))));
              }));
        return Jest.test("field optional - no such field", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                        return Aeson_decode.field("y", (function (param) {
                                                      return Aeson_decode.optional(Aeson_decode.$$int, param);
                                                    }), param);
                                      }), JSON.parse(" { \"x\": 2} ")));
                    }));
      }));

Jest.describe("optionalField", (function (param) {
        Jest.test("optionalField", (function (param) {
                return Jest.Expect.toEqual(2, Jest.Expect.expect(Aeson_decode.optionalField("x", Aeson_decode.$$int, JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("optionalField - null returns None", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optionalField("x", Aeson_decode.$$int, JSON.parse(" { \"x\": null} "))));
              }));
        Jest.test("optionalField - null returns None", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optionalField("x", Aeson_decode.string, JSON.parse(" { \"x\": null} "))));
              }));
        Jest.test("optionalField - field does not exist", (function (param) {
                return Jest.Expect.toEqual(undefined, Jest.Expect.expect(Aeson_decode.optionalField("y", Aeson_decode.$$int, JSON.parse(" { \"x\": 2} "))));
              }));
        return Jest.test("field optional - no such field", (function (param) {
                      return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                        return Aeson_decode.optionalField("x", Aeson_decode.string, param);
                                      }), JSON.parse(" { \"x\": 2} ")));
                    }));
      }));

Jest.describe("oneOf", (function (param) {
        Jest.test("object with field", (function (param) {
                return Jest.Expect.toEqual(2, Jest.Expect.expect(Aeson_decode.oneOf({
                                    hd: Aeson_decode.$$int,
                                    tl: {
                                      hd: (function (param) {
                                          return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                        }),
                                      tl: /* [] */0
                                    }
                                  }, JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.oneOf({
                                    hd: Aeson_decode.$$int,
                                    tl: {
                                      hd: (function (param) {
                                          return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                        }),
                                      tl: /* [] */0
                                    }
                                  }, 23)));
              }));
        var partial_arg_1 = {
          hd: (function (param) {
              return Aeson_decode.field("x", Aeson_decode.$$int, param);
            }),
          tl: /* [] */0
        };
        var partial_arg = {
          hd: Aeson_decode.$$int,
          tl: partial_arg_1
        };
        return throws(undefined, (function (param) {
                      return Aeson_decode.oneOf(partial_arg, param);
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
                return Jest.Expect.toEqual({
                            TAG: /* Error */1,
                            _0: "hello"
                          }, Jest.Expect.expect(Aeson_decode.result(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Error\": \"hello\"} "))));
              }));
        return Jest.test("Error", (function (param) {
                      return Jest.Expect.toEqual({
                                  TAG: /* Ok */0,
                                  _0: 2
                                }, Jest.Expect.expect(Aeson_decode.result(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Ok\": 2} "))));
                    }));
      }));

Jest.describe("either", (function (param) {
        Jest.test("Right", (function (param) {
                return Jest.Expect.toEqual({
                            TAG: /* Right */1,
                            _0: "hello"
                          }, Jest.Expect.expect(Aeson_decode.either(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Right\": \"hello\"} "))));
              }));
        return Jest.test("Left", (function (param) {
                      return Jest.Expect.toEqual({
                                  TAG: /* Left */0,
                                  _0: 2
                                }, Jest.Expect.expect(Aeson_decode.either(Aeson_decode.$$int, Aeson_decode.string, JSON.parse(" {\"Left\": 2} "))));
                    }));
      }));

Jest.describe("tryEither", (function (param) {
        Jest.test("object with field", (function (param) {
                return Jest.Expect.toEqual(2, Jest.Expect.expect(Aeson_decode.tryEither(Aeson_decode.$$int, (function (param) {
                                        return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                      }))(JSON.parse(" { \"x\": 2} "))));
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.tryEither(Aeson_decode.$$int, (function (param) {
                                        return Aeson_decode.field("x", Aeson_decode.$$int, param);
                                      }))(23)));
              }));
        return throws(undefined, Aeson_decode.tryEither(Aeson_decode.$$int, (function (param) {
                          return Aeson_decode.field("x", Aeson_decode.$$int, param);
                        })), {
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
                return Jest.Expect.toEqual(0, Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, true)));
              }));
        Jest.test("float", (function (param) {
                return Jest.Expect.toEqual(0, Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, 1.23)));
              }));
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, 23)));
              }));
        Jest.test("string", (function (param) {
                return Jest.Expect.toEqual(0, Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, "test")));
              }));
        Jest.test("null", (function (param) {
                return Jest.Expect.toEqual(0, Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, null)));
              }));
        Jest.test("array", (function (param) {
                return Jest.Expect.toEqual(0, Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, [])));
              }));
        return Jest.test("object", (function (param) {
                      return Jest.Expect.toEqual(0, Jest.Expect.expect(Aeson_decode.withDefault(0, Aeson_decode.$$int, Aeson_encode.object_(/* [] */0))));
                    }));
      }));

Jest.describe("map", (function (param) {
        Jest.test("int", (function (param) {
                return Jest.Expect.toEqual(25, Jest.Expect.expect(Aeson_decode.map((function (param) {
                                      return 2 + param | 0;
                                    }), Aeson_decode.$$int, 23)));
              }));
        return throws(undefined, (function (param) {
                      return Aeson_decode.map((function (param) {
                                    return 2 + param | 0;
                                  }), Aeson_decode.$$int, param);
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
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.andThen((function (param) {
                                      return Aeson_decode.$$int;
                                    }), Aeson_decode.$$int, 23)));
              }));
        Jest.test("int -> int andThen float", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.andThen((function (param) {
                                      return Aeson_decode.$$float;
                                    }), Aeson_decode.$$int, 23)));
              }));
        Jest.test("int -> float andThen int", (function (param) {
                return Jest.Expect.toEqual(23, Jest.Expect.expect(Aeson_decode.andThen((function (param) {
                                      return Aeson_decode.$$int;
                                    }), Aeson_decode.$$float, 23)));
              }));
        throws("int andThen int ", (function (param) {
                return Aeson_decode.andThen((function (param) {
                              return Aeson_decode.$$int;
                            }), Aeson_decode.$$int, param);
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
        throws("float andThen int ", (function (param) {
                return Aeson_decode.andThen((function (param) {
                              return Aeson_decode.$$int;
                            }), Aeson_decode.$$float, param);
              }), {
              hd: /* Float */0,
              tl: /* [] */0
            });
        return throws("int to ", (function (param) {
                      return Aeson_decode.andThen((function (param) {
                                    return Aeson_decode.$$float;
                                  }), Aeson_decode.$$int, param);
                    }), {
                    hd: /* Float */0,
                    tl: /* [] */0
                  });
      }));

Jest.describe("composite expressions", (function (param) {
        Jest.test("dict array array int", (function (param) {
                return Jest.Expect.toEqual({
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
                          }, Jest.Expect.expect(Aeson_decode.dict((function (param) {
                                      return Aeson_decode.array((function (param) {
                                                    return Aeson_decode.array(Aeson_decode.$$int, param);
                                                  }), param);
                                    }), JSON.parse(" { \"a\": [[1, 2], [3]], \"b\": [[4], [5, 6]] } "))));
              }));
        Jest.test("dict array array int - heterogenous structure", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.dict((function (param) {
                                                return Aeson_decode.array((function (param) {
                                                              return Aeson_decode.array(Aeson_decode.$$int, param);
                                                            }), param);
                                              }), param);
                                }), JSON.parse(" { \"a\": [[1, 2], [true]], \"b\": [[4], [5, 6]] } ")));
              }));
        Jest.test("dict array array int - heterogenous structure 2", (function (param) {
                return Jest.Expect.toThrow(Jest.Expect.expectFn((function (param) {
                                  return Aeson_decode.dict((function (param) {
                                                return Aeson_decode.array((function (param) {
                                                              return Aeson_decode.array(Aeson_decode.$$int, param);
                                                            }), param);
                                              }), param);
                                }), JSON.parse(" { \"a\": [[1, 2], \"foo\"], \"b\": [[4], [5, 6]] } ")));
              }));
        return Jest.test("field", (function (param) {
                      var json = JSON.parse(" { \"foo\": [1, 2, 3], \"bar\": \"baz\" } ");
                      return Jest.Expect.toEqual([
                                  [
                                    1,
                                    2,
                                    3
                                  ],
                                  "baz"
                                ], Jest.Expect.expect([
                                      Aeson_decode.field("foo", (function (param) {
                                              return Aeson_decode.array(Aeson_decode.$$int, param);
                                            }), json),
                                      Aeson_decode.field("bar", Aeson_decode.string, json)
                                    ]));
                    }));
      }));

exports.Test = Test;
exports.decodeOnpingKey = decodeOnpingKey;
exports.OnpingKeyComparable = OnpingKeyComparable;
exports.decodePid = decodePid;
exports.PidComparable = PidComparable;
/* OnpingKeyComparable Not a pure module */
