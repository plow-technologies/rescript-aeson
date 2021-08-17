open Jest
open Expect

let resultMap f r = (
  match r with
  | Belt.Result.Ok(a) -> Belt.Result.Ok (f a)
  | Belt.Result.Error(b) -> Belt.Result.Error (b)
)

let jsonRoundtripSpec decode encode json =
  let rDecoded = decode json in
  expect (resultMap encode rDecoded) |> toEqual (Belt.Result.Ok json)

type pairKey =
  | PairKey of (int * string)

module PairKeyComparable =
  Belt.Id.MakeComparable(
    struct
      type t = pairKey
      let cmp a b =
        (match (a, b) with
         | (PairKey a, PairKey b) -> compare a b : int)
    end
  )

type pairKeyMap =
  { pairKeyMap : (pairKey, string, PairKeyComparable.identity) Belt.Map.t
  }

let encodePairKey x =
  match x with
  | PairKey y0 ->
     Aeson.Encode.pair Aeson.Encode.int Aeson.Encode.string y0

let decodePairKey json =
  match Aeson.Decode.pair Aeson.Decode.int Aeson.Decode.string json with
  | v -> Belt.Result.Ok (PairKey v)
  | exception Aeson.Decode.DecodeError msg -> Belt.Result.Error ("decodePairKey: " ^ msg)

let encodePairKeyMap (x: pairKeyMap) =
 Aeson.Encode.object_
   [ ( "pairKeyMap", Aeson.Encode.beltMap encodePairKey Aeson.Encode.string x.pairKeyMap )
   ]

let decodePairKeyMap json =
  match Aeson.Decode.
    { pairKeyMap = field "pairKeyMap" (beltMap (fun a -> unwrapResult (decodePairKey a)) Aeson.Decode.string ~id:(module PairKeyComparable)) json 
    }
  with
  | v -> Belt.Result.Ok v
  | exception Aeson.Decode.DecodeError msg -> Belt.Result.Error ("decodePairKey: " ^ msg)

let () =

describe "Belt.Map.String.t" (fun () ->
  test "string key map" (fun () ->
      jsonRoundtripSpec
        (Aeson.Decode.wrapResult (Aeson.Decode.beltMapString Aeson.Decode.string))
        (Aeson.Encode.beltMapString Aeson.Encode.string)
        (Js.Json.parseExn "{\"a\":\"A\",\"b\":\"B\"}")
    )
);

describe "Belt.Map.Int.t" (fun () ->
  test "int key map" (fun () ->
      jsonRoundtripSpec
        (Aeson.Decode.wrapResult (Aeson.Decode.beltMapInt Aeson.Decode.string))
        (Aeson.Encode.beltMapInt Aeson.Encode.string)
        (Js.Json.parseExn "{\"1\":\"A\",\"2\":\"B\"}")
    )
);

describe "(pairKey, string, PairKeyComparable.identity) Belt.Map.t" (fun () ->
  test "custom key map" (fun () ->
      jsonRoundtripSpec
        decodePairKeyMap
        encodePairKeyMap
        (Js.Json.parseExn "{\"pairKeyMap\":[[[0,\"a\"],\"A\"],[[1,\"b\"],\"B\"]]}")
    )
);
