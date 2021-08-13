open Jest
open Expect

module Test = struct
  type default_case = 
    | Float
    | Int
    | String
    | Null
    | Array
    | Object
    | Bool

  type singleEnumerator =
    | SingleEnumerator
    
  (* TODO: tests for this function *)
  let test decoder prefix = 
    let open Aeson in function
    | Float -> test (prefix ^ "float") (fun () ->
        expectFn decoder (Encode.float 1.23) |> toThrow)
    | Int -> test (prefix ^ "int") (fun () ->
      expectFn decoder (Encode.int 23) |> toThrow);
    | String -> test (prefix ^ "string") (fun () ->
      expectFn decoder (Encode.string "test") |> toThrow);
    | Null -> test (prefix ^ "null") (fun () ->
      expectFn decoder Encode.null |> toThrow);
    | Array -> test (prefix ^ "array") (fun () ->
      expectFn decoder (Encode.array [||]) |> toThrow);
    | Object -> test (prefix ^ "object") (fun () ->
      expectFn decoder (Encode.object_ []) |> toThrow);
    | Bool -> test (prefix ^ "bool") (fun () ->
      expectFn decoder (Encode.bool true) |> toThrow);
  ;;

  let rec throws ?(prefix = "") decoder = function
    | [] -> ();
    | first::rest ->
        test decoder prefix first;
        throws decoder ~prefix rest 
end

type onpingKey =
  | OnpingKey of string  

let decodeOnpingKey json =
  match Aeson.Decode.string json with
  | x -> OnpingKey x

module OnpingKeyComparable =
  Belt.Id.MakeComparable(struct
      type t = onpingKey
      let cmp = compare
    end)

type pid =
  | Pid of int

let decodePid json =
  match Aeson.Decode.int json with
  | x -> Pid x

module PidComparable =
  Belt.Id.MakeComparable(struct
      type t = pid
      let cmp = compare
    end)

let () = 

describe "bool" (fun () ->
  let open Aeson in
  let open Decode in

  test "bool" (fun () ->
    expect @@ bool (Encode.bool true) |> toEqual true);

  test "bool - false" (fun () ->
    expect @@ bool (Encode.bool false) |> toEqual false);
  Test.throws bool [Float; Int; String; Null; Array; Object];
);

describe "float" (fun () ->
  let open Aeson in
  let open! Decode in

  test "float" (fun () ->
    expect @@ float (Encode.float 1.23) |> toEqual 1.23);
  test "int" (fun () ->
    expect @@ float (Encode.int 23) |> toEqual 23.);
  
  Test.throws float [Bool; String; Null; Array; Object;];
);

describe "int" (fun () ->
  let open Aeson in
  let open! Decode in

  test "int" (fun () ->
    expect @@ int (Encode.int 23) |> toEqual 23);

  test "int > 32-bit" (fun () ->
    (* Use %raw since integer literals > Int32.max_int overflow without warning *)
    let big_int = [%raw "2147483648"] in
      expect @@ int (Encode.int big_int) |> toEqual big_int);
  
  Test.throws int [Bool; Float; String; Null; Array; Object];
);

describe "int32" (fun () ->
  let open Aeson in
  let open! Decode in

  test "int32" (fun () ->
    expect @@ int32 (Encode.int32 (Int32.of_int 23)) |> toEqual (Int32.of_int 23));

  test "int32" (fun () ->
    expect @@ int32 (Encode.int32 (Int32.of_int (-23223))) |> toEqual (Int32.of_int (-23223)));
);

describe "int64" (fun () ->
  let open Aeson in
  let open! Decode in

  test "int64" (fun () ->
    expect @@ int64 (Aeson.Encode.string "23") |> toEqual (Int64.of_int 23));

  test "int64" (fun () ->
    expect @@ int64 (Aeson.Encode.int 23) |> toEqual (Int64.of_int 23));

  test "int64" (fun () ->
    expect @@ int64 (Aeson.Encode.int 23) |> toEqual @@ Obj.magic [|0;23|]);
);

