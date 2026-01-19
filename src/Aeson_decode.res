@new external _unsafeCreateUninitializedArray: int => array<'a> = "Array"

let _isInteger = value => Float.isFinite(value) && Math.floor(value) === value

type decoder<'a> = JSON.t => 'a

exception DecodeError(string)

let unwrapResult = r =>
  switch r {
  | Belt.Result.Ok(v) => v
  | Belt.Result.Error(message) => DecodeError(message)->throw
  }

let wrapResult = (decoder, json) =>
  switch decoder(json) {
  | v => Belt.Result.Ok(v)
  | exception DecodeError(message) => Belt.Result.Error(message)
  }

let bool = json =>
  if Type.typeof(json) == #boolean {
    (Obj.magic((json: JSON.t)): bool)
  } else {
    DecodeError("Expected boolean, got " ++ JSON.stringify(json))->throw
  }

let float = json =>
  if Type.typeof(json) == #number {
    (Obj.magic((json: JSON.t)): float)
  } else if Type.typeof(json) == #string {
    switch (Obj.magic((json: JSON.t)): string) {
    | "+inf" => Float.parseFloat("Infinity")
    | "-inf" => Float.parseFloat("-Infinity")
    | "Infinity" => Float.parseFloat("Infinity")
    | "+Infinity" => Float.parseFloat("Infinity")
    | "-Infinity" => Float.parseFloat("-Infinity")
    | _ => DecodeError("Expected \"+inf\" or \"-inf\", got " ++ JSON.stringify(json))->throw
    }
  } else {
    DecodeError("Expected number, got " ++ JSON.stringify(json))->throw
  }

let int = (json: JSON.t): int => {
  let f = float(json)
  if _isInteger(f) {
    (Obj.magic((f: float)): int)
  } else {
    throw(DecodeError("Expected int, got " ++ JSON.stringify(json)))
  }
}

let string = json =>
  if Type.typeof(json) == #string {
    (Obj.magic((json: JSON.t)): string)
  } else {
    DecodeError("Expected string, got " ++ JSON.stringify(json))->throw
  }

let bigint = json =>
  if Type.typeof(json) == #string {
    let source: string = Obj.magic((json: JSON.t))

    try {
      BigInt.fromStringOrThrow(source)
    } catch {
    | JsExn(_error) => DecodeError("Expected bigint, got " ++ source)->throw
    }
  } else {
    DecodeError("Expected bigint, got " ++ JSON.stringify(json))->throw
  }

let date = json =>
  if Type.typeof(json) == #string {
    let source: string = Obj.magic((json: JSON.t))
    let encodedDate = Date.fromString(source)
    if Float.isNaN(Date.getTime(encodedDate)) {
      DecodeError("Expected date, got " ++ source)->throw
    } else {
      encodedDate
    }
  } else {
    DecodeError("Expected date, got " ++ JSON.stringify(json))->throw
  }

let nullable = (decode, json) =>
  if (Obj.magic(json): Null.t<'a>) === Null.null {
    Null.null
  } else {
    Null.make(decode(json))
  }

let nullAs = (value, json) => {
  if (Obj.magic(json): Null.t<'a>) === Null.null {
    value
  } else {
    DecodeError("Expected null, got " ++ JSON.stringify(json))->throw
  }
}

let array = (decode, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    let target = _unsafeCreateUninitializedArray(length)
    for i in 0 to length - 1 {
      let value = decode(Array.getUnsafe(source, i))
      Array.setUnsafe(target, i, value)
    }
    target
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let list = (decode, json) => List.fromArray(array(decode, json))

let pair = (left, right, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 2 {
      (left(Array.getUnsafe(source, 0)), right(Array.getUnsafe(source, 1)))
    } else {
      DecodeError(`Expected array of length 2, got array of length ${Int.toString(length)}`)->throw
    }
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let tuple2 = pair

let tuple3 = (first, second, third, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 3 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
      )
    } else {
      DecodeError(`Expected array of length 3, got array of length ${Int.toString(length)}`)->throw
    }
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let tuple4 = (first, second, third, fourth, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 4 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
      )
    } else {
      DecodeError(`Expected array of length 4, got array of length ${Int.toString(length)}`)->throw
    }
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let tuple5 = (first, second, third, fourth, fifth, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 5 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
      )
    } else {
      DecodeError(`Expected array of length 5, got array of length ${Int.toString(length)}`)->throw
    }
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let tuple6 = (first, second, third, fourth, fifth, sixth, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 6 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
      )
    } else {
      DecodeError(`Expected array of length 6, got array of length ${Int.toString(length)}`)->throw
    }
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let tuple7 = (first, second, third, fourth, fifth, sixth, seventh, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 7 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
      )
    } else {
      DecodeError(`Expected array of length 7, got array of length ${Int.toString(length)}`)->throw
    }
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let tuple8 = (first, second, third, fourth, fifth, sixth, seventh, eighth, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 8 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
        eighth(Array.getUnsafe(source, 7)),
      )
    } else {
      DecodeError(`Expected array of length 8, got array of length ${Int.toString(length)}`)->throw
    }
  } else {
    DecodeError("Expected array, got " ++ JSON.stringify(json))->throw
  }

