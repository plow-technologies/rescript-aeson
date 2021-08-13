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

let () =

describe "Belt.Map.String.t" (fun () ->
  test "simple map" (fun () ->
      jsonRoundtripSpec
        (Aeson.Decode.wrapResult (Aeson.Decode.beltMapString Aeson.Decode.string))
        (Aeson.Encode.beltMapString Aeson.Encode.string)
        (Js.Json.parseExn "{\"a\":\"A\",\"b\":\"B\"}")
    )
);
