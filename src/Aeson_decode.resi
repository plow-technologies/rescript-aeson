@@ocaml.text(" Provides a set of low level combinator primitives to decode Js.Json.t data
structures
A decoder combinator will return the decoded value if successful, or raise a
[DecodeError of string] if unsuccessful, where the string argument contains the
error message.
Decoders are designed to be combined to produce more complex decoders that can
decode arbitrary data structures, though the emphasis for this library is for
it to be {i possible} to decode any given data structure, not necessarily for
it to be {i convenient}. For convenience you should look towards opinionated
third-party libraries.
")

@ocaml.doc(" The type of a decoder combinator ")
type decoder<'a> = Js.Json.t => 'a

exception DecodeError(string)

@ocaml.doc(" Decodes a JSON value into a [bool]

{b Returns} a [bool] if the JSON value is a number.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns Js.true_ *)
  let _ = Js.Json.parseExn \"true\" |> Decode.bool
  (* returns Js.false_ *)
  let _ = Js.Json.parseExn \"false\" |> Decode.bool
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"123\" |> Decode.bool
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"null\" |> Decode.bool
]}
")
let bool: decoder<bool>

@ocaml.doc(" Decodes a JSON value into a [float]

{b Returns} a [float] if the JSON value is a number.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 1.23 *)
  let _ = Js.Json.parseExn \"1.23\" |> Decode.float
  (* returns 23. *)
  let _ = Js.Json.parseExn \"23\" |> Decode.float
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"true\" |> Decode.float
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"null\" |> Decode.float
]}
")
let float: decoder<float>

@ocaml.doc(" Decodes a JSON value into an [int]

{b Returns} an [int] if the JSON value is a number.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 23 *)
  let _ = Js.Json.parseExn \"23\" |> Decode.int
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"1.23\" |> Decode.int
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"true\" |> Decode.int
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"null\" |> Decode.int
]}
")
let int: decoder<int>

/* DO NOT USE */
let uint8: decoder<U.UInt8.t>
let uint16: decoder<U.UInt16.t>
let uint32: decoder<U.UInt32.t>
let uint64: decoder<U.UInt64.t>

/* Decodes a JSON value into an [int32] */
let int32: decoder<int32>

/* Decodes a JSON value into an [int64] */
let int64: decoder<int64>

/* Decodes a JSON value into an [int64] that is stored as an array [high,low] where high is signed and low is unsigned. */
let int64_of_array: decoder<int64>

/* Decodes a JSON value into an [int64] */
let int64_of_string: decoder<int64>

@ocaml.doc(" Decodes a JSON value into an [bigint] ")
let bigint: decoder<BigInt.t>

@ocaml.doc(" Decodes a JSON value into a [string]

{b Returns} a [string] if the JSON value is a number.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns \"foo\" *)
  let _ = Js.Json.parseExn \"\"foo\"\" |> Decode.string
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"1.23\" |> Decode.string
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"null\" |> Decode.string
]}
")
let string: decoder<string>

let date: decoder<Js_date.t>

