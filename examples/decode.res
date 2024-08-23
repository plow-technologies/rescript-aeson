/* Decoding a fixed JSON data structure using Aeson.Decode */
let mapJsonObjectString = (f: (. 'a) => 'b, decoder, encoder: (. int) => Js.Json.t, str) => {
  let json = Js.Json.parseExn(str)
  let m = Aeson.Decode.dict(decoder, json)

  Js.Json.stringify(Aeson.Encode.dict(Js.Dict.map(encoder, Js.Dict.map(f, m))))
}

let sum = (. xs) => Array.reduce(xs, 0, \"+")

/* prints `{ "foo": 6, "bar": 24 }` */
let _ = mapJsonObjectString(
  sum,
  Aeson.Decode.array(Aeson.Decode.int),
  (. x) => Aeson.Encode.int(x),
  `
      {
        "foo": [1, 2, 3],
        "bar": [9, 8, 7]
      }
    `,
)->Js.log

/* Error handling */
let _ = {
  let json = Js.Json.parseExn(`{ "y": 42 } `)
  switch {
    open Aeson.Decode
    field("x", int, json)
  } {
  | x => Js.log(x)
  | exception Aeson.Decode.DecodeError(msg) => Js.log("Error:" ++ msg)
  }
}
