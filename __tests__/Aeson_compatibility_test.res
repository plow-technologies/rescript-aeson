open Jest
open Expect

let () = describe("Either.t", () => {
  open Aeson
  open Compatibility

  test("to_result: Left", () =>
    \"@@"(expect, Either.to_result(Either.Left(123))) |> toEqual(Belt.Result.Error(123))
  )

  test("to_result: Right", () =>
    \"@@"(expect, Either.to_result(Either.Right("Hello"))) |> toEqual(Belt.Result.Ok("Hello"))
  )

  test("of_result: Error", () =>
    \"@@"(expect, Either.of_result(Belt.Result.Error(123))) |> toEqual(Either.Left(123))
  )

  test("of_result: Ok", () =>
    \"@@"(expect, Either.of_result(Belt.Result.Ok("Goodbye"))) |> toEqual(Either.Right("Goodbye"))
  )
})
