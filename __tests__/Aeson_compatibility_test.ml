open Jest
open Expect

let () = 

describe "Either.t" (fun () ->
  let open Aeson in                        
  let open Compatibility in

  test "to_result: Left" (fun () ->
    expect @@ Either.to_result (Either.Left 123) |> toEqual (Belt.Result.Error 123));
  
  test "to_result: Right" (fun () ->
    expect @@ Either.to_result (Either.Right "Hello") |> toEqual (Belt.Result.Ok "Hello"));

  test "of_result: Error" (fun () ->
    expect @@ Either.of_result (Belt.Result.Error 123) |> toEqual (Either.Left 123));

  test "of_result: Ok" (fun () ->
    expect @@ Either.of_result (Belt.Result.Ok "Goodbye") |> toEqual (Either.Right "Goodbye"));  
);
