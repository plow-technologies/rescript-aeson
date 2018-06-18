type t

type _ kind = 
  | String : Js_string.t kind
  | NumberString : Js_string.t kind
  | Number : float kind
  | Object : t Js_dict.t kind 
  | Array : t array kind 
  | Boolean : bool kind
  | Null : Js_types.null_val kind

type tagged_t = 
  | JSONFalse
  | JSONTrue
  | JSONNull
  | JSONString of string
  | JSONNumberString of string
  | JSONNumber of float 
  | JSONObject of t Js_dict.t   
  | JSONArray of t array 

let is_numeric = [%re "/^\\uE000([+-]?\\d+(\\.\\d+)?)$/"]

let capture_numeric_string s =
  match (Js.Re.exec s is_numeric) with
  | Some result ->
    begin
      let captures = Js.Re.captures result in
      if Array.length captures > 0 then
        match (Js.Nullable.toOption @@ captures.(1)) with
        | Some cs -> Some cs
        | None -> None
      else None
    end
  | None -> None

let classify  (x : t) : tagged_t =
  let ty = Js.typeof x in  
  if ty = "string" then 
    let z = Obj.magic x in
    match (capture_numeric_string z) with
    | Some ns -> JSONNumberString ns
    | None -> JSONString z
  else if ty = "number" then 
    JSONNumber (Obj.magic x )
  else if ty = "boolean" then
    if (Obj.magic x) = true then JSONTrue
    else JSONFalse 
  else if (Obj.magic x) == Js.null then
    JSONNull 
  else if Js_array.isArray x  then 
    JSONArray (Obj.magic x)
  else 
    JSONObject (Obj.magic x)

let rec stringify (x : t): string = 
  match (classify x) with
  | JSONFalse -> "false"
  | JSONTrue -> "true"
  | JSONNull -> "null"
  | JSONString s -> "\"" ^ s ^ "\""
  | JSONNumberString s -> s
  | JSONNumber f -> string_of_float f
  | JSONObject dict -> "{" ^ (String.concat "," @@ Array.to_list @@ Array.map (fun key -> "\"" ^ key ^ "\":" ^ (stringify (Js.Dict.unsafeGet dict key))) (Js.Dict.keys dict)) ^ "}"
  | JSONArray array -> "[" ^ (String.concat "," @@ Array.to_list @@ Array.map (fun item -> stringify item) array) ^ "]"

let test (type a) (x : 'a) (v : a kind) : bool =
  match v with
  | Number -> Js.typeof x = "number"
  | Boolean -> Js.typeof x = "boolean" 
  | String -> Js.typeof x = "string"
  | NumberString -> Js.typeof x = "string"
  | Null -> (Obj.magic x) == Js.null 
  | Array -> Js_array.isArray x 
  | Object -> (Obj.magic x) != Js.null && Js.typeof x = "object" && not (Js_array.isArray x)


let decodeString json = 
  if Js.typeof json = "string" 
  then Some (Obj.magic (json:t) : string)
  else None 

let decodeNumber json = 
  if Js.typeof json = "number" 
  then Some (Obj.magic (json:t) : float)
  else None 

let decodeObject json = 
  if  Js.typeof json = "object" && 
      not (Js_array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then Some (Obj.magic (json:t) : t Js_dict.t)
  else None 

let decodeArray json = 
  if Js_array.isArray json
  then Some (Obj.magic (json:t) : t array)
  else None 

let decodeBoolean json = 
  if Js.typeof json = "boolean"
  then Some (Obj.magic (json:t) : bool)
  else None 

let decodeNull json = 
  if (Obj.magic json : 'a Js.null) == Js.null
  then Some Js.null
  else None 

external parse : string -> t = "parse" 
  [@@bs.val][@@bs.scope "JSON"]

external parseExn : string -> t = "parse" 
  [@@bs.val] [@@bs.scope "JSON"]

external null : t = "" [@@bs.val]
external string : string -> t = "%identity"
external number : float -> t = "%identity"
external boolean : bool -> t = "%identity" 
external object_ : t Js_dict.t -> t = "%identity"

external array_ : t array -> t = "%identity"

external array : t array -> t = "%identity"
external stringArray : string array -> t = "%identity"
external numberArray : float array -> t = "%identity"
external booleanArray : bool array -> t = "%identity"
external objectArray : t Js_dict.t array -> t = "%identity"

(* move to decode *)
let int64 (i: int64) : t =
  string ((Js.String.fromCharCode 0xE000) ^ Int64.to_string i)

let bigint (i: Bigint.t) : t =
  string ((Js.String.fromCharCode 0xE000) ^ Bigint.to_string i)

let rec to_js_json (x: t): Js.Json.t = 
  match (classify x) with
  | JSONTrue  -> Js.Json.boolean true
  | JSONFalse -> Js.Json.boolean false
  | JSONNull  -> Js.Json.null
  | JSONString s -> Js.Json.string s
  | JSONNumberString s -> Js.Json.string s
  | JSONNumber n -> Js.Json.number n
  | JSONObject dict -> Js.Json.object_ @@ Js.Dict.fromArray @@ Array.map (fun key -> (key, to_js_json (Js.Dict.unsafeGet dict key))) (Js.Dict.keys dict)
  | JSONArray array -> Js.Json.array @@ Array.map (fun item -> to_js_json item) array


let rec from_js_json (x: Js.Json.t): t = 
  match (Js.Json.classify x) with
  | Js.Json.JSONTrue  -> boolean true
  | Js.Json.JSONFalse -> boolean false
  | Js.Json.JSONNull  -> null
  | Js.Json.JSONString s -> string s
  | Js.Json.JSONNumber n -> number n
  | Js.Json.JSONObject dict -> object_ @@ Js.Dict.fromArray @@ Array.map (fun key -> (key, from_js_json (Js.Dict.unsafeGet dict key))) (Js.Dict.keys dict)
  | Js.Json.JSONArray array -> array_ @@ Array.map (fun item -> from_js_json item) array

