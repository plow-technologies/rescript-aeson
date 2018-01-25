(* https://gist.github.com/NicolasT/65dad40b203da7c65b4c *)
module Either = struct
  type ('a, 'b) t = Left of 'a | Right of 'b

  (** Constructor functions *)
  let left a = Left a
  let right b = Right b

  let either l r = function
    | Left v -> l v
    | Right v -> r v

  (** Bifunctor interface *)
  let bimap l r = either (fun v -> left (l v)) (fun v -> right (r v))

  external id : 'a -> 'a = "%identity"
  let const v = fun _ -> v

  (** Functor interface *)
  let map f = bimap id f
  let (<$>) = map
  let map_left f = bimap f id

  (** Monadic interface *)
  let bind m k = either left k m

  let return = right
  let (>>=) = bind
  let throw = left

  (** Applicative interface *)
  let pure = return
  let apply f v = f >>= fun f' -> v >>= fun v' -> pure (f' v')
  let (<*>) = apply

  (** Turn a function result in a value or an error *)
  let try_ f = try pure (f ()) with exn -> throw exn

  (** Predicates *)
  let is_left v = either (const true) (const false) v
  let is_right v = either (const false) (const true) v

  let to_string l r = either
                        (fun v -> "Left (" ^ (l v) ^ ")")
                        (fun v -> "Right (" ^ (r v) ^ ")")

  (** Extract a value of raise an exception *)
  let error v = either (fun e -> raise e) id v

  (** Silence into an option *)
  let hush v = either (const None) (fun v' -> Some v') v

  (** Expand from an option *)
  let note e = function
    | None -> Left e
    | Some v -> Right v

  (** Catamorphism *)
  let fold f z = either (const z) (fun v -> f v z)
end

(* https://github.com/ocaml/Zarith/blob/master/q.ml *)
module Rational = struct
  type t =
    { numerator : int
    ; denominator : int
    }

  (* greatest common denominator *)
  let rec gcd a b =
    match (a mod b) with
    | 0 -> b
    | r -> gcd b r

  let sign n =
    if n == 0
    then 0
    else
      if n < 0
      then -1
      else 1

  (* make *)
  let mk n d =
    { numerator = n
    ; denominator = d
    }

  let make_real n d =
    if n == 0 || d == 1 then mk n 1
    else
      let g = gcd n d in
      if g == 1
      then mk n d
      else mk (n / g) (d / g)
      (* let (+), (-), ( * ), (/), (!!) = add, sub, mul, div, of_int   *)

  (* make and normalize any fraction *)
  let make n d =
    let sd = sign d in
    if sd = 0 then mk (sign n) 0 else
      if sd > 0 then make_real n d else
        make_real (- n) (- d)

  (* Type of rationals.
   Invariants:
   - den is always >= 0;
   - num and den have no common factor;
   - if den=0, then num is -1, 0 or 1.
   - if num=0, then den is -1, 0 or 1.
     *)
    
  (* kind *)
  type kind =
    | ZERO   (* 0 *)
    | INF    (* 1/0 *)
    | MINF   (* -1/0 *)
    | UNDEF  (* 0/0 *)
    | NZERO  (* non-special, non-0 *)
        
  let classify n =
    if n.denominator == 0 then
      match sign n.numerator with
      | 1  -> INF
      | -1 -> MINF
      | _ -> UNDEF
    else
      if n.numerator == 0
      then ZERO
      else NZERO

  (* operations *)
  let neg x =
    mk (- x.numerator) x.denominator

  let abs x =
    mk (abs x.numerator) x.denominator

  let compare x y =
    match classify x, classify y with
    | UNDEF,UNDEF | INF,INF | MINF,MINF -> 0
    | UNDEF,_ -> -1
    | _,UNDEF -> 1
    | MINF,_ | _,INF -> -1
    | INF,_ | _,MINF -> 1
    | _ ->
       if x.denominator == y.denominator (* implies equality,
                         especially if immediate value and not a pointer,
                         in particular in the case den = 1 *)
       then Pervasives.compare x.numerator y.numerator
       else
         Pervasives.compare
           (x.numerator * y.denominator)
           (y.numerator * x.denominator)

  let equal x y =
    (x.numerator == y.numerator) && (x.denominator == y.denominator)

  let min a b = if compare a b <= 0 then a else b
  let max a b = if compare a b >= 0 then a else b

  let leq a b = compare a b <= 0
  let geq a b = compare a b >= 0
  let lt a b = compare a b < 0
  let gt a b = compare a b > 0

  let to_int n = n.numerator / n.denominator

  let to_string n =
    match classify n with
    | UNDEF -> "undef"
    | INF -> "+inf"
    | MINF -> "-inf"
    | ZERO -> "0"
    | NZERO ->
       if n.denominator == 1 then string_of_int n.numerator
       else (string_of_int n.numerator) ^ "/" ^ (string_of_int n.denominator)

  let to_float x =
  match classify x with
  | ZERO -> 0.0
  | INF  -> infinity
  | MINF -> neg_infinity
  | UNDEF -> nan
  | NZERO -> (float x.numerator) /. (float x.denominator)
    
  let zero = mk 0 1
  (* 0/1 *)

  let one = mk 1 1
  (* 1/1 *)

  let minus_one = mk (-1) 1
  (* -1/1 *)

  let inf = mk 1 0
  (* 1/0 *)

  let minus_inf = mk (-1) 0
  (* -1/0 *)

  let undef = mk 0 0
  (* 0/0 *)

  let of_int n = mk n 1

  let of_ints n d = mk n d

  (* let of_float *)

  let of_float d =
    if d = infinity then inf else
    if d = neg_infinity then minus_inf else
    if classify_float d = FP_nan then undef else
    let m,e = frexp d in
    (* put into the form m * 2^e, where m is an integer *)
    let m,e = (ldexp m 53), e-53 in
    if e >= 0 then of_int ((int_of_float m) lsl e)
    else make_real (int_of_float m) (1 lsl (-e))

  let of_string s =
    try
      let i  = String.index s '/' in
      make
        (int_of_string (String.sub s 0 i))
        (int_of_string (String.sub s (i+1) (String.length s-i-1)))
    with Not_found ->
      if s = "inf" || s = "+inf" then inf
      else if s = "-inf" then minus_inf
      else undef
      (*
      else if s = "undef" then undef
      else of_bigint (Z.of_string s)
       *)

  let is_real n = (n.denominator != 0)
                
  let num t = t.numerator

  let den t = t.denominator
         
  (* addition or substraction (zaors) of finite numbers *)
  let aors zaors x y =
    if x.denominator == y.denominator then  (* implies equality,
                             especially if immediate value and not a pointer,
                             in particular in the case den = 1 *)
      make_real (zaors x.numerator y.numerator) x.denominator
    else
      make_real
        (zaors
           (x.numerator * y.denominator)
           (y.numerator * x.denominator))
        (x.denominator * y.denominator)

  (** operations *)
    
  let add x y =
    if x.denominator == 0 || y.denominator == 0 then match classify x, classify y with
    | ZERO,_ -> y
    | _,ZERO -> x
    | UNDEF,_ | _,UNDEF -> undef
    | INF,MINF | MINF,INF -> undef
    | INF,_ | _,INF -> inf
    | MINF,_ | _,MINF -> minus_inf
    | NZERO,NZERO -> failwith "impossible case"
    else
      aors (+) x y
   (* undef + x = x + undef = undef
      inf + -inf = -inf + inf = undef
      inf + x = x + inf = inf
      -inf + x = x + -inf = -inf
    *)

  let sub x y =
    if x.denominator == 0 || y.denominator == 0 then match classify x, classify y with
    | ZERO,_ -> neg y
    | _,ZERO -> x
    | UNDEF,_ | _,UNDEF -> undef
    | INF,INF | MINF,MINF -> undef
    | INF,_ | _,MINF -> inf
    | MINF,_ | _,INF -> minus_inf
    | NZERO,NZERO -> failwith "impossible case"
    else
      aors (-) x y

  let mul x y =
    if x.denominator == 0 || y.denominator == 0 then
      mk
        ((sign x.numerator) * (sign y.numerator))
        0
    else
      make_real (x.numerator * y.numerator) (x.denominator * y.denominator)

  let inv x =
    match sign x.numerator with
    | 1 -> mk x.denominator x.numerator
    | -1 -> mk (- x.denominator) (- x.numerator)
    | _ -> if x.denominator == 0 then undef else inf

  let div x y =
    if sign y.numerator >= 0
    then mul x (mk y.denominator y.numerator)
    else mul x (mk (- y.denominator) (- y.numerator))

  let  mul_2exp x n =
    if x.denominator == 0 then x
    else make_real (x.numerator lsl n) x.denominator

  let  div_2exp x n =
    if x.denominator == 0 then x
    else make_real x.numerator (x.denominator lsl n)


  (* printing *)
  (* -------- *)

  let print x = print_string (to_string x)
  let output chan x = output_string chan (to_string x)
  let sprint () x = to_string x
  let bprint b x = Buffer.add_string b (to_string x)
  let pp_print f x = Format.pp_print_string f (to_string x)                    

  (* prefix and infix *)
  (* ---------------- *)            
  let (~-) = neg
  let (~+) x = x
  let (+)  = add
  let (-) = sub
  let ( * ) = mul
  let (/) = div

  let (lsl) = mul_2exp
  let (asr) = div_2exp
(*
  let (~$) = of_int
  let (//) = of_ints
  let (~$$) = of_bigint
 *)
  let (///) = make

(*
  let of_string s =
    try
      let i  = String.index s '/' in
      make
        (of_substring s ~pos:0 ~len:i)
        (of_substring s ~pos:(i+1) ~len:(String.length s-i-1))
    with Not_found ->
      if s = "inf" || s = "+inf" then inf
      else if s = "-inf" then minus_inf
      else if s = "undef" then undef
      else of_bigint (Z.of_string s)
 *)
end
