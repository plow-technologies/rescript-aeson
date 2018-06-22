type 'a encoder = 'a -> Aeson_json.t

external null : Aeson_json.t = "" [@@bs.val]
external string : string -> Aeson_json.t = "%identity"
external float : float -> Aeson_json.t = "%identity"
external int : int -> Aeson_json.t = "%identity"
external int32 : int32 -> Aeson_json.t = "%identity"
external int64_to_array : int64 -> Aeson_json.t = "%identity"
external nativeint : nativeint -> Aeson_json.t = "%identity"
external bool : bool -> Aeson_json.t = "%identity" 
external dict : Aeson_json.t Js_dict.t -> Aeson_json.t = "%identity"

let nullable encode = function
  | None -> null
  | Some v -> encode v

let withDefault d encode = function
  | None -> d
  | Some v -> encode v

let optional encode optionalValue =
  match optionalValue with
  | Some value -> encode value
  | None -> null

(* Haskell aeson renders .000Z as Z *)          
let date d: Aeson_json.t = string (Js.String.replace ".000Z" "Z" (Js_date.toISOString d))
  
let object_ props: Aeson_json.t =
  props |> Js.Dict.fromList
        |> dict

external array : Aeson_json.t array -> Aeson_json.t = "%identity"

let list encode l =
  l |> List.map encode
    |> Array.of_list
    |> array

let pair encodeT0 encodeT1 tuple =
  let (t0, t1) = tuple in
  array [| encodeT0 t0 ; encodeT1 t1 |]

let tuple2 = pair

let tuple3 encodeT0 encodeT1 encodeT2 tuple =
  let (t0, t1, t2) = tuple in
  array [| encodeT0 t0 ; encodeT1 t1 ; encodeT2 t2 |]

let tuple4 encodeT0 encodeT1 encodeT2 encodeT3 tuple =
  let (t0, t1, t2, t3) = tuple in
  array [| encodeT0 t0 ; encodeT1 t1 ; encodeT2 t2 ; encodeT3 t3 |]

let tuple5 encodeT0 encodeT1 encodeT2 encodeT3 encodeT4 tuple =
  let (t0, t1, t2, t3, t4) = tuple in
  array [| encodeT0 t0 ; encodeT1 t1 ; encodeT2 t2 ; encodeT3 t3 ; encodeT4 t4 |]

let tuple6 encodeT0 encodeT1 encodeT2 encodeT3 encodeT4 encodeT5 tuple =
  let (t0, t1, t2, t3, t4, t5) = tuple in
  array [| encodeT0 t0 ; encodeT1 t1 ; encodeT2 t2 ; encodeT3 t3 ; encodeT4 t4 ; encodeT5 t5 |]

let result encodeA encodeB e =
  match e with
  | Belt.Result.Ok a -> object_ [("Ok", encodeA a)]
  | Belt.Result.Error b -> object_ [("Error", encodeB b)]

let either encodeL encodeR e =
  match e with
  | Aeson_compatibility.Either.Left l -> object_ [("Left", encodeL l)]
  | Aeson_compatibility.Either.Right r -> object_ [("Right", encodeR r)]

let singleEnumerator _x =  array [| |]

external stringArray : string array -> Aeson_json.t = "%identity"
external numberArray : float array -> Aeson_json.t = "%identity"
external boolArray : bool array -> Aeson_json.t = "%identity"

let int64 (i: int64) : Aeson_json.t =
  string ((Js.String.fromCharCode 0xE000) ^ Int64.to_string i)

let bigint (i: Bigint.t) : Aeson_json.t =
  string ((Js.String.fromCharCode 0xE000) ^ Bigint.to_string i)
