/* Encoding a JSON data structure using Aeson.Encode */

/* prints ["foo", "bar"] */
let _ = ["foo", "bar"] |> Aeson.Encode.stringArray |> Js.Json.stringify |> Js.log

/* prints ["foo", "bar"] */
let _ =
  ["foo", "bar"]
  |> Js.Array.map(Aeson.Encode.string)
  |> Aeson.Encode.array
  |> Js.Json.stringify
  |> Js.log

/* prints { x: 42, foo: 'bar' } */
let _ = {
  open Aeson.Encode
  object_(list{("x", int(42)), ("foo", string("bar"))}) |> Js.log
}

/* Advanced example: encode a record */
type rec line = {
  start: point,
  end_: point,
  thickness: option<int>,
}
and point = {
  x: float,
  y: float,
}

module Encode = {
  let point = r => {
    open! Aeson.Encode
    object_(list{("x", float(r.x)), ("y", float(r.y))})
  }
  let line = r => {
    open Aeson.Encode
    object_(list{
      ("start", point(r.start)),
      ("end", point(r.end_)),
      (
        "thickness",
        switch r.thickness {
        | Some(x) => int(x)
        | None => null
        },
      ),
    })
  }
}

let data = {
  start: {x: 1.1, y: -0.4},
  end_: {x: 5.3, y: 3.8},
  thickness: Some(2),
}

let _ = data |> Encode.line |> Js.log
