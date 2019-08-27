import { Range, InvalidRangeError } from './Range'

describe('Range', () => {
  describe('from 1 to 4', () => {
    const range = Range({ start: 1, end: 4 })

    test('iterate', () => {
      let count = 1
      for (const i of range.iterate()) {
        expect(i).toEqual(count)
        count += 1
      }
      expect(count).toBe(5)
    })

    test('toArray', () => {
      expect(range.toArray()).toEqual([1, 2, 3, 4])
    })
  })

  describe('from 1 to 3 with step 0.5 ', () => {
    const range = Range({ start: 1, end: 3, step: 0.5 })

    test('iterate', () => {
      let count = 1
      for (const i of range.iterate()) {
        expect(i).toEqual(count)
        count += 0.5
      }
      expect(count).toBe(3.5)
    })

    test('toArray', () => {
      expect(range.toArray()).toEqual([1, 1.5, 2, 2.5, 3])
    })
  })

  describe('from 4 to -4 with step -2 ', () => {
    const range = Range({ start: 4, end: -4, step: 2 })

    test('iterate', () => {
      let count = 4
      for (const i of range.iterate()) {
        expect(i).toEqual(count)
        count -= 2
      }
      expect(count).toBe(-6)
    })

    test('toArray', () => {
      expect(range.toArray()).toEqual([4, 2, 0, -2, -4])
    })
  })

  describe('handler invalid ranges', () => {
    test('step equal to zero', () => {
      try {
        Range({ start: 1, end: 5, step: 0 })
      } catch (e) {
        expect(e).toBeInstanceOf(InvalidRangeError)
        expect(e.message).toBe(
          'Invalid range: step must be strictly greater or smaller then 0'
        )
      }
    })
  })
})
