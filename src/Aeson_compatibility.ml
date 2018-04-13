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

  let lefts xs =
    List.fold_left(fun acc x ->
        match x with
        | Left l -> List.append acc [l]
        | Right r -> acc
      ) [] xs

  let rights xs =
    List.fold_left(fun acc x ->
        match x with
        | Left l -> acc
        | Right r -> List.append acc [r]
      ) [] xs

  let array_lefts xs =
    Array.fold_left(fun acc x ->
        match x with
        | Left l -> Array.append acc [|l|]
        | Right r -> acc
      ) [||] xs

  let array_rights xs =
    Array.fold_left(fun acc x ->
        match x with
        | Left l -> acc
        | Right r -> Array.append acc [|r|]
      ) [||] xs
end

(*
module Z = struct
  type t
end
 *)
              
module type Z = sig
  type t
  val zero: t
  (** The number 0. *)

  val one: t
  (** The number 1. *)

  val minus_one: t
  (** The number -1. *)

  val of_int: int -> t
  (** Converts from a base integer. *)

  val of_int32: int32 -> t
  (** Converts from a 32-bit integer. *)

  val of_int64: int64 -> t
  (** Converts from a 64-bit integer. *)

  val of_nativeint: nativeint -> t
  (** Converts from a native integer. *)

  val of_float: float -> t
  (** Converts from a floating-point value. 
    The value is truncated (rounded towards zero).
    Raises [Overflow] on infinity and NaN arguments.
  *)

  val of_string: string -> t
  (** Converts a string to an integer.
    An optional [-] prefix indicates a negative number, while a [+]
    prefix is ignored.
    An optional prefix [0x], [0o], or [0b] (following the optional [-]
    or [+] prefix) indicates that the number is,
    represented, in hexadecimal, octal, or binary, respectively.
    Otherwise, base 10 is assumed.
    (Unlike C, a lone [0] prefix does not denote octal.)
    Raises an [Invalid_argument] exception if the string is not a
    syntactically correct representation of an integer.
  *)

  val of_substring : string -> pos:int -> len:int -> t
  (** [of_substring s ~pos ~len] is the same as [of_string (String.sub s
    pos len)]
  *)

  val of_string_base: int -> string -> t 
  (** Parses a number represented as a string in the specified base,
    with optional [-] or [+] prefix.
    The base must be between 2 and 16.
  *)

  val of_substring_base: int -> string -> pos:int -> len:int -> t
  (** [of_substring_base base s ~pos ~len] is the same as [of_string_base
    base (String.sub s pos len)]
  *)

  (** {1 Basic arithmetic operations} *)

  val succ: t -> t
  (** Returns its argument plus one. *)

  val pred: t -> t
  (** Returns its argument minus one. *)

  val abs: t -> t
  (** Absolute value. *)

  val neg: t -> t
  (** Unary negation. *)

  val add: t -> t -> t
  (** Addition. *)

  val sub: t -> t -> t
  (** Subtraction. *)

  val mul: t -> t -> t
  (** Multiplication. *)

  val div: t -> t -> t
  (** Integer division. The result is truncated towards zero
    and obeys the rule of signs.
    Raises [Division_by_zero] if the divisor (second argument) is 0.
   *)

  val gcd: t -> t -> t

  val divexact: t -> t -> t

  val equal: t -> t -> bool
  (** Equality test. *)

  val leq: t -> t -> bool
  (** Less than or equal. *)

  val geq: t -> t -> bool
  (** Greater than or equal. *)

  val lt: t -> t -> bool
  (** Less than (and not equal). *)

  val gt: t -> t -> bool
  (** Greater than (and not equal). *)    

  val sign: t -> int
  (** Returns -1, 0, or 1 when the argument is respectively negative, null, or
      positive.
  *)

  val shift_left: t -> int -> t
  (** Shifts to the left. 
      Equivalent to a multiplication by a power of 2.
      The second argument must be non-negative.
   *)
end

module Ratio(Z: Z) = struct
  type t =
    { numerator : Z.t
    ; denominator : Z.t
    }

  (* make *)
  let mk n d =
    { numerator = n
    ; denominator = d
    }

  (* make and normalize n/d, assuming d > 0 *)
  let make_real n d =
    if n == Z.zero || d == Z.one then mk n Z.one
    else
      let g = Z.gcd n d in
      if g == Z.one
      then mk n d
      else mk (Z.divexact n g) (Z.divexact d g)

  (* make and normalize any fraction *)
  let make n d =
    let sd = Z.sign d in
    if sd = 0 then mk (Z.of_int (Z.sign n)) Z.zero else
    if sd > 0 then make_real n d else
      make_real (Z.neg n) (Z.neg d)

  let of_bigint n = mk n Z.one
  (* n/1 *)

  let of_int n = of_bigint (Z.of_int n)

  let of_int32 n = of_bigint (Z.of_int32 n)

  let of_int64 n = of_bigint (Z.of_int64 n)

  let of_nativeint n = of_bigint (Z.of_nativeint n)

  let of_ints n d = make (Z.of_int n) (Z.of_int d)

                  
  let zero = of_bigint Z.zero
  (* 0/1 *)

  let one = of_bigint Z.one
  (* 1/1 *)

  let minus_one = of_bigint Z.minus_one
  (* -1/1 *)

  let inf = mk Z.one Z.zero
  (* 1/0 *)

  let minus_inf = mk Z.minus_one Z.zero
  (* -1/0 *)

  let undef = mk Z.zero Z.zero
  (* 0/0 *)

  let of_float d =
    if d = infinity then inf else
    if d = neg_infinity then minus_inf else
    if classify_float d = FP_nan then undef else
    let m,e = frexp d in
    (* put into the form m * 2^e, where m is an integer *)
    let m,e = Z.of_float (ldexp m 53), e-53 in
    if e >= 0 then of_bigint (Z.shift_left m e)
    else make_real m (Z.shift_left Z.one (-e))

  let of_string s =
    try
      let i  = String.index s '/' in
      make
        (Z.of_substring s ~pos:0 ~len:i)
        (Z.of_substring s ~pos:(i+1) ~len:(String.length s-i-1))
    with Not_found ->
      if s = "inf" || s = "+inf" then inf
      else if s = "-inf" then minus_inf
      else if s = "undef" then undef
      else of_bigint (Z.of_string s)

  (* queries *)
  (* ------- *)

  type kind =
    | ZERO   (* 0 *)
    | INF    (* 1/0 *)
    | MINF   (* -1/0 *)
    | UNDEF  (* 0/0 *)
    | NZERO  (* non-special, non-0 *)

  let classify n =
    if n.denominator == Z.zero then
      match Z.sign n.numerator with
      | 1  -> INF
      | -1 -> MINF
      | _ -> UNDEF
    else
      if n.numerator == Z.zero
      then ZERO
      else NZERO

  let is_real n = (n.denominator != Z.zero)

  let num x = x.numerator

  let den x = x.denominator

  let sign x = Z.sign x.numerator
  (* sign undef = 0
     sign inf = 1
     sign -inf = -1
    *)

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
  let (~$) = of_int
  let (//) = of_ints
  let (///) = make
end
