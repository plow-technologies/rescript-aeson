(** Provides functions for encoding a JSON data structure *)

type 'a encoder = 'a -> Js.Json.t
(** The type of a encoder combinator *)

external null : Js.Json.t = "" [@@bs.val]
(** [null] is the singleton null JSON value *)

external string : string -> Js.Json.t = "%identity"
(** [string s] makes a JSON string of the [string] [s] *)

external float : float -> Js.Json.t = "%identity"
(** [float n] makes a JSON number of the [float] [n] *)

external int : int -> Js.Json.t = "%identity"
(** [int n] makes a JSON number of the [int] [n] *)

external boolean : Js.boolean -> Js.Json.t = "%identity" 
(** [boolean b] makes a JSON boolean of the [Js.boolean] [b] *)

val bool : bool -> Js.Json.t
(** [bool b] makes a JSON boolean of the [bool] [b] *)

val nullable : 'a encoder -> 'a option -> Js.Json.t
(** [nullable encoder option] returns either the encoded value or [Js.Json.null] *)

val withDefault : Js.Json.t -> 'a encoder -> 'a option -> Js.Json.t
(** [withDefault default encoder option] returns the encoded value if present, oterwise [default] *)

external dict : Js.Json.t Js_dict.t -> Js.Json.t = "%identity"
(** [dict d] makes a JSON objet of the [Js.Dict.t] [d] *)

val object_ : (string * Js.Json.t) list -> Js.Json.t
(** [object_ props] makes a JSON objet of the [props] list of properties *)

external array : Js.Json.t array -> Js.Json.t = "%identity"
(** [array a] makes a JSON array of the [Js.Json.t array] [a] *)

val optional : 'a encoder -> 'a option -> Js.Json.t
(** [optional encoder a] returns the encoded value of Some, or Null if Nothing *)

val date : Js_date.t encoder
(** [date d] makes a JSON string of the [date] [d] *)

val list : 'a encoder -> 'a list encoder
(** [list encoder l] makes a JSON array of the [list] [l] using the given [encoder] *)

(** The functions below are specialized for specific array type which 
    happened to be already JSON object in the BuckleScript runtime. Therefore
    they are more efficient (constant time rather than linear conversion). *) 

val pair : 'a encoder -> 'b encoder -> ('a * 'b) -> Js.Json.t

val tuple2 : 'a encoder -> 'b encoder -> ('a * 'b) -> Js.Json.t

val tuple3 : 'a encoder -> 'b encoder -> 'c encoder -> ('a * 'b * 'c) -> Js.Json.t

val tuple4 : 'a encoder -> 'b encoder -> 'c encoder -> 'd encoder -> ('a * 'b * 'c * 'd) -> Js.Json.t
  
val tuple5 : 'a encoder -> 'b encoder -> 'c encoder -> 'd encoder -> 'e encoder -> ('a * 'b * 'c * 'd * 'e) -> Js.Json.t

val tuple6 : 'a encoder -> 'b encoder -> 'c encoder -> 'd encoder -> 'e encoder -> 'f encoder -> ('a * 'b * 'c * 'd * 'e * 'f) -> Js.Json.t

external stringArray : string array -> Js.Json.t = "%identity"
(** [stringArray a] makes a JSON array of the [string array] [a] *) 

external numberArray : float array -> Js.Json.t = "%identity"
(** [numberArray a] makes a JSON array of the [float array] [a] *)

external booleanArray : Js.boolean array -> Js.Json.t = "%identity"
(** [booleanArray] makes a JSON array of the [Js.boolean array] [a] *)