describe "int64_of_array" (fun () ->
  let open Aeson in
  let open! Decode in

  test "int64_of_array" (fun () ->
    expect @@ int64_of_array (Encode.int64_to_array (Int64.of_int 23)) |> toEqual (Int64.of_int 23));

  test "int64_of_array" (fun () ->
    expect @@ int64_of_array (Encode.int64_to_array (Int64.of_string "9223372036854775807")) |> toEqual (Int64.of_string "9223372036854775807"));

  test "int64_of_array" (fun () ->
    expect @@ int64_of_array (Encode.int64_to_array (Int64.of_string "-9223372036854775807")) |> toEqual (Int64.of_string "-9223372036854775807"));
);

describe "int64_of_string" (fun () ->
  let open Aeson in
  let open! Decode in

  test "23" (fun () ->
    expect @@ int64_of_string (Encode.int64_to_string (Int64.of_int 23)) |> toEqual (Int64.of_int 23));

  test "-1000" (fun () ->
    expect @@ int64_of_string (Encode.int64_to_string (Int64.of_int (-1000))) |> toEqual (Int64.of_int (-1000)));

  test "-1" (fun () ->
    expect @@ int64_of_string (Encode.int64_to_string (Int64.of_int (-1))) |> toEqual (Int64.of_int (-1)));

  test "23" (fun () ->
    expect @@ int64_of_string (Encode.int64_to_string (Int64.of_string "999999999999")) |> toEqual (Int64.of_string "999999999999"));
  
);

describe "uint8" (fun () ->
  let open Aeson in
  let open! Decode in

  test "uint8" (fun () ->
    expect @@ uint8 (Encode.uint8 (U.UInt8.ofInt 23)) |> toEqual (U.UInt8.ofInt 23));

  test "uint8" (fun () ->
    expect @@ uint8 (Encode.uint8 (U.UInt8.ofInt (255))) |> toEqual (U.UInt8.ofInt (255)));
);

describe "uint16" (fun () ->
  let open Aeson in
  let open! Decode in

  test "uint16" (fun () ->
    expect @@ uint16 (Encode.uint16 (U.UInt16.ofInt 23)) |> toEqual (U.UInt16.ofInt 23));

  test "uint16" (fun () ->
    expect @@ uint16 (Encode.uint16 (U.UInt16.ofInt (1233))) |> toEqual (U.UInt16.ofInt (1233)));
);


describe "uint32" (fun () ->
  let open Aeson in
  let open! Decode in

  test "uint32" (fun () ->
    expect @@ uint32 (Encode.uint32 (U.UInt32.ofInt 23)) |> toEqual (U.UInt32.ofInt 23));

  test "uint32" (fun () ->
    expect @@ uint32 (Encode.uint32 (U.UInt32.ofInt (23223))) |> toEqual (U.UInt32.ofInt (23223)));
);

describe "uint64" (fun () ->
  let open Aeson in
  let open! Decode in

  test "uint64" (fun () ->
    expect @@ uint64 (Encode.uint64 (U.UInt64.ofInt 23)) |> toEqual (U.UInt64.ofInt 23));

  test "uint64" (fun () ->
    expect @@ uint64 (Encode.uint64 (U.UInt64.ofInt (26423))) |> toEqual (U.UInt64.ofInt (26423)));
);

describe "bigint" (fun () ->
  let open Aeson in
  let open! Decode in

  test "23" (fun () ->
    expect @@ bigint (Encode.bigint (Bigint.of_int 23)) |> toEqual (Bigint.of_int 23));

  test "26423" (fun () ->
    expect @@ bigint (Encode.bigint (Bigint.of_int (26423))) |> toEqual (Bigint.of_int (26423)));

  test "-1289848928492483456726423" (fun () ->
    expect @@ bigint (Encode.bigint (Bigint.of_string ("-1289848928492483456726423"))) |> toEqual (Bigint.of_string ("-1289848928492483456726423")));
  );


describe "string" (fun () ->
  let open Aeson in
  let open! Decode in

  test "string" (fun () ->
    expect @@ string (Encode.string "test") |> toEqual "test");

  Test.throws string [Bool; Float; Int; Null; Array; Object];
);

describe "date" (fun () ->
  let open Aeson in
  let open! Decode in
  let nowString = "2017-12-08T06:03:22Z" in
  let now = Js_date.fromString nowString in

  test "date" (fun () ->
    expect @@ date (Encode.date now) |> toEqual now )
);

