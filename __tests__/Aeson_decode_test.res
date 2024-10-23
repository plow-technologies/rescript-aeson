open Jest
open Expect

module Test = {
  type default_case =
    | Float
    | Int
    | String
    | Null
    | Array
    | Object
    | Bool

  type singleEnumerator = SingleEnumerator

  /* TODO: tests for this function */
  let test = (decoder, prefix, x) => {
    open Aeson
    switch x {
    | Float => test(prefix ++ "float", () => expectFn(decoder, Encode.float(1.23))->toThrow)
    | Int => test(prefix ++ "int", () => expectFn(decoder, Encode.int(23))->toThrow)
    | String => test(prefix ++ "string", () => expectFn(decoder, Encode.string("test"))->toThrow)
    | Null => test(prefix ++ "null", () => expectFn(decoder, Encode.null)->toThrow)
    | Array => test(prefix ++ "array", () => expectFn(decoder, Encode.array([]))->toThrow)
    | Object => test(prefix ++ "object", () => expectFn(decoder, Encode.object_(list{}))->toThrow)
    | Bool => test(prefix ++ "bool", () => expectFn(decoder, Encode.bool(true))->toThrow)
    }
  }

  let rec throws = (~prefix="", decoder, x) =>
    switch x {
    | list{} => ()
    | list{first, ...rest} =>
      test(decoder, prefix, first)
      throws(decoder, ~prefix, rest)
    }
}

type onpingKey = OnpingKey(string)

let decodeOnpingKey = json =>
  switch Aeson.Decode.string(json) {
  | x => OnpingKey(x)
  }

module OnpingKeyComparable = Belt.Id.MakeComparable({
  type t = onpingKey
  let cmp = (a, b) => compare(a, b)
})

type pid = Pid(int)

let decodePid = json =>
  switch Aeson.Decode.int(json) {
  | x => Pid(x)
  }

module PidComparable = Belt.Id.MakeComparable({
  type t = pid
  let cmp = compare
})

