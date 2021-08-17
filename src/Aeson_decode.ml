external _unsafeCreateUninitializedArray : int -> 'a array = "Array" [@@bs.new]

let _isInteger value =
  Js.Float.isFinite value && Js.Math.floor_float value == value

type 'a decoder = Js.Json.t -> 'a

exception DecodeError of string

let bool json = 
  if Js.typeof json = "boolean" then
    (Obj.magic (json : Js.Json.t) : bool)
  else
    raise @@ DecodeError ("Expected boolean, got " ^ Js.Json.stringify json)

let float json = 
  if Js.typeof json = "number" then
    (Obj.magic (json : Js.Json.t) : float)
  else
    raise @@ DecodeError ("Expected number, got " ^ Js.Json.stringify json)

let int json = 
  let f = float json in
  if _isInteger f then
    (Obj.magic (f : float) : int)
  else
    raise @@ DecodeError ("Expected int, got " ^ Js.Json.stringify json)

let int32 json = 
  let f = float json in
  if _isInteger f then
    (Obj.magic (f : float) : int32)
  else
    raise @@ DecodeError ("Expected int32, got " ^ Js.Json.stringify json)
  
let nativeint json = 
  let f = float json in
  if _isInteger f then
    (Obj.magic (f : float) : nativeint)
  else
    raise @@ DecodeError ("Expected nativeint, got " ^ Js.Json.stringify json)

let string json = 
  if Js.typeof json = "string" then
    (Obj.magic (json : Js.Json.t) : string)
  else
    raise @@ DecodeError ("Expected string, got " ^ Js.Json.stringify json)

let explode s = List.init (String.length s) (String.get s)

let isDigit char =
  let c = Char.code char in
  c >= 48 && c <= 57

let isStringOfDigits s =
  if String.length s == 0
  then false
  else
    let chars = explode s in
    let chars' =
      (if String.length s > 1
       then
         if List.hd chars == '-'
         then List.tl chars
         else chars
       else chars
      ) in
    List.fold_right (fun c x -> (isDigit c) && x) chars' true

let uint8 json =
  let f = float json in
  if _isInteger f then
    U.UInt8.ofInt (Obj.magic (f : float) : int)
  else
    raise @@ DecodeError ("Expected int, got " ^ Js.Json.stringify json)  

let uint16 json =
  let f = float json in
  if _isInteger f then
    U.UInt16.ofInt (Obj.magic (f : float) : int)
  else
    raise @@ DecodeError ("Expected int, got " ^ Js.Json.stringify json)  

let uint32 json =
  match int json with
  | v -> U.UInt32.ofInt v
  | exception DecodeError _ -> raise @@ DecodeError ("Expected U.UInt32.t, got " ^ Js.Json.stringify json)

let uint64 json =
  if Js.typeof json = "string" then
    let source = (Obj.magic (json : Js.Json.t) : string) in
    match U.UInt64.ofString source with
    | Some s -> s
    | None   -> raise @@ DecodeError ("Expected U.UInt64.t, got " ^ source)
  else
    raise @@ DecodeError ("Expected U.UInt64.t, got " ^ Js.Json.stringify json)

let int64_of_string json =
  if Js.typeof json = "string" then
    let source = (Obj.magic (json : Js.Json.t) : string) in
    
    if isStringOfDigits source
    then Int64.of_string source
    else raise @@ DecodeError ("Expected int64, got " ^ source)
  else
    raise @@ DecodeError ("Expected int64, got " ^ Js.Json.stringify json)
  
let bigint json =
  if Js.typeof json = "string" then
    let source = (Obj.magic (json : Js.Json.t) : string) in
    
    if isStringOfDigits source
    then Bigint.of_string source
    else raise @@ DecodeError ("Expected Bigint.t, got " ^ source)
  else
    raise @@ DecodeError ("Expected Bigint.t, got " ^ Js.Json.stringify json)
  
