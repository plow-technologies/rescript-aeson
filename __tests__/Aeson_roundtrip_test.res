open Jest
open Expect

let resultMap = (f, r) =>
  switch r {
  | Belt.Result.Ok(a) => Belt.Result.Ok(f(a))
  | Belt.Result.Error(b) => Belt.Result.Error(b)
  }

let jsonRoundtripSpec = (decode, encode, json) => {
  let rDecoded = decode(json)
  expect(resultMap(encode, rDecoded))->toEqual(Ok(json))
}

type pairKey = PairKey((int, string))

module PairKeyComparable = Belt.Id.MakeComparableU({
  type t = pairKey
  let cmp = (. a, b): int =>
    switch (a, b) {
    | (PairKey(a), PairKey(b)) => compare(a, b)
    }
})

type pairKeyMap = {pairKeyMap: Belt.Map.t<pairKey, string, PairKeyComparable.identity>}

let encodePairKey = x =>
  switch x {
  | PairKey(y0) => Aeson.Encode.pair(Aeson.Encode.int, Aeson.Encode.string, y0)
  }

let decodePairKey = json =>
  switch Aeson.Decode.pair(Aeson.Decode.int, Aeson.Decode.string, json) {
  | v => Belt.Result.Ok(PairKey(v))
  | exception Aeson.Decode.DecodeError(msg) => Belt.Result.Error("decodePairKey: " ++ msg)
  }

let encodePairKeyMap = (x: pairKeyMap) =>
  Aeson.Encode.object_(list{
    ("pairKeyMap", Aeson.Encode.beltMap(encodePairKey, Aeson.Encode.string, x.pairKeyMap)),
  })

let decodePairKeyMap = json =>
  switch {
    open Aeson.Decode
    {
      pairKeyMap: field(
        "pairKeyMap",
        x =>
          beltMap(
            a => unwrapResult(decodePairKey(a)),
            Aeson.Decode.string,
            ~id=module(PairKeyComparable),
            x,
          ),
        json,
      ),
    }
  } {
  | v => Belt.Result.Ok(v)
  | exception Aeson.Decode.DecodeError(msg) => Belt.Result.Error("decodePairKey: " ++ msg)
  }

let () = {
  describe("encodeArray", () => {
    test("encodeArray with int", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j => Aeson.Decode.array(Aeson.Decode.int, j), json),
        arr => Aeson.Encode.encodeArray(Aeson.Encode.int, arr),
        Js.Json.parseExn("[1, 2, 3, 4, 5]"),
      )
    )

    test("encodeArray with string", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j => Aeson.Decode.array(Aeson.Decode.string, j), json),
        arr => Aeson.Encode.encodeArray(Aeson.Encode.string, arr),
        Js.Json.parseExn(`["hello", "world", "test"]`),
      )
    )

    test("encodeArray with bool", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j => Aeson.Decode.array(Aeson.Decode.bool, j), json),
        arr => Aeson.Encode.encodeArray(Aeson.Encode.bool, arr),
        Js.Json.parseExn("[true, false, true, true, false]"),
      )
    )

    test("encodeArray with float", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j => Aeson.Decode.array(Aeson.Decode.float, j), json),
        arr => Aeson.Encode.encodeArray(Aeson.Encode.float, arr),
        Js.Json.parseExn("[1.5, 2.7, 3.14159, 42.0]"),
      )
    )

    test("encodeArray with nested arrays", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j =>
          Aeson.Decode.array(json => Aeson.Decode.array(Aeson.Decode.int, json), j), json),
        arr => Aeson.Encode.encodeArray(innerArr =>
          Aeson.Encode.encodeArray(Aeson.Encode.int, innerArr), arr),
        Js.Json.parseExn("[[1, 2], [3, 4, 5], [], [6]]"),
      )
    )

    test("encodeArray with objects", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j =>
          Aeson.Decode.array(json =>
            Aeson.Decode.dict(Aeson.Decode.string, json), j), json),
        arr => Aeson.Encode.encodeArray(dict =>
          Aeson.Encode.object_(
            Js.Dict.entries(dict)->Array.map(((k, v)) => (k, Aeson.Encode.string(v)))->List.fromArray
          ), arr),
        Js.Json.parseExn(`[{"name": "Alice", "role": "dev"}, {"name": "Bob", "role": "admin"}]`),
      )
    )

    test("encodeArray with optional values", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j =>
          Aeson.Decode.array(json =>
            Aeson.Decode.optional(Aeson.Decode.int, json), j), json),
        arr => Aeson.Encode.encodeArray(val =>
          Aeson.Encode.nullable(Aeson.Encode.int, val), arr),
        Js.Json.parseExn("[1, null, 3, null, 5]"),
      )
    )

    test("empty encodeArray", () =>
      jsonRoundtripSpec(
        json => Aeson.Decode.wrapResult(j => Aeson.Decode.array(Aeson.Decode.int, j), json),
        arr => Aeson.Encode.encodeArray(Aeson.Encode.int, arr),
        Js.Json.parseExn("[]"),
      )
    )
  })

  describe("Belt.Map.String.t", () =>
    test("string key map", () =>
      jsonRoundtripSpec(
        y => Aeson.Decode.wrapResult(x => Aeson.Decode.beltMapString(Aeson.Decode.string, x), y),
        x => Aeson.Encode.beltMapString(Aeson.Encode.string, x),
        Js.Json.parseExn("{\"a\":\"A\",\"b\":\"B\"}"),
      )
    )
  )

  describe("Belt.Map.Int.t", () =>
    test("int key map", () =>
      jsonRoundtripSpec(
        y => Aeson.Decode.wrapResult(x => Aeson.Decode.beltMapInt(Aeson.Decode.string, x), y),
        x => Aeson.Encode.beltMapInt(Aeson.Encode.string, x),
        Js.Json.parseExn("{\"1\":\"A\",\"2\":\"B\"}"),
      )
    )
  )

  describe("(pairKey, string, PairKeyComparable.identity) Belt.Map.t", () =>
    test("custom key map", () =>
      jsonRoundtripSpec(
        decodePairKeyMap,
        encodePairKeyMap,
        Js.Json.parseExn("{\"pairKeyMap\":[[[0,\"a\"],\"A\"],[[1,\"b\"],\"B\"]]}"),
      )
    )
  )
}
