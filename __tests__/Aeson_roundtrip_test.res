open Jest
open Expect

let resultMap = (f, r) =>
  switch r {
  | Belt.Result.Ok(a) => Belt.Result.Ok(f(a))
  | Belt.Result.Error(b) => Belt.Result.Error(b)
  }

let jsonRoundtripSpec = (decode, encode, json) => {
  let rDecoded = decode(json)
  expect(resultMap(encode, rDecoded)) |> toEqual(Belt.Result.Ok(json))
}

type pairKey = PairKey((int, string))

module PairKeyComparable = Belt.Id.MakeComparable({
  type t = pairKey
  let cmp = (a, b): int =>
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
        beltMap(
          a => unwrapResult(decodePairKey(a)),
          Aeson.Decode.string,
          ~id=module(PairKeyComparable),
        ),
        json,
      ),
    }
  } {
  | v => Belt.Result.Ok(v)
  | exception Aeson.Decode.DecodeError(msg) => Belt.Result.Error("decodePairKey: " ++ msg)
  }

let () = {
  describe("Belt.Map.String.t", () =>
    test("string key map", () =>
      jsonRoundtripSpec(
        Aeson.Decode.wrapResult(Aeson.Decode.beltMapString(Aeson.Decode.string)),
        Aeson.Encode.beltMapString(Aeson.Encode.string),
        Js.Json.parseExn("{\"a\":\"A\",\"b\":\"B\"}"),
      )
    )
  )

  describe("Belt.Map.Int.t", () =>
    test("int key map", () =>
      jsonRoundtripSpec(
        Aeson.Decode.wrapResult(Aeson.Decode.beltMapInt(Aeson.Decode.string)),
        Aeson.Encode.beltMapInt(Aeson.Encode.string),
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
