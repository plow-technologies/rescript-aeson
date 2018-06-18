open Jest
open Expect

let () = 

describe "json.t" (fun () ->
  let open Aeson in                        

  (* test unicode code points and regex *)
  test "test regex against unicode string" (fun () ->
    expect (Js.Re.test {js|"上"|js} [%re "/\\u4E0A/"]) |> toEqual true);

  test "test regex against unicode code point string" (fun () ->
    expect (Js.Re.test {js|"\u4E0A"|js} [%re "/\\u4E0A/"]) |> toEqual true);

  test "test regex against unicode code point string" (fun () ->
    expect (Js.Re.test (Js.String.fromCharCode 0x4E0A) [%re "/^\\u4E0A$/"]) |> toEqual true);  

  test "test regex against unicode code point string in private use area" (fun () ->
    expect (Js.Re.test (Js.String.fromCharCode 0xE000) [%re "/^\\uE000$/"]) |> toEqual true);  


  (* is_numeric *)
  test "is_numeric" (fun () ->
    expect (Js.Re.test ((Js.String.fromCharCode 0xE000) ^ "9.0") Json.is_numeric) |> toEqual true);
  
  
  (* parse *)
  test "dict" (fun () ->
    expect @@ (Json.stringify (Aeson.Json.parseExn {| { "a": "x", "b": "y" } |}))
      |> toEqual "{\"a\":\"x\",\"b\":\"y\"}"  );

  test "array" (fun () ->
    expect @@ (Json.stringify (Aeson.Json.parseExn {| [ "a", "x", "b", "y" ] |}))
      |> toEqual "[\"a\",\"x\",\"b\",\"y\"]"  );

  (* compare output from Aeson.Json.stringify and Js.Json.stringify *)
  test "dict" (fun () ->
    expect @@ (Json.stringify (Aeson.Json.parseExn {| { "a": "x", "b": "y" } |}))
      |> toEqual (Js.Json.stringify (Js.Json.parseExn {| { "a": "x", "b": "y" } |})));

  test "array" (fun () ->
    expect @@ (Json.stringify (Aeson.Json.parseExn {| [ "a", "x", "b", "y" ] |}))
      |> toEqual (Js.Json.stringify (Js.Json.parseExn {| [ "a", "x", "b", "y" ] |})));

  
  (* stringify *)
  test "int64" (fun () -> 
    expect (Json.stringify (Json.int64 (Int64.of_string "9223372036854775807"))) |> toEqual "9223372036854775807");

  test "bigint" (fun () -> 
    expect (Json.stringify (Json.bigint (Bigint.of_string "823891829388198398494893843948394892233720368547758072323123123"))) |> toEqual "823891829388198398494893843948394892233720368547758072323123123");

  test "string" (fun () ->
    expect @@ Json.stringify @@ Json.string "foo" |> toEqual "\"foo\"");

  (* decode *)
  
  
  (* encode *)


  (* Aeson.Json.t and Js.Json.t*)
  test "array" (fun () ->
    expect @@ (Json.to_js_json (Aeson.Json.parseExn {| [ "a", "x", "b", "y" ] |}))
      |> toEqual (Js.Json.parseExn {| [ "a", "x", "b", "y" ] |}));

  (* Aeson.Json.t and Js.Json.t*)
  test "array" (fun () ->
    expect @@ (Json.from_js_json (Js.Json.parseExn {| [ "a", "x", "b", "y" ] |}))
      |> toEqual (Aeson.Json.parseExn {| [ "a", "x", "b", "y" ] |}))

);
