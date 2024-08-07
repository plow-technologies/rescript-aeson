/* https://gist.github.com/NicolasT/65dad40b203da7c65b4c */
module Either = {
  type t<'left, 'right> = Left('left) | Right('right)

  @ocaml.doc(" Constructor functions ")
  let left = a => Left(a)
  let right = b => Right(b)

  let either = (l, r, x) =>
    switch x {
    | Left(v) => l(v)
    | Right(v) => r(v)
    }

  @ocaml.doc(" Conversion functions ")
  let to_result = e =>
    switch e {
    | Left(l) => Belt.Result.Error(l)
    | Right(r) => Belt.Result.Ok(r)
    }

  let of_result = r =>
    switch r {
    | Belt.Result.Ok(r) => Right(r)
    | Belt.Result.Error(l) => Left(l)
    }

  @ocaml.doc(" Bifunctor interface ")
  let bimap = (l, r, e) => either(v => left(l(v)), v => right(r(v)), e)

  external id: 'a => 'a = "%identity"
  let const = (v, _) => v

  @ocaml.doc(" Functor interface ")
  let map = (f, e) => bimap(id, f, e)
  let \"<$>" = map
  let map_left = (f, e) => bimap(f, id, e)

  @ocaml.doc(" Monadic interface ")
  let bind = (m, k) => either(left, k, m)

  let return = right
  let \">>=" = bind
  let throw = left

  @ocaml.doc(" Applicative interface ")
  let pure = return
  let apply = (f, v) => \">>="(f, f' => \">>="(v, v' => pure(f'(v'))))
  let \"<*>" = apply

  @ocaml.doc(" Turn a function result in a value or an error ")
  let try_ = f =>
    try pure(f()) catch {
    | exn => throw(exn)
    }

  @ocaml.doc(" Predicates ")
  let is_left = v => either(x => const(true, x), x => const(false, x), v)
  let is_right = v => either(x => const(false, x), x => const(true, x), v)

  let to_string = (l, r, e) =>
    either(v => "Left (" ++ (l(v) ++ ")"), v => "Right (" ++ (r(v) ++ ")"), e)

  @ocaml.doc(" Extract a value of raise an exception ")
  let error = v => either(e => raise(e), id, v)

  @ocaml.doc(" Silence into an option ")
  let hush = v => either(x => const(None, x), v' => Some(v'), v)

  @ocaml.doc(" Expand from an option ")
  let note = (e, x) =>
    switch x {
    | None => Left(e)
    | Some(v) => Right(v)
    }

  @ocaml.doc(" Catamorphism ")
  let fold = (f, z, e) => either(x => const(z, x), v => f(v, z), e)
}
