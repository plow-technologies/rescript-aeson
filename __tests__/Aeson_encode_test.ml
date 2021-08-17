open Jest
open Expect
open! Aeson.Encode

module Test = struct
  type singleEnumerator =
    | SingleEnumerator
end

type onpingKey =
  | OnpingKey of string  

let encodeOnpingKey (x: onpingKey) =
  match x with
  | OnpingKey x -> string x

module OnpingKeyComparable =
  Belt.Id.MakeComparable(struct
      type t = onpingKey
      let cmp = compare
    end)

type onpingDescription =
  { descriptions : (onpingKey, string, OnpingKeyComparable.identity) Belt.Map.t
  }

let encodeOnpingDescription (x: onpingDescription) =
  let v: Js.Json.t = Aeson.Encode.beltMap encodeOnpingKey Aeson.Encode.string x.descriptions in
  Aeson.Encode.object_
    [ ( "descriptions", v )
    ]

type pid =
  | Pid of int

let encodePid (x: pid) =
  match x with
  | Pid x -> int x

module PidComparable =
  Belt.Id.MakeComparable(struct
      type t = pid
      let cmp = compare
    end)

let _ =

test "null" (fun () ->
  expect null |> toEqual @@ Obj.magic Js.null);

test "string" (fun () ->
  expect @@ string "foo" |> toEqual @@ Obj.magic "foo");

test "date - non-float time" (fun () ->
  let nowString = "2017-12-08T06:03:22Z" in
  let now = Js_date.fromString nowString in
  expect @@ date now |> toEqual @@ Obj.magic nowString);

test "date - float time" (fun () ->
  let nowString = "2017-12-08T06:03:22.123Z" in
  let now = Js_date.fromString nowString in
  expect @@ date now |> toEqual @@ Obj.magic nowString);

test "float" (fun () ->
  expect @@ float 1.23 |> toEqual @@ Obj.magic 1.23);

test "int" (fun () ->
  expect @@ int 23 |> toEqual @@ Obj.magic 23);

test "int32" (fun () ->
  expect @@ int32 (Int32.of_int 23) |> toEqual @@ Obj.magic 23);

test "int64_to_array" (fun () ->
  expect @@ int64_to_array (Int64.of_int 23) |> toEqual @@ Obj.magic [|0;23|]);

test "int64_to_string" (fun () ->
  expect @@ int64_to_string (Int64.of_int 23) |> toEqual @@ Obj.magic "23");

test "uint8" (fun () ->
  expect @@ uint8 (U.UInt8.ofInt 18) |> toEqual @@ Obj.magic 18);

test "uint16" (fun () ->
  expect @@ uint16 (U.UInt16.ofInt 18) |> toEqual @@ Obj.magic 18);

test "uint32" (fun () ->
  expect @@ uint32 (U.UInt32.ofInt 18) |> toEqual @@ Obj.magic 18);

test "uint64" (fun () ->
  expect @@ uint64 (U.UInt64.ofInt 233) |> toEqual @@ Obj.magic "233");

test "bigint" (fun () ->
  expect @@ bigint (Bigint.of_string "38293829382888882338928") |> toEqual @@ Obj.magic "38293829382888882338928");

test "bigint" (fun () ->
  expect @@ bigint (Bigint.of_string "-38293829382888882338928") |> toEqual @@ Obj.magic "-38293829382888882338928");

test "bool" (fun () ->
  expect @@ bool true |> toEqual @@ Obj.magic true);

test "onpingKey string Belt.Map.t" (fun () ->
  let arr = [|("a", "A"); ("b", "B")|] in
  let arrWithKey = Array.map (fun (k, v) -> (OnpingKey k, v)) arr in
  let bm: (onpingKey, string, OnpingKeyComparable.identity) Belt.Map.t = Belt.Map.fromArray arrWithKey ~id:(module OnpingKeyComparable) in
  expect @@ beltMap encodeOnpingKey string bm |> toEqual @@ Obj.magic arr);

test "pid string Belt.Map.t" (fun () ->
  let arr = [|(1, "A"); (2, "B")|] in
  let arrWithKey = Array.map (fun (k, v) -> (Pid k, v)) arr in
  let bm: (pid, string, PidComparable.identity) Belt.Map.t = Belt.Map.fromArray arrWithKey ~id:(module PidComparable) in
  expect @@ beltMap encodePid string bm |> toEqual @@ Obj.magic arr);

test "string Belt.Map.Int.t" (fun () ->
  let arr = [|(1, "A"); (2, "B")|] in
  let bm: string Belt.Map.Int.t = Belt.Map.Int.fromArray arr in
  expect @@ beltMapInt string bm |> toEqual @@ Obj.magic @@ Js.Dict.fromArray (Array.map (fun (k,v) -> (string_of_int k, v)) arr));

test "string Belt.Map.String.t" (fun () ->
  let arr = [|("a", "A"); ("b", "B")|] in
  let bm: string Belt.Map.String.t = Belt.Map.String.fromArray arr in
  expect @@ beltMapString string bm |> toEqual @@ Obj.magic @@ Js.Dict.fromArray arr);