let date json =
  if Js.typeof json = "string" then
    let source = (Obj.magic (json : Js.Json.t) : string) in
    let encodedDate = Js_date.fromString source in
    if Js_float.isNaN (Js_date.getTime encodedDate)
    then raise @@ DecodeError ("Expected date, got " ^ source)
    else encodedDate
  else
    raise @@ DecodeError ("Expected date, got " ^ Js.Json.stringify json)
    
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
    raise @@ DecodeError ("Expected null, got " ^ Js.Json.stringify json)

let array decode json = 
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    let target = _unsafeCreateUninitializedArray length in
    for i = 0 to length - 1 do
      let value = decode (Array.unsafe_get source i) in
      Array.unsafe_set target i value;
    done;
    target
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let list decode json =
  json |> array decode |> Array.to_list

let pair left right json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 2 then
      (left (Array.unsafe_get source 0), right (Array.unsafe_get source 1))
    else
      raise @@ DecodeError ({j|Expected array of length 2, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)


let tuple2 = pair

let beltMap decodeKey decodeValue ~id:id json =
  match array (pair decodeKey decodeValue) json with
    | decoded_array -> Belt.Map.fromArray decoded_array ~id:id
    | exception DecodeError _ -> raise @@ DecodeError ({j|Expected an array of tuples|j})

let tuple3 first second third json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 3 then
      (first (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third (Array.unsafe_get source 2)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 3, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let tuple4 first second third fourth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 4 then
      (first (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third (Array.unsafe_get source 2),
       fourth (Array.unsafe_get source 3)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 4, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let tuple5 first second third fourth fifth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 5 then
      (first (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third (Array.unsafe_get source 2),
       fourth (Array.unsafe_get source 3),
       fifth (Array.unsafe_get source 4)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 5, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let tuple6 first second third fourth fifth sixth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 6 then
      (first  (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third  (Array.unsafe_get source 2),
       fourth (Array.unsafe_get source 3),
       fifth  (Array.unsafe_get source 4),
       sixth  (Array.unsafe_get source 5)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 6, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let tuple7 first second third fourth fifth sixth seventh json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 7 then
      (first (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third (Array.unsafe_get source 2),
       fourth (Array.unsafe_get source 3),
       fifth (Array.unsafe_get source 4),
       sixth (Array.unsafe_get source 5),
       seventh (Array.unsafe_get source 6)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 7, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let tuple8 first second third fourth fifth sixth seventh eighth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 8 then
      (first (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third (Array.unsafe_get source 2),
       fourth (Array.unsafe_get source 3),
       fifth (Array.unsafe_get source 4),
       sixth (Array.unsafe_get source 5),
       seventh (Array.unsafe_get source 6),
       eighth (Array.unsafe_get source 7)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 8, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let tuple9 first second third fourth fifth sixth seventh eighth ninth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 9 then
      (first (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third (Array.unsafe_get source 2),
       fourth (Array.unsafe_get source 3),
       fifth (Array.unsafe_get source 4),
       sixth (Array.unsafe_get source 5),
       seventh (Array.unsafe_get source 6),
       eighth (Array.unsafe_get source 7),
       ninth (Array.unsafe_get source 8)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 9, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)  

let tuple10 first second third fourth fifth sixth seventh eighth ninth tenth json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 10 then
      (first (Array.unsafe_get source 0),
       second (Array.unsafe_get source 1),
       third (Array.unsafe_get source 2),
       fourth (Array.unsafe_get source 3),
       fifth (Array.unsafe_get source 4),
       sixth (Array.unsafe_get source 5),
       seventh (Array.unsafe_get source 6),
       eighth (Array.unsafe_get source 7),
       ninth (Array.unsafe_get source 8),
       tenth (Array.unsafe_get source 9)
      )
    else
      raise @@ DecodeError ({j|Expected array of length 10, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)  
  
let singleEnumerator a json =
  if Js.Array.isArray json then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t array) in
    let length = Js.Array.length source in
    if length = 0 then
      a
    else
      raise @@ DecodeError ({j|Expected array of length 0, got array of length $length|j})
  end
  else
    raise @@ DecodeError ("Expected array, got " ^ Js.Json.stringify json)

let dict decode json = 
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let source = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
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
    raise @@ DecodeError ("Expected object, got " ^ Js.Json.stringify json)

let has_some mas =
  let count =
    (Array.fold_left
     (fun acc  ->
        fun (x, _y)  ->
          match x with
          | None  -> acc + 1
          | Some _a -> acc) 0 mas) in
  count > 0

let beltMapInt decodeValue json =
  match dict decodeValue json with
  | decoded_dict -> (
       let arr = Array.map (fun (k,v) -> (Belt.Int.fromString k, v)) (Js.Dict.entries decoded_dict) in
       if has_some arr
       then raise @@ DecodeError ({j|Unexpectedly received non-integer as key|j})
       else Belt.Map.Int.fromArray (Array.map (fun (k,v) -> (int_of_string k, v)) (Js.Dict.entries decoded_dict))
    )
  | exception DecodeError _ -> raise @@ DecodeError ({j|Expected an associative array with keys as strings|j})

let beltMapString decodeValue json =
  match dict decodeValue json with
    | decoded_dict -> Belt.Map.String.fromArray (Js.Dict.entries decoded_dict)
    | exception DecodeError _ -> raise @@ DecodeError ({j|Expected an associative array with keys as strings|j})

let field key decode json =
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let dict = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
    match Js.Dict.get dict key with
    | Some value -> decode value
    | None -> raise @@ DecodeError ({j|Expected field '$(key)'|j})
  end
  else
    raise @@ DecodeError ("Expected object, got " ^ Js.Json.stringify json)

let optionalField key decode json =
  if Js.typeof json = "object" && 
      not (Js.Array.isArray json) && 
      not ((Obj.magic json : 'a Js.null) == Js.null)
  then begin
    let dict = (Obj.magic (json : Js.Json.t) : Js.Json.t Js.Dict.t) in
    match Js.Dict.get dict key with
    | Some value ->
       if value == Aeson_encode.null then None else Some (decode value)
    | None -> None
  end
  else
    raise @@ DecodeError ("Expected object, got " ^ Js.Json.stringify json)

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
  match Js.Json.decodeObject json with
  | Some o -> (
    match Js_dict.get o "Ok" with
    | Some l -> Belt.Result.Ok (decodeA l)
    | None -> (
      match Js_dict.get o "Error" with
      | Some r -> Belt.Result.Error (decodeB r)
      | None -> raise @@ DecodeError ("Expected object with a \"Ok\" key or \"Error\" key, got " ^ Js.Json.stringify json)
    )
  )
  | None -> raise @@ DecodeError ("Expected object with a \"Ok\" key or \"Error\" key, got " ^ Js.Json.stringify json)
  
let either decodeL decodeR json =
  match Js.Json.decodeObject json with
  | Some o -> (
    match Js_dict.get o "Left" with
    | Some l -> Aeson_compatibility.Either.Left (decodeL l)
    | None -> (
      match Js_dict.get o "Right" with
      | Some r -> Aeson_compatibility.Either.Right (decodeR r)
      | None -> raise @@ DecodeError ("Expected object with a \"Left\" key or \"Right\" key, got " ^ Js.Json.stringify json)
    )
  )
  | None -> raise @@ DecodeError ("Expected object with a \"Left\" key or \"Right\" key, got " ^ Js.Json.stringify json)

       
let rec oneOf decoders json =
  match decoders with
  | [] ->
    let length = List.length decoders in
    raise @@ DecodeError ({j|Expected oneOf $length, got |j} ^ Js.Json.stringify json)
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
      raise @@ DecodeError ("Expected int64, got " ^ Js.Json.stringify json)
  else
    raise @@ DecodeError ("Expected int64, got " ^ Js.Json.stringify json)

let int64 json = 
  match string json with
  | s -> Int64.of_string s
  | exception DecodeError _ ->
      match string (Js.Json.string (Js.Json.stringify json)) with
      | s -> Int64.of_string s
      | exception DecodeError _ -> raise @@ DecodeError ("Expected int64 as string, got " ^ Js.Json.stringify json)
