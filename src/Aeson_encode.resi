@@ocaml.text(" Provides functions for encoding a JSON data structure ")

@ocaml.doc(" The type of a encoder combinator ")
type encoder<'a> = 'a => Js.Json.t

@val @ocaml.doc(" [null] is the singleton null JSON value ")
external null: Js.Json.t = "null"

@ocaml.doc(" [string s] makes a JSON string of the [string] [s] ")
external string: string => Js.Json.t = "%identity"

@ocaml.doc(" [float n] makes a JSON number of the [float] [n] ")
let float: float => Js.Json.t

@ocaml.doc(" [int n] makes a JSON number of the [int] [n] ")
external int: int => Js.Json.t = "%identity"

@ocaml.doc(" [bigint n] makes a JSON number of the [bigint] [n] in the format of a string ")
let bigint: bigint => Js.Json.t

@ocaml.doc(" [bool b] makes a JSON boolean of the [Js.bool] [b] ")
external bool: bool => Js.Json.t = "%identity"

@ocaml.doc(" [nullable encoder option] returns either the encoded value or [Js.Json.null] ")
let nullable: (encoder<'a>, option<'a>) => Js.Json.t

@ocaml.doc(
  " [withDefault default encoder option] returns the encoded value if present, oterwise [default] "
)
let withDefault: (Js.Json.t, encoder<'a>, option<'a>) => Js.Json.t

@ocaml.doc(" [dict d] makes a JSON object of the [Js.Dict.t] [d] ")
external dict: Js_dict.t<Js.Json.t> => Js.Json.t = "%identity"

@ocaml.doc(" [object_ props] makes a JSON objet of the [props] list of properties ")
let object_: list<(string, Js.Json.t)> => Js.Json.t

@ocaml.doc(" [array a] makes a JSON array of the [Js.Json.t array] [a] ")
external array: array<Js.Json.t> => Js.Json.t = "%identity"

@ocaml.doc(" [optional encoder a] returns the encoded value in Some, or null if Nothing ")
let optional: (encoder<'a>, option<'a>) => Js.Json.t

@ocaml.doc(" [optionalField encoder fieldName a] returns the encoded value with the
    fieldName in a list, or an empty list if None ")
let optionalField: (string, encoder<'a>, option<'a>) => list<(string, Js.Json.t)>

@ocaml.doc(" [date d] makes a JSON string of the [date] [d] ")
let date: encoder<Js_date.t>

@ocaml.doc(
  " [beltMap k v m] returns the encoded value of a Belt.Map.t(k, v, id) as array of tuples "
)
let beltMap: (encoder<'k>, encoder<'v>, Belt.Map.t<'k, 'v, 'id>) => Js.Json.t

@ocaml.doc(" [beltMap k v m] returns the encoded value of a Belt.Map.t(k, v, id) as dictionary ")
let beltMap1: (encoder<'k>, encoder<'v>, Belt.Map.t<'k, 'v, 'id>) => Js.Json.t

@ocaml.doc(" [beltMapInt v m] returns the encoded value of a Belt.Map.Int.t(v) ")
let beltMapInt: (encoder<'v>, Belt.Map.Int.t<'v>) => Js.Json.t

@ocaml.doc(" [beltMapString v m] returns the encoded value of a Belt.Map.String.t(v) ")
let beltMapString: (encoder<'v>, Belt.Map.String.t<'v>) => Js.Json.t

@ocaml.doc(" [list encoder l] makes a JSON array of the [list] [l] using the given [encoder] ")
let list: (encoder<'a>, list<'a>) => Js.Json.t

@@ocaml.text(" The functions below are specialized for specific array type which
    happened to be already JSON object in the BuckleScript runtime. Therefore
    they are more efficient (constant time rather than linear conversion). ")

let pair: (encoder<'a>, encoder<'b>, ('a, 'b)) => Js.Json.t

let tuple2: (encoder<'a>, encoder<'b>, ('a, 'b)) => Js.Json.t

let tuple3: (encoder<'a>, encoder<'b>, encoder<'c>, ('a, 'b, 'c)) => Js.Json.t

let tuple4: (encoder<'a>, encoder<'b>, encoder<'c>, encoder<'d>, ('a, 'b, 'c, 'd)) => Js.Json.t

let tuple5: (
  encoder<'a>,
  encoder<'b>,
  encoder<'c>,
  encoder<'d>,
  encoder<'e>,
  ('a, 'b, 'c, 'd, 'e),
) => Js.Json.t

let tuple6: (
  encoder<'a>,
  encoder<'b>,
  encoder<'c>,
  encoder<'d>,
  encoder<'e>,
  encoder<'f>,
  ('a, 'b, 'c, 'd, 'e, 'f),
) => Js.Json.t

let tuple7: (
  encoder<'a>,
  encoder<'b>,
  encoder<'c>,
  encoder<'d>,
  encoder<'e>,
  encoder<'f>,
  encoder<'g>,
  ('a, 'b, 'c, 'd, 'e, 'f, 'g),
) => Js.Json.t

let tuple8: (
  encoder<'a>,
  encoder<'b>,
  encoder<'c>,
  encoder<'d>,
  encoder<'e>,
  encoder<'f>,
  encoder<'g>,
  encoder<'h>,
  ('a, 'b, 'c, 'd, 'e, 'f, 'g, 'h),
) => Js.Json.t

let tuple9: (
  encoder<'a>,
  encoder<'b>,
  encoder<'c>,
  encoder<'d>,
  encoder<'e>,
  encoder<'f>,
  encoder<'g>,
  encoder<'h>,
  encoder<'i>,
  ('a, 'b, 'c, 'd, 'e, 'f, 'g, 'h, 'i),
) => Js.Json.t

let tuple10: (
  encoder<'a>,
  encoder<'b>,
  encoder<'c>,
  encoder<'d>,
  encoder<'e>,
  encoder<'f>,
  encoder<'g>,
  encoder<'h>,
  encoder<'i>,
  encoder<'j>,
  ('a, 'b, 'c, 'd, 'e, 'f, 'g, 'h, 'i, 'j),
) => Js.Json.t

let result: (encoder<'a>, encoder<'b>, Belt.Result.t<'a, 'b>) => Js.Json.t

let either: (encoder<'l>, encoder<'r>, Aeson_compatibility.Either.t<'l, 'r>) => Js.Json.t

@ocaml.doc(
  " [singleEnumerator a] takes a value and returns an empty JSON array. Useful for encoding a single enumerator that matches Haskell aeson. "
)
let singleEnumerator: encoder<'a>

@ocaml.doc(" [stringArray a] makes a JSON array of the [string array] [a] ")
external stringArray: array<string> => Js.Json.t = "%identity"

@ocaml.doc(" [numberArray a] makes a JSON array of the [float array] [a] ")
external numberArray: array<float> => Js.Json.t = "%identity"

@ocaml.doc(" [boolArray] makes a JSON array of the [bool array] [a] ")
external boolArray: array<bool> => Js.Json.t = "%identity"
