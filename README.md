# bs-aeson

## Example

```ml
(* OCaml *)
type line = {
  start: point;
  end_: point;
  thickness: int option
}
and point = {
  x: float;
  y: float
}

module Decode = struct
  let point json =
    let open! Aeson.Decode in {
      x = json |> field "x" float;
      y = json |> field "y" float
    }

  let line json =
    Aeson.Decode.{
      start     = json |> field "start" point;
      end_      = json |> field "end" point;
      thickness = json |> optional (field "thickness" int)
    }
end

let data = {| {
  "start": { "x": 1.1, "y": -0.4 },
  "end":   { "x": 5.3, "y": 3.8 }
} |}

let line = data |> Js.Json.parseExn
                |> Decode.line
```

```reason
/* Reason */
type line = {
  start: point,
  end_: point,
  thickness: option int
}
and point = {
  x: float,
  y: float
};

module Decode = {
  let point json =>
    Aeson.Decode.{
      x: json |> field "x" float,
      y: json |> field "y" float
    };
  
  let line json =>
    Aeson.Decode.{
      start:     json |> field "start" point,
      end_:      json |> field "end" point,
      thickness: json |> optional (field "thickness" int)
    };
};

let data = {| {
  "start": { "x": 1.1, "y": -0.4 },
  "end":   { "x": 5.3, "y": 3.8 }
} |};

let line = data |> Js.Json.parseExn
                |> Decode.line;
```


## Installation

```sh
npm install --save bs-aeson
```

Then add `bs-aeson` to `bs-dependencies` in your `bsconfig.json`:
```js
{
  ...
  "bs-dependencies": ["bs-aeson"]
}
```

## Changes

### 2.0.0

* Remove support for `Js.boolean`. Remove `Aeson.Decode.boolean`, `Aeson.Decode.booleanArray`, `Aeson.Encode.boolean` and `Aeson.Encode.boolean`.
* Add `Aeson.Decode.boolArray` and `Aeson.Encode.boolArray`.
* Require BuckleScript >= 3.0.0.

### 1.1.0

* Add `Aeson.Encode.singleEnumerator` and `Aeson.Decode.singleEnumerator` to support Haskell aeson style of serializing a enumeration type with only a single enumerator (as an empty JSON list `[]`).

* Add `Aeson.Compatibility.Either` and serialization functions.

* Fix `Aeson.Encode.date` and `Aeson.Decode.int`.

### 1.0.0

* Fork from [bs-json](https://github.com/reasonml-community/bs-json).

* Add `Aeson.Decode.date`, `Aeson.Decode.tuple2`, `Aeson.Decode.tuple3`, `Aeson.Decode.tuple4`, `Aeson.Decode.tuple5`, `Aeson.Decode.tuple6`, `Aeson.Decode.unwrapResult`.

* Add `Aeson.Encode.tuple2`, `Aeson.Encode.tuple3`, `Aeson.Encode.tuple4`, `Aeson.Encode.tuple5`, `Aeson.Encode.tuple6`.
