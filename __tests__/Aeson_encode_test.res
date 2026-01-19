open Jest
open Expect
open! Aeson.Encode

module Test = {
  type singleEnumerator = SingleEnumerator
}

type onpingKey = OnpingKey(string)

let encodeOnpingKey = (x: onpingKey) =>
  switch x {
  | OnpingKey(x) => string(x)
  }

module OnpingKeyComparable = Belt.Id.MakeComparable({
  type t = onpingKey
  let cmp = (a, b) => compare(a, b)
})

type onpingDescription = {descriptions: Belt.Map.t<onpingKey, string, OnpingKeyComparable.identity>}

let encodeOnpingDescription = (x: onpingDescription) => {
  let v: JSON.t = Aeson.Encode.beltMap(encodeOnpingKey, Aeson.Encode.string, x.descriptions)
  Aeson.Encode.object_(list{("descriptions", v)})
}

type pid = Pid(int)

let encodePid = (x: pid) =>
  switch x {
  | Pid(x) => int(x)
  }

module PidComparable = Belt.Id.MakeComparable({
  type t = pid
  let cmp = (a, b) => compare(a, b)
})

let _ = {
  test("null", () => expect(null)->toEqual(Obj.magic(null)))

  test("string", () => expect(string("foo"))->toEqual(Obj.magic("foo")))

  test("date - non-float time", () => {
    let nowString = "2017-12-08T06:03:22Z"
    let now = Date.fromString(nowString)

    expect(date(now))->toEqual(Obj.magic(nowString))
  })

  test("date - float time", () => {
    let nowString = "2017-12-08T06:03:22.123Z"
    let now = Date.fromString(nowString)

    expect(date(now))->toEqual(Obj.magic(nowString))
  })

  test("float", () => expect(float(1.23))->toEqual(Obj.magic(1.23)))

  test("int", () => expect(int(23))->toEqual(Obj.magic(23)))

  test("bigint", () =>
    expect(bigint(BigInt.fromStringOrThrow("38293829382888882338928")))->toEqual(
      Obj.magic("38293829382888882338928"),
    )
  )

  test("bigint", () =>
    expect(bigint(BigInt.fromStringOrThrow("-38293829382888882338928")))->toEqual(
      Obj.magic("-38293829382888882338928"),
    )
  )

  test("bool", () => expect(bool(true))->toEqual(Obj.magic(true)))

  test("onpingKey string Belt.Map.t (encoded as array of tuples)", () => {
    let arr = [("a", "A"), ("b", "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (OnpingKey(k), v))
    let bm: Belt.Map.t<onpingKey, string, OnpingKeyComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(OnpingKeyComparable),
    )
    expect(beltMap(encodeOnpingKey, string, bm))->toEqual(Obj.magic(arr))
  })

  test("onpingKey string Belt.Map.t (encoded as dictionary)", () => {
    let arr = [("a", "A"), ("b", "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (OnpingKey(k), v))
    let bm: Belt.Map.t<onpingKey, string, OnpingKeyComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(OnpingKeyComparable),
    )
    expect(beltMap1(encodeOnpingKey, string, bm))->toEqual(Obj.magic(Dict.fromArray(arr)))
  })

  test("pid string Belt.Map.t (encoded as array of tuples)", () => {
    let arr = [(1, "A"), (2, "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (Pid(k), v))
    let bm: Belt.Map.t<pid, string, PidComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(PidComparable),
    )
    expect(beltMap(encodePid, string, bm))->toEqual(Obj.magic(arr))
  })

  test("pid string Belt.Map.t (encoded as dictionary)", () => {
    let arr = [(1, "A"), (2, "B")]
    let arrWithKey = Array.map(arr, ((k, v)) => (Pid(k), v))
    let bm: Belt.Map.t<pid, string, PidComparable.identity> = Belt.Map.fromArray(
      arrWithKey,
      ~id=module(PidComparable),
    )

    expect(beltMap1(encodePid, string, bm))->toEqual(
      Array.map(arr, ((k, v)) => (Belt.Int.toString(k), v))->Dict.fromArray->Obj.magic,
    )
  })

  test("string Belt.Map.Int.t", () => {
    let arr = [(1, "A"), (2, "B")]
    let bm: Belt.Map.Int.t<string> = Belt.Map.Int.fromArray(arr)
    expect(beltMapInt(string, bm))->toEqual(
      Dict.fromArray(Array.map(arr, ((k, v)) => (Int.toString(k), v)))->Obj.magic,
    )
  })

  test("string Belt.Map.String.t", () => {
    let arr = [("a", "A"), ("b", "B")]
    let bm: Belt.Map.String.t<string> = Belt.Map.String.fromArray(arr)
    expect(beltMapString(string, bm))->toEqual(Dict.fromArray(arr)->Obj.magic)
  })

  test("dict - empty", () => expect(dict(Dict.make()))->toEqual(Dict.make()->Obj.magic))

  test("dict - simple", () => {
    let o = Dict.make()
    Dict.set(o, "x", int(42))

    expect(dict(o))->toEqual(Obj.magic(o))
  })

  test("object_ - empty", () => expect(object_(list{}))->toEqual(Dict.make()->Obj.magic))

  test("object_ - simple", () =>
    expect(object_(list{("x", int(42))}))->toEqual(Obj.magic(Dict.fromArray(List.toArray(list{("x", 42)}))))
  )

  test("object_ - option", () =>
    expect(object_(list{("x", optional(int, Some(42)))}))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("x", 42)})))
    )
  )

  test("object_ - option Some", () =>
    expect(object_(list{("x", optional(int, Some(42)))}))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("x", 42)})))
    )
  )

  test("object_ - option None", () =>
    expect(object_(list{("x", optional(int, None))}))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("x", null)})))
    )
  )

  test("object_ - optionalField Some", () =>
    expect(object_(optionalField("x", int, Some(42))))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("x", 42)})))
    )
  )

  test("object_ - optionalField Some", () =>
    expect(object_(optionalField("x", int, (None: option<int>))))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{})))
    )
  )

  test("jsonArray int", () =>
    expect(jsonArray(Array.map([1, 2, 3], int)))->toEqual(Obj.magic([1, 2, 3]))
  )

  test("array int", () => expect(array(int, [1, 2, 3]))->toEqual(Obj.magic([1, 2, 3])))

  test("array string", () =>
    expect(array(string, ["foo", "bar", "baz"]))->toEqual(Obj.magic(["foo", "bar", "baz"]))
  )

  test("array bool", () =>
    expect(array(bool, [true, false, true]))->toEqual(Obj.magic([true, false, true]))
  )

  test("array float", () =>
    expect(array(float, [1.5, 2.7, 3.14]))->toEqual(Obj.magic([1.5, 2.7, 3.14]))
  )

  test("array empty", () => expect(array(int, []))->toEqual(Obj.magic([])))

  test("array nullable", () => {
    let result = array(v => nullable(int, v), [Some(1), None, Some(3)])
    let expected = JSON.parseOrThrow(`[1, null, 3]`)
    expect(result)->toEqual(expected)
  })

  test("array nested", () =>
    expect(array(arr => array(int, arr), [[1, 2], [3, 4, 5]]))->toEqual(
      Obj.magic([[1, 2], [3, 4, 5]]),
    )
  )

  test("list int", () => expect(list(int, list{1, 2, 3}))->toEqual(Obj.magic([1, 2, 3])))

  test("singleEnumerator typeParameterRef0", () =>
    expect(singleEnumerator(Test.SingleEnumerator))->toEqual(Obj.magic([]))
  )

  test("stringArray", () => expect(stringArray(["a", "b"]))->toEqual(Obj.magic(["a", "b"])))

  test("numberArray", () => expect(numberArray([0., 4.]))->toEqual(Obj.magic([0, 4])))

  test("boolArray", () => expect(boolArray([true, false]))->toEqual(Obj.magic([true, false])))

  test("result", () =>
    expect(result(string, int, Belt.Result.Error(123)))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("Error", 123)})))
    )
  )

  test("result", () =>
    expect(result(string, int, Belt.Result.Ok("Good")))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("Ok", "Good")})))
    )
  )

  test("either", () =>
    expect(either(int, string, Aeson.Compatibility.Either.Left(123)))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("Left", 123)})))
    )
  )

  test("either", () =>
    expect(either(int, string, Aeson.Compatibility.Either.Right("Good")))->toEqual(
      Obj.magic(Dict.fromArray(List.toArray(list{("Right", "Good")})))
    )
  )

  test("pair", () => expect(pair(int, string, (1, "a")))->toEqual(JSON.parseOrThrow(` [1, "a"] `)))

  test("tuple3", () =>
    expect(tuple3(int, string, bool, (1, "a", false)))->toEqual(
      JSON.parseOrThrow(` [1, "a", false] `),
    )
  )

  test("tuple4", () =>
    expect(tuple4(int, string, bool, int, (1, "a", false, 2)))->toEqual(
      JSON.parseOrThrow(` [1, "a", false, 2] `),
    )
  )

  test("tuple5", () =>
    expect(tuple5(int, string, bool, int, bool, (1, "a", false, 2, true)))->toEqual(
      JSON.parseOrThrow(` [1, "a", false, 2, true] `),
    )
  )

  test("tuple6", () =>
    expect(tuple6(int, string, bool, int, bool, string, (1, "a", false, 2, true, "loop")))->toEqual(
      JSON.parseOrThrow(` [1, "a", false, 2, true, "loop"] `),
    )
  )

  test("tuple7", () =>
    expect(
      tuple7(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        (1, "a", false, 2, true, "loop", "recursion"),
      ),
    )->toEqual(JSON.parseOrThrow(` [1, "a", false, 2, true, "loop", "recursion"] `))
  )

  test("tuple8", () =>
    expect(
      tuple8(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        int,
        (1, "a", false, 2, true, "loop", "recursion", 33),
      ),
    )->toEqual(JSON.parseOrThrow(` [1, "a", false, 2, true, "loop", "recursion", 33] `))
  )

  test("tuple9", () =>
    expect(
      tuple9(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        int,
        string,
        (1, "a", false, 2, true, "loop", "recursion", 33, "blah"),
      ),
    )->toEqual(JSON.parseOrThrow(` [1, "a", false, 2, true, "loop", "recursion", 33, "blah"] `))
  )

  test("tuple10", () =>
    expect(
      tuple10(
        int,
        string,
        bool,
        int,
        bool,
        string,
        string,
        int,
        string,
        bool,
        (1, "a", false, 2, true, "loop", "recursion", 33, "blah", false),
      ),
    )->toEqual(
      JSON.parseOrThrow(` [1, "a", false, 2, true, "loop", "recursion", 33, "blah", false] `),
    )
  )
}
