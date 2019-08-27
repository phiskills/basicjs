import { Just, Nothing } from './Maybe'

describe('Maybe', () => {
  describe('Nothing', () => {
    const nothing = Nothing()

    test('isNothing is true', () => {
      expect(nothing.isNothing()).toBe(true)
    })
    test('isSomething is false', () => {
      expect(nothing.isSomething()).toBe(false)
    })
    test('is Nothing', () => {
      expect(nothing.equals(Nothing())).toBe(true)
    })
    test('is not Just(5)', () => {
      expect(nothing.equals(Just(5))).toBe(false)
    })
    test('never contains anything', () => {
      for (const val of [5, 0, NaN, 'Hello', '', null, undefined]) {
        expect(nothing.contains(val)).toBe(false)
      }
    })
    test('orElse 5 returns Just(5)', () => {
      expect(nothing.orElse(5).equals(Just(5))).toBe(true)
    })
    test('getOrElse 5 returns 5', () => {
      expect(nothing.getOrElse(5)).toBe(5)
    })
    test('get returns null', () => {
      expect(nothing.get()).toBe(null)
    })
    test('copy returns a copy', () => {
      const copy = nothing.copy()
      expect(nothing).not.toBe(copy)
      expect(nothing.equals(copy)).toBe(true)
    })
    test('map returns Nothing', () => {
      expect(nothing.map(x => x + 1).equals(Nothing())).toBe(true)
    })
    test('flatMap returns Nothing', () => {
      expect(nothing.flatMap(x => Just(x + 1)).equals(Nothing())).toBe(true)
    })
  })

  describe('Just', () => {
    const someValue = Just(5)

    test('isNothing is false', () => {
      expect(someValue.isNothing()).toBe(false)
    })
    test('isSomething is false', () => {
      expect(someValue.isSomething()).toBe(true)
    })
    test('is not Nothing', () => {
      expect(someValue.equals(Nothing())).toBe(false)
    })
    test('is Just(5)', () => {
      expect(someValue.equals(Just(5))).toBe(true)
    })
    test('contains 5', () => {
      expect(someValue.contains(5)).toBe(true)
    })
    test('does not contain anything other then 5', () => {
      for (const val of [3, 0, NaN, 'Hello', '', null, undefined]) {
        expect(someValue.contains(val)).toBe(false)
      }
    })
    test('orElse 7 returns Just(5)', () => {
      expect(someValue.orElse(7).equals(Just(5))).toBe(true)
    })
    test('getOrElse 7 returns 5', () => {
      expect(someValue.getOrElse(7)).toBe(5)
    })
    test('get returns 5', () => {
      expect(someValue.get()).toBe(5)
    })
    test('copy returns a copy', () => {
      const copy = someValue.copy()
      expect(someValue).not.toBe(copy)
      expect(someValue.equals(copy)).toBe(true)
    })
    test('map returns Just(6)', () => {
      expect(someValue.map(x => x + 1).equals(Just(6))).toBe(true)
    })
    test('flatMap returns Just(6)', () => {
      expect(someValue.flatMap(x => Just(x + 1)).equals(Just(6))).toBe(true)
    })
  })
})
