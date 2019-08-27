import { _ } from './helpers'
import { Just } from './Maybe'

describe('helpers', () => {
  describe('sum', () => {
    test('empty list = 0', () => {
      expect(_.sum([])).toBe(0)
    })

    test('list [2, 3, 4] = 9', () => {
      expect(_.sum([2, 3, 4])).toBe(9)
    })
  })

  describe('unique', () => {
    const l1 = [2, 3, 4]
    const l2 = [2, 2, 2, 3, 3, 4]

    test('empty list => unchanged', () => {
      expect(_.unique([])).toEqual([])
    })
    test(`list ${l1} => unchanged`, () => {
      expect(_.unique(l1)).toEqual(l1)
    })
    test(`list ${l2} => ${l1}`, () => {
      expect(_.unique(l2)).toEqual(l1)
    })
  })

  describe('pipe', () => {
    const inc = l => l.map(x => x + 1)
    const list = [1, 1, 1, 2, 2, 3]

    test('unique |> inc |> sum', () => {
      const calculate = _.pipe(
        _.unique,
        inc,
        _.sum
      )
      expect(calculate(list)).toBe(2 + 3 + 4)
    })
  })

  describe('not', () => {
    const same = (a, b) => a === b

    test('not(same)(1, 2) === !same(1, 2)', () => {
      expect(_.not(same)(1, 2)).toBe(!same(1, 2))
    })
  })

  describe('merge', () => {
    test('override props in good order', () => {
      expect(
        _.merge(
          { a: 1, b: 1, c: 1 },
          { a: 2, b: 2, x: 0 },
          { a: 3, y: 0, z: 0 }
        )
      ).toEqual({
        a: 3,
        b: 2,
        c: 1,
        x: 0,
        y: 0,
        z: 0
      })
    })
  })

  describe('extract', () => {
    const object = { a: 1, b: 2 }

    test('returns Nothing if missing key', () => {
      expect(_.extract('x')(object).isNothing()).toBe(true)
    })

    test('returns Nothing if missing key', () => {
      expect(_.extract('a')(object).equals(Just(1))).toBe(true)
    })
  })

  describe('objectify', () => {
    const list = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'c', value: 3 }
    ]

    test('if key does not exist returns an empty object', () => {
      expect(_.objectify('xxx')(list)).toEqual({})
    })

    test('if key exists returns a correct object', () => {
      expect(_.objectify('type')(list)).toEqual({
        a: { type: 'a', value: 1 },
        b: { type: 'b', value: 2 },
        c: { type: 'c', value: 3 }
      })
    })
  })
})
