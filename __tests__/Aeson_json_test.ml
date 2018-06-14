open Jest
open Expect

let () = 

describe "json.t" (fun () ->
  let open Aeson in                        

  test "is_numeric" (fun () ->
    expect (Json.is_numeric "9") |> toEqual true);
  
  test "string" (fun () ->
    expect (Json.stringify (Json.string "foo")) |> toEqual "\"foo\"");


  test "int64" (fun () -> 
    expect (Json.stringify (Json.string "9")) |> toEqual "9")
(*  test "int64" (fun () -> 
    expect (Json.stringify (Json.string "9223372036854775807")) |> toEqual "9223372036854775807") *)
);

