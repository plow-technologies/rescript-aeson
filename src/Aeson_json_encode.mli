(** Provides functions for encoding a JSON data structure *)

type 'a encoder = 'a -> Aeson_json.t
(** The type of a encoder combinator *)

external null : Aeson_json.t = "" [@@bs.val]
(** [null] is the singleton null JSON value *)

external string : string -> Aeson_json.t = "%identity"
(** [string s] makes a JSON string of the [string] [s] *)

external float : float -> Aeson_json.t = "%identity"
(** [float n] makes a JSON number of the [float] [n] *)

external int : int -> Aeson_json.t = "%identity"
(** [int n] makes a JSON number of the [int] [n] *)

external int32 : int32 -> Aeson_json.t = "%identity"
(** [int32 n] makes a JSON number of the [int32] [n] *)

external int64_to_array : int64 -> Aeson_json.t = "%identity"
(** [int64 n] makes a JSON number of the [int64] [n] in the format of [high, low] where high is signed and low is unsigned *)

external nativeint : nativeint -> Aeson_json.t = "%identity"
(** [nativeint n] makes a JSON number of the [nativeint] [n] *)

external bool : bool -> Aeson_json.t = "%identity" 
(** [bool b] makes a JSON boolean of the [Js.bool] [b] *)

val nullable : 'a encoder -> 'a option -> Aeson_json.t
(** [nullable encoder option] returns either the encoded value or [Aeson_json.null] *)

val withDefault : Aeson_json.t -> 'a encoder -> 'a option -> Aeson_json.t
(** [withDefault default encoder option] returns the encoded value if present, oterwise [default] *)

external dict : Aeson_json.t Js_dict.t -> Aeson_json.t = "%identity"
(** [dict d] makes a JSON objet of the [Js.Dict.t] [d] *)

val object_ : (string * Aeson_json.t) list -> Aeson_json.t
(** [object_ props] makes a JSON objet of the [props] list of properties *)

external array : Aeson_json.t array -> Aeson_json.t = "%identity"
(** [array a] makes a JSON array of the [Aeson_json.t array] [a] *)

val optional : 'a encoder -> 'a option -> Aeson_json.t
(** [optional encoder a] returns the encoded value of Some, or Null if Nothing *)

val date : Js_date.t encoder
(** [date d] makes a JSON string of the [date] [d] *)

val list : 'a encoder -> 'a list encoder
(** [list encoder l] makes a JSON array of the [list] [l] using the given [encoder] *)

(** The functions below are specialized for specific array type which 
    happened to be already JSON object in the BuckleScript runtime. Therefore
    they are more efficient (constant time rather than linear conversion). *) 

val pair : 'a encoder -> 'b encoder -> ('a * 'b) -> Aeson_json.t

val tuple2 : 'a encoder -> 'b encoder -> ('a * 'b) -> Aeson_json.t

val tuple3 : 'a encoder -> 'b encoder -> 'c encoder -> ('a * 'b * 'c) -> Aeson_json.t

val tuple4 : 'a encoder -> 'b encoder -> 'c encoder -> 'd encoder -> ('a * 'b * 'c * 'd) -> Aeson_json.t
  
val tuple5 : 'a encoder -> 'b encoder -> 'c encoder -> 'd encoder -> 'e encoder -> ('a * 'b * 'c * 'd * 'e) -> Aeson_json.t

val tuple6 : 'a encoder -> 'b encoder -> 'c encoder -> 'd encoder -> 'e encoder -> 'f encoder -> ('a * 'b * 'c * 'd * 'e * 'f) -> Aeson_json.t

val result : 'a encoder -> 'b encoder -> ('a, 'b) Belt.Result.t -> Aeson_json.t

val either : 'l encoder -> 'r encoder -> ('l, 'r) Aeson_compatibility.Either.t -> Aeson_json.t

val singleEnumerator : 'a encoder
(** [singleEnumerator a] takes a value and returns an empty JSON array. Useful for encoding a single enumerator that matches Haskell aeson. *)
  
external stringArray : string array -> Aeson_json.t = "%identity"
(** [stringArray a] makes a JSON array of the [string array] [a] *) 

external numberArray : float array -> Aeson_json.t = "%identity"
(** [numberArray a] makes a JSON array of the [float array] [a] *)

external boolArray : bool array -> Aeson_json.t = "%identity"
(** [boolArray] makes a JSON array of the [bool array] [a] *)

val int64 : int64 -> Aeson_json.t

val bigint : Bigint.t -> Aeson_json.t