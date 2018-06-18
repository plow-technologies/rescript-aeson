open Jest
open Expect

let () = 

describe "json.t" (fun () ->
  let open Aeson in                        

  (* test unicode code points and regex *)
  test "is_numeric" (fun () ->
    expect (Js.Re.test {js|"上"|js} [%re "/\\u4E0A/"]) |> toEqual true);

  test "is_numeric" (fun () ->
    expect (Js.Re.test {js|"\u4E0A"|js} [%re "/\\u4E0A/"]) |> toEqual true);

  test "is_numeric" (fun () ->
    expect (Js.Re.test (Js.String.fromCharCode 0x4E0A) [%re "/^\\u4E0A$/"]) |> toEqual true);

  test "is_numeric" (fun () ->
    expect (Js.Re.test (Js.String.fromCharCode 0x4E0A) [%re "/^\\u4E0A$/"]) |> toEqual true);  

  test "is_numeric" (fun () ->
    expect (Js.Re.test (Js.String.fromCharCode 0xE000) [%re "/^\\uE000$/"]) |> toEqual true);  

  test "dict string" (fun () ->
    expect @@ (Json.stringify (Aeson.Json.parseExn {| { "a": "x", "b": "y" } |}))
      |> toEqual "{\"a\":\"x\",\"b\":\"y\"}"  );

  test "dict string" (fun () ->
    expect @@ (Json.stringify (Aeson.Json.parseExn {| [ "a", "x", "b", "y" ] |}))
      |> toEqual "[\"a\",\"x\",\"b\",\"y\"]"  );


  test "int64" (fun () -> 
    expect (Json.stringify (Json.int64 (Int64.of_string "9223372036854775807"))) |> toEqual "9223372036854775807");

  test "bigint" (fun () -> 
    expect (Json.stringify (Json.bigint (Bigint.of_string "823891829388198398494893843948394892233720368547758072323123123"))) |> toEqual "823891829388198398494893843948394892233720368547758072323123123");

  test "string" (fun () ->
    expect @@ Json.stringify @@ Json.string "foo" |> toEqual "\"foo\"")
  
(*
  test "is_numeric" (fun () ->
    expect (Js.Re.test "9.0" Json.is_numeric) |> toEqual true);


  test "is_numeric" (fun () ->
    expect (Js.Re.test "a" Json.is_numeric) |> toEqual false);

  
  test "string" (fun () ->
    expect (Json.stringify (Json.string "foo")) |> toEqual "\"foo\"");


  test "int64" (fun () -> 
    expect (Json.stringify (Json.string "9")) |> toEqual "9")

  test "dict string" (fun () ->
    expect @@
      dict string (Js.Json.parseExn {| { "a": "x", "b": "y" } |})
      |> toEqual (Obj.magic [%obj { a = "x"; b = "y" }]));
*)

(*  test "int64" (fun () -> 
    expect (Json.stringify (Json.string "9223372036854775807")) |> toEqual "9223372036854775807") *)
);