describe "nullable" (fun () ->
  let open Aeson in
  let open! Decode in

  test "int -> int" (fun () ->
    expect @@ (nullable int) (Encode.int 23) |> toEqual (Js.Null.return 23));
  test "null -> int" (fun () ->
    expect @@ (nullable int) Encode.null |> toEqual Js.null);

  test "bool -> bool" (fun () ->
    expect @@ nullable bool (Encode.bool true) |> toEqual (Js.Null.return true));
  test "float -> float" (fun () ->
    expect @@ nullable float (Encode.float 1.23) |> toEqual (Js.Null.return 1.23));
  test "string -> string" (fun () ->
    expect @@ nullable string (Encode.string "test") |> toEqual (Js.Null.return "test"));
  test "null -> null" (fun () ->
    expect @@ nullable (nullAs Js.null) Encode.null |> toEqual Js.null);

  Test.throws (nullable int) [Bool; Float; String; Array; Object];
  Test.throws (nullable bool) [Int];
);

describe "nullAs" (fun () ->
  let open Aeson in
  let open Decode in

  test "as 0 - null" (fun () ->
    expect @@ (nullAs 0) Encode.null |> toEqual 0);

  test "as Js.null" (fun () ->
    expect (nullAs Js.null Encode.null) |> toEqual Js.null);
  test "as None" (fun () ->
    expect (nullAs None Encode.null) |> toEqual None);
  test "as Some _" (fun () ->
    expect (nullAs (Some "foo") Encode.null) |> toEqual (Some "foo"));

  Test.throws (nullAs 0) [Bool; Float; Int; String; Array; Object];
);

describe "array" (fun () ->
  let open Aeson in
  let open! Decode in

  test "array" (fun () ->
    expect @@ (array int) (Encode.array [||]) |> toEqual [||]);

  test "array bool" (fun () ->
    expect @@
      array bool (Js.Json.parseExn {| [true, false, true] |})
      |> toEqual [| true; false; true |]);
  test "array float" (fun () ->
    expect @@
      array float (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [| 1.; 2.; 3. |]);
  test "array int" (fun () ->
    expect @@
      array int (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [| 1; 2; 3 |]);
  test "array string" (fun () ->
    expect @@
      array string (Js.Json.parseExn {| ["a", "b", "c"] |})
      |> toEqual [| "a"; "b"; "c" |]);
  test "array nullAs" (fun () ->
    expect @@
      array (nullAs Js.null) (Js.Json.parseExn {| [null, null, null] |})
      |> toEqual [| Js.null; Js.null; Js.null |]);
  test "array int -> array bool" (fun () ->
    expectFn
      (array bool) (Js.Json.parseExn {| [1, 2, 3] |})
      |> toThrow);

  Test.throws (array int) [Bool; Float; Int; String; Null; Object];
);

describe "list" (fun () ->
  let open Aeson in
  let open! Decode in

  test "array" (fun () ->
    expect @@ (list int) (Encode.array [||]) |> toEqual []);

  test "list bool" (fun () ->
    expect @@
      list bool (Js.Json.parseExn {| [true, false, true] |})
      |> toEqual [true; false; true]);
  test "list float" (fun () ->
    expect @@
      list float (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [ 1.; 2.; 3.]);
  test "list int" (fun () ->
    expect @@
      list int (Js.Json.parseExn {| [1, 2, 3] |})
      |> toEqual [1; 2; 3]);
  test "list string" (fun () ->
    expect @@
      list string (Js.Json.parseExn {| ["a", "b", "c"] |})
      |> toEqual ["a"; "b"; "c"]);
  test "list nullAs" (fun () ->
    expect @@
      list (nullAs Js.null) (Js.Json.parseExn {| [null, null, null] |})
      |> toEqual [Js.null; Js.null; Js.null]);
  test "array int -> list bool" (fun () ->
    expectFn
      (list bool) (Js.Json.parseExn {| [1, 2, 3] |})
      |> toThrow);

  Test.throws (list int) [Bool; Float; Int; String; Null; Object];
);

describe "pair" (fun () ->
  let open Aeson in
  let open! Decode in

  test "pair string int" (fun () ->
    expect @@ pair string int (Js.Json.parseExn {| ["a", 3] |})
    |> toEqual ("a", 3));
  test "pair int int" (fun () ->
    expect @@ pair int int (Js.Json.parseExn {| [4, 3] |})
    |> toEqual (4, 3));
  test "pair missing" (fun () ->
    expectFn (pair int int) (Js.Json.parseExn {| [4] |})
    |> toThrow);
  test "pair too large" (fun () ->
    expectFn (pair int int) (Js.Json.parseExn {| [3, 4, 5] |})
    |> toThrow);
  test "pair bad left type" (fun () ->
    expectFn (pair int int) (Js.Json.parseExn {| ["3", 4] |})
    |> toThrow);
  test "pair bad right type" (fun () ->
    expectFn (pair string string) (Js.Json.parseExn {| ["3", 4] |})
    |> toThrow);
);


describe "tuple3" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple3 string int string" (fun () ->
    expect @@ tuple3 string int string (Js.Json.parseExn {| ["a", 3, "b"] |})
    |> toEqual ("a", 3, "b"));
);

describe "tuple4" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple4 string int string bool" (fun () ->
    expect @@ tuple4 string int string bool (Js.Json.parseExn {| ["a", 3, "b", true] |})
    |> toEqual ("a", 3, "b", true));
);

