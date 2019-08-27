const add = (a, b) => a + b
const sub = (a, b) => a - b
const greater = (a, b) => a >= b
const smaller = (a, b) => a <= b

export function Range ({ start, end, step = 1 }) {
  if (!step || step < 0) {
    throw new InvalidRangeError(
      `Invalid range: step must be strictly greater or smaller then 0`
    )
  }

  const calc = start < end ? add : sub
  const compare = start < end ? greater : smaller

  function * generate (_start, _end, _step = 1) {
    yield _start
    if (compare(_start, _end)) return
    yield * generate(calc(_start, _step), _end, _step)
  }

  return {
    iterate: () => generate(start, end, step),
    toArray: () => [...generate(start, end, step)]
  }
}

export class InvalidRangeError extends Error {
  constructor (...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidRangeError)
    }
    this.name = 'InvalidRangeError'
  }
}
