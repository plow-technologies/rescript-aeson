# bs-aeson

bs-aeson is a fork of [https://github.com/glennsl/bs-json](bs-json). It provides a set of serialization functions (Aeson.Encode and Aeson.Decode) and missing types (Aeson.Compatibility) to help interface BuckleScript front-end code to a Haskell back-end that is using the [http://hackage.haskell.org/package/aeson](aeson) library to serialize data.

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

## Documentation

### API

Please see the interface files:

* [Aeson](https://github.com/plow-technologies/bs-aeson/blob/master/src/Aeson.mli)
* [Aeson.Encode](https://github.com/plow-technologies/bs-aeson/blob/master/src/Aeson_encode.mli)
* [Aeson.Compatibility](https://github.com/plow-technologies/bs-aeson/blob/master/src/Aeson_compatibility.mli)
* [Aeson.Decode](https://github.com/plow-technologies/bs-aeson/blob/master/src/Aeson_decode.mli)

## Changes

### 1.2.0

* Add `Aeson.Compatibility.Rational`, `Aeson.Decode.rational` and `Aeson.Encode.rational`.

* Add tests for `Aeson.Compatibility.Either` and `Aeson.Compatibility.Rational`.

### 1.1.0

* Add `Aeson.Encode.singleEnumerator` and `Aeson.Decode.singleEnumerator` to support Haskell aeson style of serializing a enumeration type with only a single enumerator (as an empty JSON list `[]`).

* Add `Aeson.Compatibility.Either`, `Aeson.Decode.either` and `Aeson.Encode.either`.

* Fix `Aeson.Encode.date` and `Aeson.Decode.int`.

### 1.0.0

* Fork from [bs-json](https://github.com/reasonml-community/bs-json).

* Add `Aeson.Decode.date`, `Aeson.Decode.tuple2`, `Aeson.Decode.tuple3`, `Aeson.Decode.tuple4`, `Aeson.Decode.tuple5`, `Aeson.Decode.tuple6`, `Aeson.Decode.unwrapResult`.

* Add `Aeson.Encode.tuple2`, `Aeson.Encode.tuple3`, `Aeson.Encode.tuple4`, `Aeson.Encode.tuple5`, `Aeson.Encode.tuple6`.