test "dict - empty" (fun () ->
  expect @@ dict @@ Js.Dict.empty () |> toEqual @@ Obj.magic @@ Js.Dict.empty ());

test "dict - simple" (fun () ->
  let o = Js.Dict.empty () in
  Js.Dict.set o "x" (int 42);
  expect @@ dict o |> toEqual @@ Obj.magic o);

test "object_ - empty" (fun () ->
  expect @@ object_ @@ [] |> toEqual @@ Obj.magic @@ Js.Dict.empty ());

test "object_ - simple" (fun () ->
  expect @@ object_ [("x", int 42)] |> toEqual @@ Obj.magic (Js.Dict.fromList [("x", 42)]));

test "object_ - option" (fun () ->
  expect @@ object_ [("x", optional int (Some 42))] |> toEqual @@ Obj.magic (Js.Dict.fromList [("x", 42)]));

test "object_ - option Some" (fun () ->
  expect @@ object_ [("x", optional int (Some 42))] |> toEqual @@ Obj.magic (Js.Dict.fromList [("x", 42)]));

test "object_ - option None" (fun () ->
  expect @@ object_ [("x", optional int None)] |> toEqual @@ Obj.magic (Js.Dict.fromList [("x", null)]));

test "object_ - optionalField Some" (fun () ->
  expect @@ object_ (optionalField "x" int (Some 42)) |> toEqual @@ Obj.magic (Js.Dict.fromList [("x", 42)]));

test "object_ - optionalField Some" (fun () ->
  expect @@ object_ (optionalField "x" int (None : int option)) |> toEqual @@ Obj.magic (Js.Dict.fromList []));

test "array int" (fun () ->
  expect @@ array ([|1;2;3|] |> Array.map int) |> toEqual @@ Obj.magic [|1;2;3|]);

test "list int" (fun () ->
  expect @@ list int [1;2;3] |> toEqual @@ Obj.magic [|1;2;3|]);

test "singleEnumerator typeParameterRef0" (fun () ->
  expect @@ singleEnumerator Test.SingleEnumerator |> toEqual @@ Obj.magic [||]);

test "stringArray" (fun () ->
  expect @@ stringArray [|"a";"b"|]  |> toEqual @@ Obj.magic [|"a";"b"|]);

test "numberArray" (fun () ->
  expect @@ numberArray [|0.;4.|] |> toEqual @@ Obj.magic [|0;4|]);

test "boolArray" (fun () ->
  expect @@ boolArray [|true ; false|] |> toEqual @@ Obj.magic [|true; false|]);

test "result" (fun () ->
  expect @@ (result string int (Belt.Result.Error 123)) |> toEqual @@ Obj.magic (Js.Dict.fromList [("Error", 123)]));
  
test "result" (fun () ->
  expect @@ (result string int (Belt.Result.Ok "Good")) |> toEqual @@ Obj.magic (Js.Dict.fromList [("Ok", "Good")]));
  
test "either" (fun () ->
  expect @@ (either int string (Aeson.Compatibility.Either.Left 123)) |> toEqual @@ Obj.magic (Js.Dict.fromList [("Left", 123)]));
  
test "either" (fun () ->
  expect @@ (either int string (Aeson.Compatibility.Either.Right "Good")) |> toEqual @@ Obj.magic (Js.Dict.fromList [("Right", "Good")]));

test "pair" (fun () ->
  expect @@ (pair int string (1, "a")) |> toEqual @@ (Js.Json.parseExn {| [1, "a"] |}));

test "tuple3" (fun () ->
  expect @@ (tuple3 int string bool (1, "a", false)) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false] |}));

test "tuple4" (fun () ->
  expect @@ (tuple4 int string bool int (1, "a", false, 2)) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false, 2] |}));

test "tuple5" (fun () ->
  expect @@ (tuple5 int string bool int bool (1, "a", false, 2, true)) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false, 2, true] |}));

test "tuple6" (fun () ->
  expect @@ (tuple6 int string bool int bool string (1, "a", false, 2, true, "loop")) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false, 2, true, "loop"] |}));

test "tuple7" (fun () ->
  expect @@ (tuple7 int string bool int bool string string (1, "a", false, 2, true, "loop", "recursion")) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false, 2, true, "loop", "recursion"] |}));

test "tuple8" (fun () ->
  expect @@ (tuple8 int string bool int bool string string int (1, "a", false, 2, true, "loop", "recursion", 33)) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false, 2, true, "loop", "recursion", 33] |}));

test "tuple9" (fun () ->
  expect @@ (tuple9 int string bool int bool string string int string (1, "a", false, 2, true, "loop", "recursion", 33, "blah")) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false, 2, true, "loop", "recursion", 33, "blah"] |}));

test "tuple10" (fun () ->
  expect @@ (tuple10 int string bool int bool string string int string bool (1, "a", false, 2, true, "loop", "recursion", 33, "blah", false)) |> toEqual @@ (Js.Json.parseExn {| [1, "a", false, 2, true, "loop", "recursion", 33, "blah", false] |}));
