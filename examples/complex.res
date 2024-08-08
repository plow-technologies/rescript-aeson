type rec line = {
  start: point,
  end_: point,
  thickness: option<int>,
}
and point = {
  x: float,
  y: float,
}

module Decode = {
  let point = json => {
    open! Aeson.Decode
    {
      x: field("x", float, json),
      y: field("y", float, json),
    }
  }

  let line = json => {
    open Aeson.Decode
    {
      start: field("start", point, json),
      end_: field("end", point, json),
      thickness: optional(x => field("thickness", int, x), json),
    }
  }
}

let data = ` {
  "start": { "x": 1.1, "y": -0.4 },
  "end":   { "x": 5.3, "y": 3.8 }
} `

let _ = Js.log(Decode.line(Js.Json.parseExn(data)))
