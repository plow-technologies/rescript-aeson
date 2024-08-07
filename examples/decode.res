/* Decoding a fixed JSON data structure using Aeson.Decode */
let mapJsonObjectString = (f, decoder, encoder: int => Js.Json.t, str) => {
  let json = Js.Json.parseExn(str)

  Js.Json.stringify(
    Aeson.Encode.dict(
      Js.Dict.map(
        v => encoder(v),
        Js.Dict.map(
          v => f(v),
          {
            open Aeson.Decode
            dict(decoder, json)
          },
        ),
      ),
    ),
  )
}

let sum = xs => Array.reduce(xs, 0, \"+")

/* prints `{ "foo": 6, "bar": 24 }` */
let _ = mapJsonObjectString(
  sum,
  Aeson.Decode.array(Aeson.Decode.int, ...),
  Aeson.Encode.int,
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
