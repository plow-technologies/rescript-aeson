/* Encoding a JSON data structure using Aeson.Encode */

/* prints ["foo", "bar"] */
let _ = Js.log(Js.Json.stringify(Aeson.Encode.stringArray(["foo", "bar"])))

/* prints ["foo", "bar"] */
let _ = Js.log(
  Js.Json.stringify(Aeson.Encode.array(Js.Array.map(Aeson.Encode.string, ["foo", "bar"]))),
)

/* prints { x: 42, foo: 'bar' } */
let _ = {
  open Aeson.Encode
  Js.log(object_(list{("x", int(42)), ("foo", string("bar"))}))
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
  open! Aeson.Encode
  let point = r => {
    object_(list{("x", Aeson.Encode.float(r.x)), ("y", Aeson.Encode.float(r.y))})
  }
  let line = r => {
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

let _ = Js.log(Encode.line(data))
