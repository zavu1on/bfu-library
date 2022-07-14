import { useFormater } from './useFormater'
import jest from 'jest'

const _ = useFormater()

describe('useFormater', () => {
  // ИЗ ДАТЫ В СТРОКУ

  test('Из даты в строку', () => {
    expect(_(new Date(1946, 11, 9))).toEqual('1946-11-09')
  })

  test('Из даты в строку, месяц декабрь', () => {
    expect(_(new Date(1946, 12, 9))).toEqual('1946-12-09')
  })

  test('Из даты в строку, конец года', () => {
    expect(_(new Date(1946, 12, 31))).toEqual('1946-12-31')
  })

  test('Из даты в строку, конец месяца', () => {
    expect(_(new Date(1946, 7, 31))).toEqual('1946-07-31')
  })

  test('Из даты в строку, обычный день', () => {
    expect(_(new Date(1946, 9, 17))).toEqual('1946-09-17')
  })

  // ИЗ СТРОКИ В СТРОКУ

  test('Из строки в строку', () => {
    expect(_('1946-11-09')).toEqual('1946-11-09')
  })

  test('Из строки в строку, месяц декабрь', () => {
    expect(_('1946-12-09')).toEqual('1946-12-09')
  })
})
