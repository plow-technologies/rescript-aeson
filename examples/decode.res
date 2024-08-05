/* Decoding a fixed JSON data structure using Aeson.Decode */
let mapJsonObjectString = (f, decoder, encoder: int => Js.Json.t, str) => {
  let json = Js.Json.parseExn(str)
  {
    open Aeson.Decode
    dict(decoder, json)
  }
  |> Js.Dict.map((. v) => f(v))
  |> Js.Dict.map((. v) => encoder(v))
  |> Aeson.Encode.dict
  |> Js.Json.stringify
}

let sum = Array.fold_left(\"+", 0)

/* prints `{ "foo": 6, "bar": 24 }` */
let _ = \"@@"(
  Js.log,
  mapJsonObjectString(
    sum,
    {
      open Aeson.Decode
      array(int)
    },
    Aeson.Encode.int,
    `
      {
        "foo": [1, 2, 3],
        "bar": [9, 8, 7]
      }
    `,
  ),
)

/* Error handling */
let _ = {
  let json = `{ "y": 42 } ` |> Js.Json.parseExn
  switch {
    open Aeson.Decode
    field("x", int, json)
  } {
  | x => Js.log(x)
  | exception Aeson.Decode.DecodeError(msg) => Js.log("Error:" ++ msg)
  }
}
