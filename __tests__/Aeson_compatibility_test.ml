open Jest
open Expect

let () =

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

);  