let () = {
  describe("bool", () => {
    open Aeson
    open Decode

    test("bool", () => expect(bool(Encode.bool(true)))->toEqual(true))

    test("bool - false", () => expect(bool(Encode.bool(false)))->toEqual(false))
    Test.throws(bool, list{Float, Int, String, Null, Array, Object})
  })

  describe("float", () => {
    open Aeson
    open! Decode

    test("float", () => expect(float(Encode.float(1.23)))->toEqual(1.23))
    test("int", () => expect(float(Encode.int(23)))->toEqual(23.))
    test("float", () =>
      expect(Aeson.Decode.float(Aeson.Encode.float(Js.Float.fromString("Infinity"))))->toEqual(
        Js.Float.fromString("Infinity"),
      )
    )
    test("float", () =>
      expect(Aeson.Decode.float(Aeson.Encode.float(Js.Float.fromString("-Infinity"))))->toEqual(
        Js.Float.fromString("-Infinity"),
      )
    )
    test("float", () =>
      expect(Aeson.Decode.float(Aeson.Encode.string("Infinity")))->toEqual(
        Js.Float.fromString("Infinity"),
      )
    )    
    test("float", () =>
      expect(Aeson.Decode.float(Aeson.Encode.string("+Infinity")))->toEqual(
        Js.Float.fromString("Infinity"),
      )
    )
    test("float", () =>
      expect(Aeson.Decode.float(Aeson.Encode.string("-Infinity")))->toEqual(
        Js.Float.fromString("-Infinity"),
      )
    )
    
    Test.throws(float, list{Bool, String, Null, Array, Object})
  })

  describe("int", () => {
    open Aeson
    open! Decode

    test("int", () => expect(int(Encode.int(23)))->toEqual(23))

    test("int > 32-bit", () => {
      /* Use %raw since integer literals > Int32.max_int overflow without warning */
      let big_int = %raw("2147483648")
      expect(int(Encode.int(big_int)))->toEqual(big_int)
    })

    Test.throws(int, list{Bool, Float, String, Null, Array, Object})
  })

  describe("bigint", () => {
    open Aeson
    open! Decode

    test("23", () => expect(bigint(Encode.bigint(BigInt.fromInt(23))))->toEqual(BigInt.fromInt(23)))

    test("26423", () =>
      expect(bigint(Encode.bigint(BigInt.fromInt(26423))))->toEqual(BigInt.fromInt(26423))
    )

    test("-1289848928492483456726423", () =>
      expect(Encode.bigint(BigInt.fromString("-1289848928492483456726423"))->bigint)->toEqual(
        BigInt.fromString("-1289848928492483456726423"),
      )
    )
  })

  describe("string", () => {
    open Aeson
    open! Decode

    test("string", () => expect(string(Encode.string("test")))->toEqual("test"))

    Test.throws(string, list{Bool, Float, Int, Null, Array, Object})
  })

  describe("date", () => {
    open Aeson
    open! Decode
    let nowString = "2017-12-08T06:03:22Z"
    let now = Js_date.fromString(nowString)

    test("date", () => expect(date(Encode.date(now)))->toEqual(now))
  })

  describe("nullable", () => {
    open Aeson
    open! Decode

    test("int -> int", () => expect(nullable(int, Encode.int(23)))->toEqual(Js.Null.return(23)))
    test("null -> int", () => expect(nullable(int, Encode.null))->toEqual(Js.null))

    test("bool -> bool", () =>
      expect(nullable(bool, Encode.bool(true)))->toEqual(Js.Null.return(true))
    )
    test("float -> float", () =>
      expect(nullable(float, Encode.float(1.23)))->toEqual(Js.Null.return(1.23))
    )
    test("string -> string", () =>
      expect(nullable(string, Encode.string("test")))->toEqual(Js.Null.return("test"))
    )
    // test("null -> null", () => expect(nullable(nullAs(Js.null), Encode.null))->toEqual(Js.null))

    Test.throws(x => nullable(int, x), list{Bool, Float, String, Array, Object})
    Test.throws(x => nullable(bool, x), list{Int})
  })

  describe("nullAs", () => {
    open Aeson
    open Decode

    test("as 0 - null", () => expect(nullAs(0, Encode.null))->toEqual(0))

    test("as Js.null", () => expect(nullAs(Js.null, Encode.null))->toEqual(Js.null))
    test("as None", () => expect(nullAs(None, Encode.null))->toEqual(None))
    test("as Some _", () => expect(nullAs(Some("foo"), Encode.null))->toEqual(Some("foo")))

    Test.throws(x => nullAs(0, x), list{Bool, Float, Int, String, Array, Object})
  })

  describe("array", () => {
    open Aeson
    open! Decode

    test("array", () => expect(array(int, Encode.array([])))->toEqual([]))

    test("array bool", () =>
      expect(array(bool, Js.Json.parseExn(` [true, false, true] `)))->toEqual([true, false, true])
    )

    test("array float", () =>
      expect(array(float, Js.Json.parseExn(` [1, 2, 3] `)))->toEqual([1., 2., 3.])
    )
    test("array int", () => expect(array(int, Js.Json.parseExn(` [1, 2, 3] `)))->toEqual([1, 2, 3]))
    test("array string", () =>
      expect(array(string, Js.Json.parseExn(` ["a", "b", "c"] `)))->toEqual(["a", "b", "c"])
    )
    test("array nullAs", () =>
      expect(array(x => nullAs(Js.null, x), Js.Json.parseExn(` [null, null, null] `)))->toEqual([
        Js.null,
        Js.null,
        Js.null,
      ])
    )
    test("array int -> array bool", () =>
      toThrow(expectFn(x => array(bool, x), Js.Json.parseExn(` [1, 2, 3] `)))
    )

    Test.throws(x => array(int, x), list{Bool, Float, Int, String, Null, Object})
  })

  describe("list", () => {
    open Aeson
    open! Decode

    test("array", () => expect(list(int, Encode.array([])))->toEqual(list{}))

    test("list bool", () =>
      expect(list(bool, Js.Json.parseExn(` [true, false, true] `)))->toEqual(list{
        true,
        false,
        true,
      })
    )

    test("list float", () =>
      expect(list(float, Js.Json.parseExn(` [1, 2, 3] `)))->toEqual(list{1., 2., 3.})
    )
    test("list int", () =>
      expect(list(int, Js.Json.parseExn(` [1, 2, 3] `)))->toEqual(list{1, 2, 3})
    )
    test("list string", () =>
      expect(list(string, Js.Json.parseExn(` ["a", "b", "c"] `)))->toEqual(list{"a", "b", "c"})
    )
    test("list nullAs", () =>
      expect(list(x => nullAs(Js.null, x), Js.Json.parseExn(` [null, null, null] `)))->toEqual(list{
        Js.null,
        Js.null,
        Js.null,
      })
    )
    test("array int -> list bool", () =>
      toThrow(expectFn(x => list(bool, x), Js.Json.parseExn(` [1, 2, 3] `)))
    )

    Test.throws(x => list(int, x), list{Bool, Float, Int, String, Null, Object})
  })

  describe("pair", () => {
    open Aeson
    open! Decode

    test("pair string int", () =>
      expect(pair(string, int, Js.Json.parseExn(` ["a", 3] `)))->toEqual(("a", 3))
    )
    test("pair int int", () =>
      expect(pair(int, int, Js.Json.parseExn(` [4, 3] `)))->toEqual((4, 3))
    )
    test("pair missing", () => toThrow(expectFn(x => pair(int, int, x), Js.Json.parseExn(` [4] `))))
    test("pair too large", () =>
      toThrow(expectFn(x => pair(int, int, x), Js.Json.parseExn(` [3, 4, 5] `)))
    )
    test("pair bad left type", () =>
      toThrow(expectFn(x => pair(int, int, x), Js.Json.parseExn(` ["3", 4] `)))
    )
    test("pair bad right type", () =>
      toThrow(expectFn(x => pair(string, string, x), Js.Json.parseExn(` ["3", 4] `)))
    )
  })

  describe("tuple3", () => {
    open Aeson
    open! Decode

    test("tuple3 string int string", () =>
      expect(tuple3(string, int, string, Js.Json.parseExn(` ["a", 3, "b"] `)))->toEqual((
        "a",
        3,
        "b",
      ))
    )
  })

  describe("tuple4", () => {
    open Aeson
    open! Decode

    test("tuple4 string int string bool", () =>
      expect(
        tuple4(string, int, string, bool, Js.Json.parseExn(` ["a", 3, "b", true] `)),
      )->toEqual(("a", 3, "b", true))
    )
  })

  describe("tuple5", () => {
    open Aeson
    open! Decode

    test("tuple5 string int string bool int", () =>
      expect(
        tuple5(string, int, string, bool, int, Js.Json.parseExn(` ["a", 3, "b", true, 98] `)),
      )->toEqual(("a", 3, "b", true, 98))
    )
  })

  describe("tuple6", () => {
    open Aeson
    open! Decode

    test("tuple6 string int string bool int string", () =>
      expect(
        tuple6(
          string,
          int,
          string,
          bool,
          int,
          string,
          Js.Json.parseExn(` ["a", 3, "b", true, 98, "sleepy"] `),
        ),
      )->toEqual(("a", 3, "b", true, 98, "sleepy"))
    )
  })

  describe("tuple7", () => {
    open Aeson
    open! Decode

    test("tuple7 string int string bool int string int", () =>
      expect(
        tuple7(
          string,
          int,
          string,
          bool,
          int,
          string,
          int,
          Js.Json.parseExn(` ["a", 3, "b", true, 98, "sleepy", 100] `),
        ),
      )->toEqual(("a", 3, "b", true, 98, "sleepy", 100))
    )
  })

  describe("tuple8", () => {
    open Aeson
    open! Decode

    test("tuple8 string int string bool int string int string", () =>
      expect(
        tuple8(
          string,
          int,
          string,
          bool,
          int,
          string,
          int,
          string,
          Js.Json.parseExn(` ["a", 3, "b", true, 98, "sleepy", 100, "bedtime"] `),
        ),
      )->toEqual(("a", 3, "b", true, 98, "sleepy", 100, "bedtime"))
    )
  })

  describe("tuple9", () => {
    open Aeson
    open! Decode

    test("tuple9 string int string bool int string int string bool", () =>
      expect(
        tuple9(
          string,
          int,
          string,
          bool,
          int,
          string,
          int,
          string,
          bool,
          Js.Json.parseExn(` ["a", 3, "b", true, 98, "sleepy", 100, "bedtime", false] `),
        ),
      )->toEqual(("a", 3, "b", true, 98, "sleepy", 100, "bedtime", false))
    )
  })

  describe("tuple10", () => {
    open Aeson
    open! Decode

    test("tuple10 string int string bool int string int string bool int", () =>
      expect(
        tuple10(
          string,
          int,
          string,
          bool,
          int,
          string,
          int,
          string,
          bool,
          int,
          Js.Json.parseExn(` ["a", 3, "b", true, 98, "sleepy", 100, "bedtime", false, 22] `),
        ),
      )->toEqual(("a", 3, "b", true, 98, "sleepy", 100, "bedtime", false, 22))
    )
  })

  describe("singleEnumerator", () => {
    open Aeson
    open! Decode

    test("singleEnumerator", () =>
      expect(singleEnumerator(Test.SingleEnumerator, Encode.array([])))->toEqual(
        Test.SingleEnumerator,
      )
    )
  })

  describe("string pid Belt.Map.t", () => {
    open Aeson
    open! Decode

    test("test", () =>
      expect(
        beltMap(
          decodePid,
          string,
          ~id=module(PidComparable),
          Js.Json.parseExn(` [[1, "A"], [2, "B"]] `),
        ),
      )->toEqual(Belt.Map.fromArray([(Pid(1), "A"), (Pid(2), "B")], ~id=module(PidComparable)))
    )
  })

  describe("string onpingKey Belt.Map.t", () => {
    open Aeson
    open! Decode

    test("test", () =>
      expect(
        beltMap(
          decodeOnpingKey,
          string,
          ~id=module(OnpingKeyComparable),
          Js.Json.parseExn(` [["a", "A"], ["b", "B"]] `),
        ),
      )->toEqual(
        Belt.Map.fromArray(
          [(OnpingKey("a"), "A"), (OnpingKey("b"), "B")],
          ~id=module(OnpingKeyComparable),
        ),
      )
    )
  })

  describe("decode Belt.Map.t when object is given with string key", () => {
    open Aeson
    open! Decode

    test("test", () =>
      expect(
        beltMap(
          decodeOnpingKey,
          string,
          ~id=module(OnpingKeyComparable),
          Js.Json.parseExn(` {"a": "A", "b": "B"} `),
        ),
      )->toEqual(
        Belt.Map.fromArray(
          [(OnpingKey("a"), "A"), (OnpingKey("b"), "B")],
          ~id=module(OnpingKeyComparable),
        ),
      )
    )
  })

  describe("decode Belt.Map.t when object is given with int key", () => {
    open Aeson
    open! Decode

    test("test", () =>
      expect(
        beltMap(
          decodePid,
          string,
          ~id=module(PidComparable),
          Js.Json.parseExn(` {"1": "A", "2": "B"} `),
        ),
      )->toEqual(Belt.Map.fromArray([(Pid(1), "A"), (Pid(2), "B")], ~id=module(PidComparable)))
    )
  })

  describe("string Belt.Map.Int.t", () => {
    open Aeson
    open! Decode

    test("test", () =>
      expect(beltMapInt(string, Js.Json.parseExn(` {"1": "A", "2": "B"} `)))->toEqual(
        Belt.Map.Int.fromArray([(1, "A"), (2, "B")]),
      )
    )
  })

  describe("string Belt.Map.String.t", () => {
    open Aeson
    open! Decode

    test("test", () =>
      expect(beltMapString(string, Js.Json.parseExn(` {"a": "A", "b": "B"} `)))->toEqual(
        Belt.Map.String.fromArray([("a", "A"), ("b", "B")]),
      )
    )
  })

  describe("dict", () => {
    open Aeson
    open! Decode

    test("object", () => expect(dict(int, Encode.object_(list{})))->toEqual(Js.Dict.empty()))

    test("dict bool", () =>
      expect(dict(bool, Js.Json.parseExn(` { "a": true, "b": false } `)))->toEqual(
        Obj.magic({"a": true, "b": false}),
      )
    )
    test("dict float", () =>
      expect(dict(float, Js.Json.parseExn(` { "a": 1.2, "b": 2.3 } `)))->toEqual(
        Obj.magic({"a": 1.2, "b": 2.3}),
      )
    )
    test("dict int", () =>
      expect(dict(int, Js.Json.parseExn(` { "a": 1, "b": 2 } `)))->toEqual(
        Obj.magic({"a": 1, "b": 2}),
      )
    )
    test("dict string", () =>
      expect(dict(string, Js.Json.parseExn(` { "a": "x", "b": "y" } `)))->toEqual(
        Obj.magic({"a": "x", "b": "y"}),
      )
    )
    test("dict nullAs", () =>
      expect(
        dict(x => nullAs(Js.null, x), Js.Json.parseExn(` { "a": null, "b": null } `)),
      )->toEqual(Obj.magic({"a": Js.null, "b": Js.null}))
    )
    test("dict null -> dict string", () =>
      toThrow(expectFn(x => dict(string, x), Js.Json.parseExn(` { "a": null, "b": null } `)))
    )

    Test.throws(x => dict(int, x), list{Bool, Float, Int, String, Null, Array})
  })

  describe("field", () => {
    open Aeson
    open! Decode

    test("field bool", () =>
      expect(field("b", bool, Js.Json.parseExn(` { "a": true, "b": false } `)))->toEqual(false)
    )
    test("field float", () =>
      expect(field("b", float, Js.Json.parseExn(` { "a": 1.2, "b": 2.3 } `)))->toEqual(2.3)
    )
    test("field int", () =>
      expect(field("b", int, Js.Json.parseExn(` { "a": 1, "b": 2 } `)))->toEqual(2)
    )
    test("field string", () =>
      expect(field("b", string, Js.Json.parseExn(` { "a": "x", "b": "y" } `)))->toEqual("y")
    )
    test("field nullAs", () =>
      expect(
        field("b", x => nullAs(Js.null, x), Js.Json.parseExn(` { "a": null, "b": null } `)),
      )->toEqual(Js.null)
    )
    test("field null -> field string", () =>
      toThrow(expectFn(x => field("b", string, x), Js.Json.parseExn(` { "a": null, "b": null } `)))
    )

    Test.throws(x => field("foo", int, x), list{Bool, Float, Int, String, Null, Array, Object})
  })

  describe("at", () => {
    open Aeson
    open! Decode

    test("at bool", () =>
      expect(
        at(
          list{"a", "x", "y"},
          bool,
          Js.Json.parseExn(` {
        "a": { "x" : { "y" : false } }, 
        "b": false 
      } `),
        ),
      )->toEqual(false)
    )
    test("field nullAs", () =>
      expect(
        at(
          list{"a", "x"},
          x => nullAs(Js.null, x),
          Js.Json.parseExn(` {
        "a": { "x" : null },
        "b": null
      } `),
        ),
      )->toEqual(Js.null)
    )

    Test.throws(
      x => at(list{"foo", "bar"}, int, x),
      list{Bool, Float, Int, String, Null, Array, Object},
    )
  })

  describe("optional", () => {
    open Aeson
    open! Decode

    test("bool -> int", () => expect(optional(int, Encode.bool(true)))->toEqual(None))
    test("float -> int", () => expect(optional(int, Encode.float(1.23)))->toEqual(None))
    test("int -> int", () => expect(optional(int, Encode.int(23)))->toEqual(Some(23)))

    test("string -> int", () => expect(optional(int, Encode.string("test")))->toEqual(None))
    test("null -> int", () => expect(optional(int, Encode.null))->toEqual(None))
    test("array -> int", () => expect(optional(int, Encode.array([])))->toEqual(None))
    test("object -> int", () => expect(optional(int, Encode.object_(list{})))->toEqual(None))

    test("bool -> bool ", () => expect(optional(bool, Encode.bool(true)))->toEqual(Some(true)))
    test("float -> float", () => expect(optional(float, Encode.float(1.23)))->toEqual(Some(1.23)))
    test("string -> string", () =>
      expect(optional(string, Encode.string("test")))->toEqual(Some("test"))
    )
    test("null -> null", () =>
      expect(optional(x => nullAs(Js.null, x), Encode.null))->toEqual(Some(Js.null))
    )
    test("int -> bool", () => expect(optional(bool, Encode.int(1)))->toEqual(None))

    test("optional field", () =>
      expect(optional(x => field("x", int, x), Js.Json.parseExn(` { "x": 2} `)))->toEqual(Some(2))
    )
    test("optional field - incorrect type", () =>
      expect(optional(x => field("x", int, x), Js.Json.parseExn(` { "x": 2.3} `)))->toEqual(None)
    )
    test("optional field - no such field", () =>
      expect(optional(x => field("y", int, x), Js.Json.parseExn(` { "x": 2} `)))->toEqual(None)
    )
    test("field optional", () =>
      expect(field("x", x => optional(int, x), Js.Json.parseExn(` { "x": 2} `)))->toEqual(Some(2))
    )
    test("field optional - incorrect type", () =>
      expect(field("x", x => optional(int, x), Js.Json.parseExn(` { "x": 2.3} `)))->toEqual(None)
    )
    test("field optional - no such field", () =>
      toThrow(
        expectFn(json => field("y", x => optional(int, x), json), Js.Json.parseExn(` { "x": 2} `)),
      )
    )
  })

  describe("optionalField", () => {
    open Aeson
    open! Decode

    test("optionalField", () =>
      expect(optionalField("x", int, Js.Json.parseExn(` { "x": 2} `)))->toEqual(Some(2))
    )

    test("optionalField - null returns None", () =>
      expect(optionalField("x", int, Js.Json.parseExn(` { "x": null} `)))->toEqual(None)
    )

    test("optionalField - null returns None", () =>
      expect(optionalField("x", string, Js.Json.parseExn(` { "x": null} `)))->toEqual(None)
    )

    test("optionalField - field does not exist", () =>
      expect(optionalField("y", int, Js.Json.parseExn(` { "x": 2} `)))->toEqual(None)
    )

    test("field optional - no such field", () =>
      toThrow(expectFn(x => optionalField("x", string, x), Js.Json.parseExn(` { "x": 2} `)))
    )
  })

  describe("oneOf", () => {
    open Aeson
    open! Decode

    test("object with field", () =>
      expect(oneOf(list{int, x => field("x", int, x)}, Js.Json.parseExn(` { "x": 2} `)))->toEqual(2)
    )
    test("int", () =>
      expect(oneOf(list{int, x => field("x", int, x)}, Encode.int(23)))->toEqual(23)
    )

    Test.throws(
      json => oneOf(list{int, x => field("x", int, x)}, json),
      list{Bool, Float, String, Null, Array, Object},
    )
  })

  describe("result", () => {
    open Aeson
    open! Decode

    test("Ok", () =>
      expect(result(int, string, Js.Json.parseExn(` {"Error": "hello"} `)))->toEqual(Error("hello"))
    )

    test("Error", () =>
      expect(result(int, string, Js.Json.parseExn(` {"Ok": 2} `)))->toEqual(Ok(2))
    )
  })

  describe("either", () => {
    open Aeson
    open! Decode

    test("Right", () =>
      expect(either(int, string, Js.Json.parseExn(` {"Right": "hello"} `)))->toEqual(
        Compatibility.Either.Right("hello"),
      )
    )

    test("Left", () =>
      expect(either(int, string, Js.Json.parseExn(` {"Left": 2} `)))->toEqual(
        Compatibility.Either.Left(2),
      )
    )
  })

  describe("tryEither", () => {
    open Aeson
    open! Decode

    test("object with field", () =>
      expect(tryEither(int, x => field("x", int, x), Js.Json.parseExn(` { "x": 2} `)))->toEqual(2)
    )
    test("int", () => expect(tryEither(int, x => field("x", int, x), Encode.int(23)))->toEqual(23))

    Test.throws(
      json => tryEither(int, x => field("x", int, x), json),
      list{Bool, Float, String, Null, Array, Object},
    )
  })

  describe("withDefault", () => {
    open Aeson
    open! Decode

    test("bool", () => expect(withDefault(0, int, Encode.bool(true)))->toEqual(0))
    test("float", () => expect(withDefault(0, int, Encode.float(1.23)))->toEqual(0))
    test("int", () => expect(withDefault(0, int, Encode.int(23)))->toEqual(23))
    test("string", () => expect(withDefault(0, int, Encode.string("test")))->toEqual(0))
    test("null", () => expect(withDefault(0, int, Encode.null))->toEqual(0))
    test("array", () => expect(withDefault(0, int, Encode.array([])))->toEqual(0))
    test("object", () => expect(withDefault(0, int, Encode.object_(list{})))->toEqual(0))
  })

  describe("map", () => {
    open Aeson
    open! Decode

    test("int", () => expect(map(x => x + 2, int, Encode.int(23)))->toEqual(25))

    Test.throws(json => map(x => x + 2, int, json), list{Bool, Float, String, Null, Array, Object})
  })

  describe("andThen", () => {
    open Aeson
    open! Decode

    test("int -> int", () => expect(andThen((_, b) => int(b), int, Encode.int(23)))->toEqual(23))

    test("int -> int andThen float", () =>
      expect(andThen((_, b) => float(b), int, Encode.int(23)))->toEqual(23.)
    )
    test("int -> float andThen int", () =>
      expect(andThen((_, b) => int(b), float, Encode.int(23)))->toEqual(23)
    )

    Test.throws(
      ~prefix="int andThen int ",
      json => andThen((_, b) => int(b), int, json),
      list{Bool, Float, String, Null, Array, Object},
    )
    Test.throws(
      ~prefix="float andThen int ",
      json => andThen((_, b) => int(b), float, json),
      list{Float},
    )
    Test.throws(~prefix="int to ", json => andThen((_, b) => float(b), int, json), list{Float})
  })

  describe("composite expressions", () => {
    open Aeson
    open! Decode

    test("dict array array int", () =>
      expect(
        dict(
          x => array(y => array(int, y), x),
          Js.Json.parseExn(` { "a": [[1, 2], [3]], "b": [[4], [5, 6]] } `),
        ),
      )->toEqual(Obj.magic({"a": [[1, 2], [3]], "b": [[4], [5, 6]]}))
    )
    test("dict array array int - heterogenous structure", () =>
      toThrow(
        expectFn(
          x => array(y => array(int, y), x),
          Js.Json.parseExn(` { "a": [[1, 2], [true]], "b": [[4], [5, 6]] } `),
        ),
      )
    )
    test("dict array array int - heterogenous structure 2", () =>
      toThrow(
        expectFn(
          x => array(y => array(int, y), x),
          Js.Json.parseExn(` { "a": [[1, 2], "foo"], "b": [[4], [5, 6]] } `),
        ),
      )
    )
    test("field", () => {
      let json = Js.Json.parseExn(` { "foo": [1, 2, 3], "bar": "baz" } `)
      expect((field("foo", x => array(int, x), json), field("bar", string, json)))->toEqual((
        [1, 2, 3],
        "baz",
      ))
    })
  })
}
