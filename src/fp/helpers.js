import { Maybe } from './Maybe'

export const _ = {
  pipe: (...fns) => value => fns.reduce((result, fn) => fn(result), value),
  not: fn => (...params) => !fn(...params),
  // @ts-ignore
  spy: val => console.log('spy', val) || val,
  sum: list => list.reduce((total, current) => total + current, 0),
  map: fn => o => o.map(fn),
  merge: (...objects) =>
    objects.reduce((acc, current) => ({ ...acc, ...current }), {}),
  // @ts-ignore
  unique: list => [...new Set(list)],
  extract: key => object => Maybe(object[key]),
  objectify: key => list =>
    list.reduce(
      (result, current) =>
        !current[key]
          ? result
          : {
            ...result,
            [current[key]]: current
          },
      {}
    )
}
