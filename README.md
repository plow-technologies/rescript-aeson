# rescript-aeson

Previously known as `bs-aeson`.

## Example

```rescript
type point = {
  x: float,
  y: float
}

type line = {
  start: point,
  end_: point,
  thickness: option<int>
}

module Decode = {
  let point = json =>
    Aeson.Decode.{
      x: field("x", float, json),
      y: field("y", float, json)
    }

  let line = json =>
    Aeson.Decode.{
      start: field("start", point, json),
      end_: field("end", point, json),
      thickness: optional(x => field("thickness", int, x), json)
    }
}

let data = "{
  'start': { 'x': 1.1, 'y': -0.4 },
  'end':   { 'x': 5.3, 'y': 3.8 }
}"

let line = data->Js.Json.parseExn->Decode.line
```

## Installation

```sh
npm install --save @plow/rescript-aeson
```

Then add `rescript-aeson` to `bs-dependencies` in your `rescript.json`:
```js
{
  ...
  "bs-dependencies": ["rescript-aeson"]
}
```