describe "tuple5" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple5 string int string bool int" (fun () ->
    expect @@ tuple5 string int string bool int (Js.Json.parseExn {| ["a", 3, "b", true, 98] |})
    |> toEqual ("a", 3, "b", true, 98));
);

describe "tuple6" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple6 string int string bool int string" (fun () ->
    expect @@ tuple6 string int string bool int string (Js.Json.parseExn {| ["a", 3, "b", true, 98, "sleepy"] |})
    |> toEqual ("a", 3, "b", true, 98, "sleepy"));
);

describe "tuple7" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple7 string int string bool int string int" (fun () ->
    expect @@ tuple7 string int string bool int string int (Js.Json.parseExn {| ["a", 3, "b", true, 98, "sleepy", 100] |})
    |> toEqual ("a", 3, "b", true, 98, "sleepy", 100));
);

describe "tuple8" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple8 string int string bool int string int string" (fun () ->
    expect @@ tuple8 string int string bool int string int string (Js.Json.parseExn {| ["a", 3, "b", true, 98, "sleepy", 100, "bedtime"] |})
    |> toEqual ("a", 3, "b", true, 98, "sleepy", 100, "bedtime"));
);

describe "tuple9" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple9 string int string bool int string int string bool" (fun () ->
    expect @@ tuple9 string int string bool int string int string bool (Js.Json.parseExn {| ["a", 3, "b", true, 98, "sleepy", 100, "bedtime", false] |})
    |> toEqual ("a", 3, "b", true, 98, "sleepy", 100, "bedtime", false));
);

describe "tuple10" (fun () ->
  let open Aeson in
  let open! Decode in

  test "tuple10 string int string bool int string int string bool int" (fun () ->
    expect @@ tuple10 string int string bool int string int string bool int (Js.Json.parseExn {| ["a", 3, "b", true, 98, "sleepy", 100, "bedtime", false, 22] |})
    |> toEqual ("a", 3, "b", true, 98, "sleepy", 100, "bedtime", false, 22));
);

describe "singleEnumerator" (fun () ->
  let open Aeson in
  let open! Decode in

  test "singleEnumerator" (fun () ->
    expect @@
      singleEnumerator Test.SingleEnumerator (Encode.array [||])
      |> toEqual Test.SingleEnumerator);
);

describe "string pid Belt.Map.t" (fun () ->
  let open Aeson in
  let open! Decode in
  
  test "test" (fun () ->
    expect @@
      beltMap decodePid string ~id:(module PidComparable) (Js.Json.parseExn {| [[1, "A"], [2, "B"]] |})
      |> toEqual (Belt.Map.fromArray [|(Pid 1, "A"); (Pid 2, "B")|] ~id:(module PidComparable)));  
);

describe "string onpingKey Belt.Map.t" (fun () ->
  let open Aeson in
  let open! Decode in
  
  test "test" (fun () ->
    expect @@
      beltMap decodeOnpingKey string ~id:(module OnpingKeyComparable) (Js.Json.parseExn {| [["a", "A"], ["b", "B"]] |})
      |> toEqual (Belt.Map.fromArray [|(OnpingKey "a", "A"); (OnpingKey "b", "B")|] ~id:(module OnpingKeyComparable)));  
);