let tuple9 = (first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 9 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
        eighth(Array.getUnsafe(source, 7)),
        ninth(Array.getUnsafe(source, 8)),
      )
    } else {
      throw(DecodeError(`Expected array of length 9, got array of length ${Int.toString(length)}`))
    }
  } else {
    throw( DecodeError("Expected array, got " ++ JSON.stringify(json)))
  }

let tuple10 = (first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 10 {
      (
        first(Array.getUnsafe(source, 0)),
        second(Array.getUnsafe(source, 1)),
        third(Array.getUnsafe(source, 2)),
        fourth(Array.getUnsafe(source, 3)),
        fifth(Array.getUnsafe(source, 4)),
        sixth(Array.getUnsafe(source, 5)),
        seventh(Array.getUnsafe(source, 6)),
        eighth(Array.getUnsafe(source, 7)),
        ninth(Array.getUnsafe(source, 8)),
        tenth(Array.getUnsafe(source, 9)),
      )
    } else {
      throw(DecodeError(`Expected array of length 10, got array of length ${Int.toString(length)}`))
    }
  } else {
    throw( DecodeError("Expected array, got " ++ JSON.stringify(json)))
  }

let singleEnumerator = (a, json) =>
  if Array.isArray(json) {
    let source: array<JSON.t> = Obj.magic((json: JSON.t))
    let length = Array.length(source)
    if length == 0 {
      a
    } else {
      throw(DecodeError(`Expected array of length 0, got array of length ${Int.toString(length)}`))
    }
  } else {
    throw( DecodeError("Expected array, got " ++ JSON.stringify(json)))
  }

let dict = (decode, json) =>
  if (
    Type.typeof(json) == #object && (!Array.isArray(json) && !((Obj.magic(json): Null.t<'a>) === Null.null))
  ) {
    let source: dict<JSON.t> = Obj.magic((json: JSON.t))
    let keys = Dict.keysToArray(source)
    let l = Array.length(keys)
    let target = Dict.make()
    for i in 0 to l - 1 {
      let key = Array.getUnsafe(keys, i)
      let value = decode(Dict.getUnsafe(source, key))
      Dict.set(target, key, value)
    }
    target
  } else {
    throw( DecodeError("Expected object, got " ++ JSON.stringify(json)))
  }

let has_some = mas => {
  let count = Array.reduce(mas, 0, (acc, (x, _y)) =>
    switch x {
    | None => acc + 1
    | Some(_a) => acc
    }
  )
  count > 0
}

let beltMap = (decodeKey, decodeValue, ~id, json) =>
  switch array(x => pair(decodeKey, decodeValue, x), json) {
  | decoded_array => Belt.Map.fromArray(decoded_array, ~id)
  | exception DecodeError(_) =>
    switch dict(decodeValue, json) {
    | decoded_dict =>
      let entries = Dict.toArray(decoded_dict)
      let entries = Js.Array.map(((k, v)) => {
        let key = switch decodeKey(Obj.magic(k)) {
        | key => key
        | exception DecodeError(err) =>
          switch Belt.Int.fromString(Obj.magic(k)) {
          | Some(key) =>
            switch decodeKey(Aeson_encode.int(key)) {
            | key => key
            | exception DecodeError(_) => throw( DecodeError(`Object key must be a string`))
            }
          | None => throw( DecodeError(err))
          }
        }
        (key, v)
      }, entries)
      Belt.Map.fromArray(entries, ~id)
    | exception DecodeError(_) =>
      throw(DecodeError(`Expected an array of tuples or dictionary of object with string key`))
    }
  }

