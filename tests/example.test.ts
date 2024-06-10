//example test
import { validPhone } from '../src/utils/regex.util'
import { expect, test } from 'bun:test'

test('validPhone', () => {
  expect(validPhone('ES', '612123123')).toBe(true)
  expect(validPhone('US', 'asdasdaa')).toBe(false)
})
