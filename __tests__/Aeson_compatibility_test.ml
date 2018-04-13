open Jest
open Expect

let () =

describe "either" (fun () ->
  let open Aeson in
  let open Compatibility in
  let open Either in
  
  test "left" (fun () ->
    expect @@ left 1 |> toEqual (Left 1) );

  test "right" (fun () ->
    expect @@ right 1 |> toEqual (Right 1) );

  test "left" (fun () ->
    expect @@ to_string string_of_int string_of_int (left 1) |> toEqual "Left (1)" );
  
  test "right" (fun () ->
    expect @@ to_string string_of_int string_of_int (right 1) |> toEqual "Right (1)" );
);  
  
describe "rational" (fun () ->
  let open Aeson in
  let open Compatibility in
             
  test "rational" (fun () ->
    expect @@ (Rational.make) 1 3 |> toEqual (Rational.make 2 6) );

  test "rational" (fun () ->
    expect @@ (Rational.make) 1 3 |> not_ |> toEqual (Rational.make 1 4) );

  test "rational" (fun () ->
    expect @@ (Rational.to_float (Rational.make 1 2)) |> toEqual 0.5 );

  test "rational" (fun () ->
    expect @@ (Rational.to_float (Rational.make 1 3)) |> toBeGreaterThan 0.3 );

  test "rational" (fun () ->
    expect @@ (Rational.to_float (Rational.make 1 4)) |> toBeLessThan 0.26 );

  test "rational" (fun () ->
    expect @@ (Rational.(+) (Rational.make 1 2) (Rational.make 1 2)) |> toEqual Rational.one );

  test "rational" (fun () ->
    expect @@ (Rational.(-) (Rational.make 5 7) (Rational.make 2 7)) |> toEqual (Rational.make 3 7) );

  test "rational" (fun () ->
    expect @@ (Rational.to_string (Rational.make 1 3)) |> toEqual "1/3" );

  test "rational" (fun () ->
    expect @@ (Rational.to_string (Rational.make (-1) 3)) |> toEqual "-1/3" );

  test "rational" (fun () ->
    expect @@ (Rational.to_string (Rational.make 108583231403255 695053048136)) |> toEqual "108583231403255/695053048136" );
);  

(*

    expect @@ rational (Encode.rational (Rational.make (-108583231403255) 695053048136)) |> toEqual (Rational.make (-108583231403255) 695053048136));
*)
