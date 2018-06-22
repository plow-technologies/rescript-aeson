external _unsafeCreateUninitializedArray : int -> 'a array = "Array" [@@bs.new]

let _isInteger value =
  Js.Float.isFinite value && Js.Math.floor_float value == value

type 'a decoder = Aeson_json.t -> 'a

exception DecodeError of string

let bool json = 
  if Js.typeof json = "boolean" then
    (Obj.magic (json : Aeson_json.t) : bool)
  else
    raise @@ DecodeError ("Expected boolean, got " ^ Aeson_json.stringify json)

let float json = 
  if Js.typeof json = "number" then
    (Obj.magic (json : Aeson_json.t) : float)
  else
    raise @@ DecodeError ("Expected number, got " ^ Aeson_json.stringify json)

let int json = 
  let f = float json in
  if _isInteger f then
    (Obj.magic (f : float) : int)
  else
    raise @@ DecodeError ("Expected int, got " ^ Aeson_json.stringify json)

let int32 json = 
  let f = float json in
  if _isInteger f then
    (Obj.magic (f : float) : int32)
  else
    raise @@ DecodeError ("Expected int32, got " ^ Aeson_json.stringify json)

let nativeint json = 
  let f = float json in
  if _isInteger f then
    (Obj.magic (f : float) : nativeint)
  else
    raise @@ DecodeError ("Expected nativeint, got " ^ Aeson_json.stringify json)

let string json = 
  if Js.typeof json = "string" then
    (Obj.magic (json : Aeson_json.t) : string)
  else
    raise @@ DecodeError ("Expected string, got " ^ Aeson_json.stringify json)

let date json =
  if Js.typeof json = "string" then
    let source = (Obj.magic (json : Aeson_json.t) : string) in
    let encodedDate = Js_date.fromString source in
    if Js_float.isNaN (Js_date.getTime encodedDate)
    then raise @@ DecodeError ("Expected date, got " ^ source)
    else encodedDate
  else
    raise @@ DecodeError ("Expected date, got " ^ Aeson_json.stringify json)
    
let nullable decode json =
  if (Obj.magic json : 'a Js.null) == Js.null then
    Js.null
  else
    Js.Null.return (decode json)

(* TODO: remove this? *)
let nullAs value json = 
  if (Obj.magic json : 'a Js.null) == Js.null then
    value
  else 
    raise @@ DecodeError ("Expected null, got " ^ Aeson_json.stringify json)

let array decode json = 
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t array) in
    let length = Js.Array.length source in
    let target = _unsafeCreateUninitializedArray length in
    for i = 0 to length - 1 do
      let value = decode (Array.unsafe_get source i) in
      Array.unsafe_set target i value;
    done;
    target
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Aeson_json.stringify json)

let list decode json =
  json |> array decode |> Array.to_list

