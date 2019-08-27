export function Maybe (_v = null) {
  const value = _v

  const isNothing = () => value == null
  const isSomething = () => !isNothing()
  const equals = opt => (isNothing() && opt.isNothing()) || opt.get() === value
  const contains = val => isSomething() && value === val

  const orElse = val => (isNothing() ? Maybe(val) : Maybe(value))
  const getOrElse = val => (isNothing() ? val : value)
  const get = () => value
  const copy = () => Maybe(value)

  const map = fn => (isNothing() ? Maybe() : Maybe(fn(value)))
  const flatMap = fn => (isNothing() ? Maybe() : fn(value))

  return {
    isNothing,
    isSomething,
    equals,
    contains,
    orElse,
    getOrElse,
    get,
    copy,
    map,
    flatMap
  }
}

export function Just (val) {
  return Maybe(val)
}

export function Nothing () {
  return Maybe()
}