let beltMapInt = (decodeValue, json) =>
  switch dict(decodeValue, json) {
  | decoded_dict =>
    let arr = Array.map(Dict.toArray(decoded_dict), ((k, v)) => (Belt.Int.fromString(k), v))
    if has_some(arr) {
      throw( DecodeError(`Unexpectedly received non-integer as key`))
    } else {
      Belt.Map.Int.fromArray(
        Array.map(Dict.toArray(decoded_dict), ((k, v)) => (Belt.Option.getExn(Int.fromString(k)), v)),
      )
    }
  | exception DecodeError(_) =>
    throw( DecodeError(`Expected an associative array with keys as strings`))
  }

let beltMapString = (decodeValue, json) =>
  switch dict(decodeValue, json) {
  | decoded_dict => Belt.Map.String.fromArray(Dict.toArray(decoded_dict))
  | exception DecodeError(_) =>
    throw( DecodeError(`Expected an associative array with keys as strings`))
  }

let field = (key, decode, json) =>
  if (
    Type.typeof(json) == #object && (!Array.isArray(json) && !((Obj.magic(json): Null.t<'a>) === Null.null))
  ) {
    let dict: dict<JSON.t> = Obj.magic((json: JSON.t))
    switch Dict.get(dict, key) {
    | Some(value) => decode(value)
    | None => throw( DecodeError(`Expected field '${key}'`))
    }
  } else {
    throw( DecodeError("Expected object, got " ++ JSON.stringify(json)))
  }

let optionalField = (key, decode, json) =>
  if (
    Type.typeof(json) == #object && (!Array.isArray(json) && !((Obj.magic(json): Null.t<'a>) === Null.null))
  ) {
    let dict: dict<JSON.t> = Obj.magic((json: JSON.t))
    switch Dict.get(dict, key) {
    | Some(value) =>
      if value === Aeson_encode.null {
        None
      } else {
        Some(decode(value))
      }
    | None => None
    }
  } else {
    throw( DecodeError("Expected object, got " ++ JSON.stringify(json)))
  }

let rec at = (key_path, decoder, json) =>
  switch key_path {
  | list{key} => field(key, decoder, json)
  | list{first, ...rest} => field(first, x => at(rest, decoder, x), json)
  | list{} => throw( Invalid_argument("Expected key_path to contain at least one element"))
  }

let optional = (decode, json) =>
  switch decode(json) {
  | exception DecodeError(_) => None
  | v => Some(v)
  }

let result = (decodeA, decodeB, json) =>
  switch JSON.Decode.object(json) {
  | Some(o) =>
    switch Dict.get(o, "Ok") {
    | Some(l) => Belt.Result.Ok(decodeA(l))
    | None =>
      switch Dict.get(o, "Error") {
      | Some(r) => Belt.Result.Error(decodeB(r))
      | None =>
        DecodeError(
          "Expected object with a \"Ok\" key or \"Error\" key, got " ++ JSON.stringify(json),
        )->throw
      }
    }
  | None =>
    DecodeError(
      "Expected object with a \"Ok\" key or \"Error\" key, got " ++ JSON.stringify(json),
    )->throw
  }

let either = (decodeL, decodeR, json) =>
  switch JSON.Decode.object(json) {
  | Some(o) =>
    switch Dict.get(o, "Left") {
    | Some(l) => Aeson_compatibility.Either.Left(decodeL(l))
    | None =>
      switch Dict.get(o, "Right") {
      | Some(r) => Aeson_compatibility.Either.Right(decodeR(r))
      | None =>
        DecodeError(
          "Expected object with a \"Left\" key or \"Right\" key, got " ++ JSON.stringify(json),
        )->throw
      }
    }
  | None =>
    DecodeError(
      "Expected object with a \"Left\" key or \"Right\" key, got " ++ JSON.stringify(json),
    )->throw
  }

let rec oneOf = (decoders, json) =>
  switch decoders {
  | list{} =>
    let length = List.length(decoders)
    DecodeError(`Expected oneOf ${Int.toString(length)}, got ` ++ JSON.stringify(json))->throw
  | list{decode, ...rest} =>
    switch decode(json) {
    | v => v
    | exception _ => oneOf(rest, json)
    }
  }

let tryEither = (a, b, e) => oneOf(list{a, b}, e)

let withDefault = (default, decode, json) =>
  switch decode(json) {
  | v => v
  | exception _ => default
  }

let map = (f, decode, json) => f(decode(json))

let andThen = (b, a, json) => b(a(json), json)
