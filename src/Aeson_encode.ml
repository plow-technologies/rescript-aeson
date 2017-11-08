type 'a encoder = 'a -> Js.Json.t

external null : Js.Json.t = "" [@@bs.val]
external string : string -> Js.Json.t = "%identity"
external float : float -> Js.Json.t = "%identity"
external int : int -> Js.Json.t = "%identity"
external boolean : Js.boolean -> Js.Json.t = "%identity" 
external dict : Js.Json.t Js_dict.t -> Js.Json.t = "%identity"

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
          
let date d: Js.Json.t = string (Js_date.toISOString d)

let bool b =
  b |> Js.Boolean.to_js_boolean
    |> boolean
  
let object_ props: Js.Json.t =
  props |> Js.Dict.fromList
        |> dict

external array : Js.Json.t array -> Js.Json.t = "%identity"

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

external stringArray : string array -> Js.Json.t = "%identity"
external numberArray : float array -> Js.Json.t = "%identity"
external booleanArray : Js.boolean array -> Js.Json.t = "%identity"