let pair left right json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t array) in
    let length = Js.Array.length source in
    if length = 2 then
      (left (Array.unsafe_get source 0), right (Array.unsafe_get source 1))
    else
      raise @@ DecodeError ({j|Expected array of length 2, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Aeson_json.stringify json)


let tuple2 = pair

let tuple3 first second third json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t array) in
    let length = Js.Array.length source in
    if length = 3 then
      (first (Array.unsafe_get source 0), second (Array.unsafe_get source 1), third (Array.unsafe_get source 2))
    else
      raise @@ DecodeError ({j|Expected array of length 3, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Aeson_json.stringify json)

let tuple4 first second third fourth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t array) in
    let length = Js.Array.length source in
    if length = 4 then
      (first (Array.unsafe_get source 0), second (Array.unsafe_get source 1), third (Array.unsafe_get source 2), fourth (Array.unsafe_get source 3))
    else
      raise @@ DecodeError ({j|Expected array of length 4, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Aeson_json.stringify json)

let tuple5 first second third fourth fifth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t array) in
    let length = Js.Array.length source in
    if length = 5 then
      (first (Array.unsafe_get source 0), second (Array.unsafe_get source 1), third (Array.unsafe_get source 2), fourth (Array.unsafe_get source 3), fifth (Array.unsafe_get source 4))
    else
      raise @@ DecodeError ({j|Expected array of length 5, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Aeson_json.stringify json)

let tuple6 first second third fourth fifth sixth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t array) in
    let length = Js.Array.length source in
    if length = 5 then
      (first (Array.unsafe_get source 0), second (Array.unsafe_get source 1), third (Array.unsafe_get source 2), fourth (Array.unsafe_get source 3), fifth (Array.unsafe_get source 4), sixth (Array.unsafe_get source 5))
    else
      raise @@ DecodeError ({j|Expected array of length 6, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Aeson_json.stringify json)
  
let singleEnumerator a json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t array) in
    let length = Js.Array.length source in
    if length = 0 then
      a
    else
      raise @@ DecodeError ({j|Expected array of length 0, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Aeson_json.stringify json)

let dict decode json = 
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let source = (Obj.magic (json : Aeson_json.t) : Aeson_json.t Js.Dict.t) in
    let keys = Js.Dict.keys source in
    let l = Js.Array.length keys in
    let target = Js.Dict.empty () in
    for i = 0 to l - 1 do
        let key = (Array.unsafe_get keys i) in
        let value = decode (Js.Dict.unsafeGet source key) in
        Js.Dict.set target key value;
    done;
    target
  end
  else
    raise @@ DecodeError ("Expected object, got " ^ Aeson_json.stringify json)

let field key decode json =
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let dict = (Obj.magic (json : Aeson_json.t) : Aeson_json.t Js.Dict.t) in
    match Js.Dict.get dict key with
    | Some value -> decode value
    | None -> raise @@ DecodeError ({j|Expected field '$(key)'|j})
  end
  else
    raise @@ DecodeError ("Expected object, got " ^ Aeson_json.stringify json)

let rec at key_path decoder =
    match key_path with 
      | [key] -> field key decoder
      | first::rest -> field first (at rest decoder) 
      | [] -> raise @@ Invalid_argument ("Expected key_path to contain at least one element")

let optional decode json =
  match decode json with
  | exception DecodeError _ -> None
  | v -> Some v

let result decodeA decodeB json =
  match Aeson_json.decodeObject json with
  | Some o -> (
    match Js_dict.get o "Ok" with
    | Some l -> Belt.Result.Ok (decodeA l)
    | None -> (
      match Js_dict.get o "Error" with
      | Some r -> Belt.Result.Error (decodeB r)
      | None -> raise @@ DecodeError ("Expected object with a \"Ok\" key or \"Error\" key, got " ^ Aeson_json.stringify json)
    )
  )
  | None -> raise @@ DecodeError ("Expected object with a \"Ok\" key or \"Error\" key, got " ^ Aeson_json.stringify json)
  
let either decodeL decodeR json =
  match Aeson_json.decodeObject json with
  | Some o -> (
    match Js_dict.get o "Left" with
    | Some l -> Aeson_compatibility.Either.Left (decodeL l)
    | None -> (
      match Js_dict.get o "Right" with
      | Some r -> Aeson_compatibility.Either.Right (decodeR r)
      | None -> raise @@ DecodeError ("Expected object with a \"Left\" key or \"Right\" key, got " ^ Aeson_json.stringify json)
    )
  )
  | None -> raise @@ DecodeError ("Expected object with a \"Left\" key or \"Right\" key, got " ^ Aeson_json.stringify json)

       
let rec oneOf decoders json =
  match decoders with
  | [] ->
    let length = List.length decoders in
    raise @@ DecodeError ({j|Expected oneOf $length, got |j} ^ Aeson_json.stringify json)
  | decode :: rest ->
    match decode json with
    | v -> v
    | exception _ -> oneOf rest json
                   
let tryEither a b =
  oneOf [a;b]

let withDefault default decode json =
  match decode json with
  | v -> v
  | exception _ -> default

let map f decode json =
  f (decode json)

let andThen b a json=
  b (a json) json

let unwrapResult r =
  match r with
  | Belt.Result.Ok v -> v
  | Belt.Result.Error message -> raise @@ DecodeError message

let wrapResult decoder json =
  match (decoder json) with
  | v -> Belt.Result.Ok v
  | exception DecodeError message -> Belt.Result.Error message

let int64_of_array json = 
  let fs = array float json in
  if Array.length fs = 2 then
    if (_isInteger (Array.get fs 0) && _isInteger (Array.get fs 1)) then
      let left = (Obj.magic ((Array.get fs 0) : float) : int32) in
      let right = (Obj.magic ((Array.get fs 1) : float) : int32) in
      let res = Int64.of_int32 left in
      let res = Int64.shift_left res 32 in
      Int64.logor res (Int64.of_int32 right)
    else
      raise @@ DecodeError ("Expected int64, got " ^ Aeson_json.stringify json)
  else
    raise @@ DecodeError ("Expected int64, got " ^ Aeson_json.stringify json)

let int64 json = 
  match string json with
  | s -> Int64.of_string s
  | exception DecodeError _ ->
      match string (Aeson_json.string (Aeson_json.stringify json)) with
      | s -> Int64.of_string s
      | exception DecodeError _ -> raise @@ DecodeError ("Expected int64 as string, got " ^ Aeson_json.stringify json)
