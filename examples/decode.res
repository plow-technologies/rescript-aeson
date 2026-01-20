/* Decoding a fixed JSON data structure using Aeson.Decode */
let mapJsonObjectString = (
  f: 'a => 'b,
  decoder: Aeson.Decode.decoder<'a>,
  encoder: int => JSON.t,
  str,
) => {
  let json = JSON.parseOrThrow(str)
  let m = Aeson.Decode.dict(decoder, json)

  JSON.stringify(Aeson.Encode.dict(Dict.mapValues(Dict.mapValues(m, f), encoder)))
}

let sum = xs => Array.reduce(xs, 0, \"+")

/* prints `{ "foo": 6, "bar": 24 }` */
let _ = mapJsonObjectString(
  sum,
  json => Aeson.Decode.array(Aeson.Decode.int, json),
  x => Aeson.Encode.int(x),
  `
      {
        "foo": [1, 2, 3],
        "bar": [9, 8, 7]
      }
    `,
)->Console.log

/* Error handling */
let _ = {
  let json = JSON.parseOrThrow(`{ "y": 42 } `)
  switch {
    open Aeson.Decode
    field("x", int, json)
  } {
  | x => Console.log(x)
  | exception Aeson.Decode.DecodeError(msg) => Console.log("Error:" ++ msg)
  }
}