describe "string Belt.Map.Int.t" (fun () ->
  let open Aeson in
  let open! Decode in

  test "test" (fun () ->
    expect @@
      beltMapInt string (Js.Json.parseExn {| {"1": "A", "2": "B"} |})
      |> toEqual (Belt.Map.Int.fromArray [|(1, "A"); (2, "B")|]));  
);

describe "string Belt.Map.String.t" (fun () ->
  let open Aeson in
  let open! Decode in

  test "test" (fun () ->
    expect @@
      beltMapString string (Js.Json.parseExn {| {"a": "A", "b": "B"} |})
      |> toEqual (Belt.Map.String.fromArray [|("a", "A"); ("b", "B")|]));  
);

describe "dict" (fun () ->
  let open Aeson in
  let open! Decode in

  test "object" (fun () ->
    expect @@
      dict int (Encode.object_ [])
      |> toEqual (Js.Dict.empty ()));

  test "dict bool" (fun () ->
    expect @@
      dict bool (Js.Json.parseExn {| { "a": true, "b": false } |})
      |> toEqual (Obj.magic [%obj { a = true; b = false }]));
  test "dict float" (fun () ->
    expect @@
      dict float (Js.Json.parseExn {| { "a": 1.2, "b": 2.3 } |})
      |> toEqual (Obj.magic [%obj { a = 1.2; b = 2.3 }]));
  test "dict int" (fun () ->
    expect @@
      dict int (Js.Json.parseExn {| { "a": 1, "b": 2 } |})
      |> toEqual (Obj.magic [%obj { a = 1; b = 2 }]));
  test "dict string" (fun () ->
    expect @@
      dict string (Js.Json.parseExn {| { "a": "x", "b": "y" } |})
      |> toEqual (Obj.magic [%obj { a = "x"; b = "y" }]));
  test "dict nullAs" (fun () ->
    expect @@
      dict (nullAs Js.null) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toEqual (Obj.magic [%obj { a = Js.null; b = Js.null }]));
  test "dict null -> dict string" (fun () ->
    expectFn
      (dict string) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toThrow);

  Test.throws (dict int) [Bool; Float; Int; String; Null; Array];
);

describe "field" (fun () ->
  let open Aeson in
  let open! Decode in

  test "field bool" (fun () ->
    expect @@
      field "b" bool (Js.Json.parseExn {| { "a": true, "b": false } |})
      |> toEqual false);
  test "field float" (fun () ->
    expect @@
      field "b" float (Js.Json.parseExn {| { "a": 1.2, "b": 2.3 } |})
      |> toEqual 2.3);
  test "field int" (fun () ->
    expect @@
      field "b" int (Js.Json.parseExn {| { "a": 1, "b": 2 } |})
      |> toEqual 2);
  test "field string" (fun () ->
    expect @@
      field "b" string (Js.Json.parseExn {| { "a": "x", "b": "y" } |})
      |> toEqual "y");
  test "field nullAs" (fun () ->
    expect @@
      field "b" (nullAs Js.null) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toEqual Js.null);
  test "field null -> field string" (fun () ->
    expectFn
      (field "b" string) (Js.Json.parseExn {| { "a": null, "b": null } |})
      |> toThrow);

  Test.throws (field "foo" int) [Bool; Float; Int; String; Null; Array; Object];
);

describe "at" (fun () ->
  let open Aeson in
  let open! Decode in

  test "at bool" (fun () ->
    expect @@
      at ["a"; "x"; "y"] bool (Js.Json.parseExn {| {
        "a": { "x" : { "y" : false } }, 
        "b": false 
      } |})
      |> toEqual false);
  test "field nullAs" (fun () ->
    expect @@
      at ["a"; "x"] (nullAs Js.null) (Js.Json.parseExn {| {
        "a": { "x" : null }, 
        "b": null 
      } |})
      |> toEqual Js.null);

  Test.throws (at ["foo"; "bar"] int) [Bool; Float; Int; String; Null; Array; Object];
);