@ocaml.doc(" Decodes a JSON value into an ['a Js.null]

{b Returns} [Js.null] if the JSON value is [null], or an ['a Js.null] if the
given decoder succeeds,

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns (Js.Null.return 23) *)
  let _ = Js.Json.parseExn \"23\" |> Decode.(nullable int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"1.23\" |> Decode.(nullable int)
  (* returns Js.null *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(nullable int)
]}
")
let nullable: (decoder<'a>, Js.Json.t) => Js.Null.t<'a>

@ocaml.doc(" Returns the given value if the JSON value is [null]

{b Returns} an ['a] if the JSON value is [null].

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"x\" |> Decode.nullAs \"x\"
  (* returns \"x\" *)
  let _ = Js.Json.parseExn \"null\" |> Decode.nullAs \"x\"
  (* returns None *)
  let _ = Js.Json.parseExn \"null\" |> Decode.nullAs None
]}
")
let nullAs: ('a, Js.Json.t) => 'a

@ocaml.doc(" Decodes a JSON array into an ['a array] using the given decoder on each element

{b Returns} an ['a array] if the JSON value is a JSON array and all its
elements are successfully decoded.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns [| 1; 2; 3 |] *)
  let _ = Js.Json.parseExn \"[1, 2, 3]\" |> Decode.(array int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"[1, 2, \"c\"]\" |> Decode.(array int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"123\" |> Decode.(array int)
  (* returns None *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(array int)
]}
")
let array: (decoder<'a>, Js.Json.t) => array<'a>

@ocaml.doc(" [beltMap k v m]
    Decodes a JSON array of a JSON array with two elements into a ('k , 'v, 'id) Belt.Map.t
    using the k and v decodes.
 ")
let beltMap: (
  decoder<'k>,
  decoder<'v>,
  ~id: Belt.Map.id<'k, 'c>,
  Js.Json.t,
) => Belt.Map.t<'k, 'v, 'c>

@ocaml.doc(" [beltMapString k v m] ")
let beltMapInt: (decoder<'v>, Js.Json.t) => Belt.Map.Int.t<'v>

@ocaml.doc(" [beltMapString k v m] ")
let beltMapString: (decoder<'v>, Js.Json.t) => Belt.Map.String.t<'v>

@ocaml.doc(" Decodes a JSON array into an ['a list] using the given decoder on each element

{b Returns} an ['a list] if the JSON value is a JSON array and all its
elements are successfully decoded.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns [1; 2; 3] *)
  let _ = Js.Json.parseExn \"[1, 2, 3]\" |> Decode.(list int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"[1, 2, \"c\"]\" |> Decode.(list int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"123\" |> Decode.(list int)
  (* returns None *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(list int)
]}
")
let list: (decoder<'a>, Js.Json.t) => list<'a>

@ocaml.doc(" Decodes a JSON array with two elements into an ['a * 'b] tuple using the
    first decoder on the left element and the second decoder on the right

{b Returns} an ['a * 'b] if the JSON value is a JSON array of length 2 and both
    its elements are successfully decoded.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns (1, \"bar\") *)
  let _ = Js.Json.parseExn \"[1, \"bar\"]\" |> Decode.(pair int string)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"[1, 2]\" |> Decode.(pair int string)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"[1, 2, 3]\" |> Decode.(pair int int)
]}
")
let pair: (decoder<'a>, decoder<'b>, Js.Json.t) => ('a, 'b)

let tuple2: (decoder<'a>, decoder<'b>, Js.Json.t) => ('a, 'b)

let tuple3: (decoder<'a>, decoder<'b>, decoder<'c>, Js.Json.t) => ('a, 'b, 'c)

let tuple4: (decoder<'a>, decoder<'b>, decoder<'c>, decoder<'d>, Js.Json.t) => ('a, 'b, 'c, 'd)

let tuple5: (
  decoder<'a>,
  decoder<'b>,
  decoder<'c>,
  decoder<'d>,
  decoder<'e>,
  Js.Json.t,
) => ('a, 'b, 'c, 'd, 'e)

let tuple6: (
  decoder<'a>,
  decoder<'b>,
  decoder<'c>,
  decoder<'d>,
  decoder<'e>,
  decoder<'f>,
  Js.Json.t,
) => ('a, 'b, 'c, 'd, 'e, 'f)

let tuple7: (
  decoder<'a>,
  decoder<'b>,
  decoder<'c>,
  decoder<'d>,
  decoder<'e>,
  decoder<'f>,
  decoder<'g>,
  Js.Json.t,
) => ('a, 'b, 'c, 'd, 'e, 'f, 'g)

let tuple8: (
  decoder<'a>,
  decoder<'b>,
  decoder<'c>,
  decoder<'d>,
  decoder<'e>,
  decoder<'f>,
  decoder<'g>,
  decoder<'h>,
  Js.Json.t,
) => ('a, 'b, 'c, 'd, 'e, 'f, 'g, 'h)

let tuple9: (
  decoder<'a>,
  decoder<'b>,
  decoder<'c>,
  decoder<'d>,
  decoder<'e>,
  decoder<'f>,
  decoder<'g>,
  decoder<'h>,
  decoder<'i>,
  Js.Json.t,
) => ('a, 'b, 'c, 'd, 'e, 'f, 'g, 'h, 'i)

let tuple10: (
  decoder<'a>,
  decoder<'b>,
  decoder<'c>,
  decoder<'d>,
  decoder<'e>,
  decoder<'f>,
  decoder<'g>,
  decoder<'h>,
  decoder<'i>,
  decoder<'j>,
  Js.Json.t,
) => ('a, 'b, 'c, 'd, 'e, 'f, 'g, 'h, 'i, 'j)

let singleEnumerator: ('a, Js.Json.t) => 'a

@ocaml.doc(" Decodes a JSON object into a dict using the given decoder on each of its values

{b Returns} an ['a Js.Dict.t] if the JSON value is a JSON object and all its
values are successfully decoded.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns (Js.Dict.fromList [(\"x\", 23); (\"y\", 42)]) *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": 42 } |} |> Decode.(dict int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(dict int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"123\" |> Decode.(dict int)
  (* returns None *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(dict int)
]}
")
let dict: (decoder<'a>, Js.Json.t) => Js.Dict.t<'a>

@ocaml.doc(" Decodes a JSON object with a specific field into the value of that field

{b Returns} an ['a] if the JSON value is a JSON object with the given field
and a value that is successfully decoded with the given decoder.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 23 *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": 42 } |} |> Decode.(field \"x\" int)
  (* returns 23 *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(field \"x\" int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(field \"y\" int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"123\" |> Decode.(field \"x\" int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(field \"x\" int)
]}
")
let field: (string, decoder<'a>, Js.Json.t) => 'a

@ocaml.doc(" Decodes a JSON object with a specific field into the value of that field
    if the field exists

@raise [DecodeError] if the field exists but the decoder is unsuccessful
")
let optionalField: (string, decoder<'a>, Js.Json.t) => option<'a>

@ocaml.doc(" Same as [field] but takes a top level field and a list of nested fields for decoding nested values.

{b Returns} an ['a] if the JSON value is a JSON object with the given field
and a value that is successfully decoded with the given decoder.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 23 *)
  let _ = Js.Json.parseExn {| { \"x\": {\"foo\": 23}, \"y\": 42 } |} |> Decode.(at [\"x\"; \"foo\"] int)
  (* raises DecodeError *)
  let _ = Js.Json.parseExn {| { \"x\": null, \"y\": \"b\" } |} |> Decode.(at [\"x\"; \"foo\"] int)
]}
")
let at: (list<string>, decoder<'a>, Js.Json.t) => 'a

@ocaml.doc(" Maps a decoder [result] to an option

{b Returns} [Some of 'a] if the given decoder is successful, [None] if
it is not.

This decoder will never raise a [DecodeError]. Its purpose is to catch and
transform [DecodeError]'s of a given decoder into [None]s by mapping its
[result] into an [option]. This prevents a decoder error from terminating
a composite decoder, and is useful to decode optional JSON object fields.

@example {[
  open Json
  (* returns (Some 23) *)
  let _ = Js.Json.parseExn \"23\" |> Decode.(optional int)
  (* returns None *)
  let _ = Js.Json.parseExn 1.23 |> Decode.(optional int)
  (* returns None *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(optional int)
  (* returns (Some 23) *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(optional (field \"x\" int))
  (* returns None *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(optional (field \"y\" int))
  (* returns None *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(optional (field \"z\" int))
  (* returns (Some 23) *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(field \"x\" (optional int))
  (* returns None *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(field \"y\" (optional int))
  (* raises DecodeError *)
  let _ = Js.Json.parseExn {| { \"x\": 23, \"y\": \"b\" } |} |> Decode.(field \"z\" (optional int))
]}
")
let optional: (decoder<'a>, Js.Json.t) => option<'a>

let result: (decoder<'a>, decoder<'b>, Js.Json.t) => Belt.Result.t<'a, 'b>

let either: (decoder<'l>, decoder<'r>, Js.Json.t) => Aeson_compatibility.Either.t<'l, 'r>

@ocaml.doc(" Tries each [decoder] in order, retunring the result of the first that succeeds

{b Returns} an ['a] if one of the decoders succeed.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 23 *)
  let _ = Js.Json.parseExn \"23\" |> Decode.(oneOf [int; field \"x\" int])
  (* returns 42 *)
  let _ = Js.Json.parseExn {| { \"x\": 42 } |}  |> Decode.(oneOf [int; field \"x\" int])
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(oneOf [int; field \"x\" int]
]}
")
let oneOf: (list<decoder<'a>>, Js.Json.t) => 'a

let tryEither: (decoder<'a>, decoder<'a>, Js.Json.t) => 'a

@@ocaml.text(" Tries each [decoder] in order, returning the result of the first that succeeds

{b Returns} an ['a] if one of the decoders succeed.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 23 *)
  let _ = Js.Json.parseExn \"23\" |> Decode.(tryEither int (field \"x\" int))
  (* returns 42 *)
  let _ = Js.Json.parseExn {| { \"x\": 42 } |}  |> Decode.(tryEither int (field \"x\" int))
  (* raises DecodeError *)
  let _ = Js.Json.parseExn \"null\" |> Decode.(tryEither int (field \"x\" int))
]}
")

@ocaml.doc(" Tries each [decoder] in order, retunring the result of the first that succeeds

{b Returns} an ['a] if one of the decoders succeed.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 23 *)
  let _ = Js.Json.parseExn \"23\" |> Decode.withDefault 0 int
  (* returns 0 *)
  let _ = Js.Json.parseExn \"\"x\"\" |> Decode.withDefault 0 int
  (* returns 0 *)
  let _ = Js.Json.parseExn \"null\" |> Decode.withDefault 0 int
]}
")
let withDefault: ('a, decoder<'a>, Js.Json.t) => 'a

@ocaml.doc(" Returns a decoder that maps the result of the given decoder if successful

{b Returns} a ['b] if the given decoder succeeds.

@raise [DecodeError] if unsuccessful

@example {[
  open Json
  (* returns 46 *)
  let _ = Js.Json.parseExn \"23\" |> Decode.map (fun x -> x * x) int
]}
")
let map: ('a => 'b, decoder<'a>, Js.Json.t) => 'b

@ocaml.doc(" Returns a decoder that maps the result of the given decoder if successful

{b Returns} an ['a] if both decoders succeed.

@raise [DecodeError] if unsuccessful

@example {[
  (* Deoce a JSON tree structure *)
  type 'a tree =
  | Node of 'a * 'a tree list
  | Leaf of 'a

  let decodeTree decodeValue =
  |> Decode.(
      field \"type\" string
      |> andThen (fun
      | \"node\" -> Node (field \"value\" decodeValue) (field \"children\" (array decodeTree |> map Array.to_list))
      | \"leaf\" -> Leaf (field \"value\" decodeValue)
      )
    )

  let json =
    {| {
      \"type\": \"node\",
      \"value\": 9
      \"children\": [{
        \"type\": \"leaf\",
        \"value\": 5,
        \"children\": [{
          \"type\": \"leaf\",
          \"value\": 3
        }, {
          \"type\": \"leaf\",
          \"value\": 2
        }]
      }, {
          \"type\": \"leaf\",
          \"value\": 4
      }]
    } |}

  let myTree =
    json
    |> Js.Json.parseExn
    |> decodeTree int
]}
")
let andThen: (('a, Js.Json.t) => 'b, decoder<'a>, Js.Json.t) => 'b

let unwrapResult: Belt.Result.t<'a, string> => 'a

let wrapResult: (decoder<'a>, Js.Json.t) => Belt.Result.t<'a, string>