describe "optional" (fun () ->
  let open Aeson in
  let open! Decode in

  test "bool -> int" (fun () ->
    expect @@ (optional int) (Encode.bool true) |> toEqual None);
  test "float -> int" (fun () ->
    expect @@ (optional int) (Encode.float 1.23) |> toEqual None);
  test "int -> int" (fun () ->
    expect @@ (optional int) (Encode.int 23) |> toEqual (Some 23));
  test "int32 -> int32" (fun () ->
    expect @@ (optional int32) (Encode.int32 (Int32.of_int 23)) |> toEqual (Some (Int32.of_int 23)));
  test "int64 -> int64" (fun () ->
    expect @@ (optional int64_of_array) (Encode.int64_to_array (Int64.of_int 64)) |> toEqual (Some (Int64.of_int 64)));
  test "string -> int" (fun () ->
    expect @@ (optional int) (Encode.string "test") |> toEqual None);
  test "null -> int" (fun () ->
    expect @@ (optional int) Encode.null |> toEqual None);
  test "array -> int" (fun () ->
    expect @@ (optional int) (Encode.array [||]) |> toEqual None);
  test "object -> int" (fun () ->
    expect @@ (optional int) (Encode.object_ []) |> toEqual None);

  test "bool -> bool " (fun () ->
    expect @@ optional bool (Encode.bool true) |> toEqual (Some true));
  test "float -> float" (fun () ->
    expect @@ optional float (Encode.float 1.23) |> toEqual (Some 1.23));
  test "string -> string" (fun () ->
    expect @@ optional string (Encode.string "test") |> toEqual (Some "test"));
  test "null -> null" (fun () ->
    expect @@ optional (nullAs Js.null) Encode.null |> toEqual (Some Js.null));
  test "int -> bool" (fun () ->
    expect @@ (optional bool) (Encode.int 1) |> toEqual None);

  test "optional field" (fun () ->
    expect @@
      (optional (field "x" int) (Js.Json.parseExn {| { "x": 2} |}))
      |> toEqual (Some 2));
  test "optional field - incorrect type" (fun () ->
    expect @@
      (optional (field "x" int) (Js.Json.parseExn {| { "x": 2.3} |}))
      |> toEqual None);
  test "optional field - no such field" (fun () ->
    expect @@
      (optional (field "y" int) (Js.Json.parseExn {| { "x": 2} |}))
      |> toEqual None);
  test "field optional" (fun () ->
    expect @@
      (field "x" (optional int) (Js.Json.parseExn {| { "x": 2} |}))
      |> toEqual (Some 2));
  test "field optional - incorrect type" (fun () ->
    expect @@
      (field "x" (optional int) (Js.Json.parseExn {| { "x": 2.3} |}))
      |> toEqual None);
  test "field optional - no such field" (fun () ->
    expectFn
      (field "y" (optional int)) (Js.Json.parseExn {| { "x": 2} |})
      |> toThrow);
);

describe "optionalField" (fun () ->
  let open Aeson in
  let open! Decode in

  test "optionalField" (fun () ->
    expect @@
      (optionalField "x" int (Js.Json.parseExn {| { "x": 2} |}))
    |> toEqual (Some 2));

  test "optionalField - null returns None" (fun () ->
    expect @@
      (optionalField "x" int (Js.Json.parseExn {| { "x": null} |}))
    |> toEqual None);

  test "optionalField - null returns None" (fun () ->
    expect @@
      (optionalField "x" string (Js.Json.parseExn {| { "x": null} |}))
    |> toEqual None);
  
  test "optionalField - field does not exist" (fun () ->
    expect @@
      (optionalField "y" int (Js.Json.parseExn {| { "x": 2} |}))
    |> toEqual (None));

  test "field optional - no such field" (fun () ->
    expectFn
      (optionalField "x" string) (Js.Json.parseExn {| { "x": 2} |})
      |> toThrow);
);

describe "oneOf" (fun () ->
  let open Aeson in
  let open! Decode in

  test "object with field" (fun () ->
    expect @@ (oneOf [int; field "x" int]) (Js.Json.parseExn {| { "x": 2} |}) |> toEqual 2);
  test "int" (fun () ->
    expect @@ (oneOf [int; field "x" int]) (Encode.int 23) |> toEqual 23);

  Test.throws (oneOf [int; field "x" int]) [Bool; Float; String; Null; Array; Object];
);

describe "result" (fun () ->
  let open Aeson in
  let open! Decode in

  test "Ok" (fun () ->
    expect @@ (result int string) (Js.Json.parseExn {| {"Error": "hello"} |}) |> toEqual (Belt.Result.Error "hello"));
  
  test "Error" (fun () ->
    expect @@ (result int string) (Js.Json.parseExn {| {"Ok": 2} |}) |> toEqual (Belt.Result.Ok 2));
);
  
describe "either" (fun () ->
  let open Aeson in
  let open! Decode in

  test "Right" (fun () ->
    expect @@ (either int string) (Js.Json.parseExn {| {"Right": "hello"} |}) |> toEqual (Compatibility.Either.Right "hello"));
  
  test "Left" (fun () ->
    expect @@ (either int string) (Js.Json.parseExn {| {"Left": 2} |}) |> toEqual (Compatibility.Either.Left 2));
);
  
describe "tryEither" (fun () ->
  let open Aeson in
  let open! Decode in

  test "object with field" (fun () ->
    expect @@ (tryEither int (field "x" int)) (Js.Json.parseExn {| { "x": 2} |}) |> toEqual 2);
  test "int" (fun () ->
    expect @@ (tryEither int (field "x" int)) (Encode.int 23) |> toEqual 23);

  Test.throws (tryEither int (field "x" int)) [Bool; Float; String; Null; Array; Object];
);

describe "withDefault" (fun () ->
  let open Aeson in
  let open! Decode in

  test "bool" (fun () ->
    expect @@ (withDefault 0 int) (Encode.bool true) |> toEqual 0);
  test "float" (fun () ->
    expect @@ (withDefault 0 int) (Encode.float 1.23) |> toEqual 0);
  test "int" (fun () ->
    expect @@ (withDefault 0 int) (Encode.int 23) |> toEqual 23);
  test "string" (fun () ->
    expect @@ (withDefault 0 int) (Encode.string "test") |> toEqual 0);
  test "null" (fun () ->
    expect @@ (withDefault 0 int) Encode.null |> toEqual 0);
  test "array" (fun () ->
    expect @@ (withDefault 0 int) (Encode.array [||]) |> toEqual 0);
  test "object" (fun () ->
    expect @@ (withDefault 0 int) (Encode.object_ []) |> toEqual 0);
);

describe "map" (fun () ->
  let open Aeson in
  let open! Decode in

  test "int" (fun () ->
    expect @@ (int |> map ((+)2)) (Encode.int 23) |> toEqual 25);

  Test.throws (int |> map ((+)2)) [Bool; Float; String; Null; Array; Object];
);

describe "andThen" (fun () ->
  let open Aeson in
  let open! Decode in

  test "int -> int" (fun () ->
    expect @@ (int |> andThen (fun _ -> int)) (Encode.int 23) |> toEqual 23);

  test "int -> int andThen float" (fun () ->
    expect @@ (int |> andThen (fun _ -> float)) (Encode.int 23) |> toEqual 23.);
  test "int -> float andThen int" (fun () ->
    expect @@ (float |> andThen (fun _ -> int)) (Encode.int 23) |> toEqual 23);

  Test.throws ~prefix:"int andThen int " (int |> andThen (fun _ -> int)) [Bool; Float; String; Null; Array; Object];
  Test.throws ~prefix:"float andThen int " (float |> andThen (fun _ -> int)) [Float];
  Test.throws ~prefix:"int to " (int |> andThen (fun _ -> float)) [Float];
);

describe "composite expressions" (fun () ->
  let open Aeson in
  let open! Decode in
  
  test "dict array array int" (fun () ->
    expect @@
      (dict (array (array int)) (Js.Json.parseExn {| { "a": [[1, 2], [3]], "b": [[4], [5, 6]] } |}))
      |> toEqual (Obj.magic [%obj { a = [| [|1; 2|]; [|3|] |]; b = [| [|4|]; [|5; 6|] |] }]));
  test "dict array array int - heterogenous structure" (fun () ->
    expectFn 
      (dict (array (array int))) (Js.Json.parseExn {| { "a": [[1, 2], [true]], "b": [[4], [5, 6]] } |})
      |> toThrow);
  test "dict array array int - heterogenous structure 2" (fun () ->
    expectFn
      (dict (array (array int))) (Js.Json.parseExn {| { "a": [[1, 2], "foo"], "b": [[4], [5, 6]] } |})
      |> toThrow);
  test "field" (fun () ->
    let json = Js.Json.parseExn {| { "foo": [1, 2, 3], "bar": "baz" } |} in
    expect @@
      (field "foo" (array int) json, field "bar" string json)
      |> toEqual ([| 1; 2; 3 |], "baz"));
);
