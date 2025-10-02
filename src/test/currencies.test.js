import { describe, it, expect } from 'vitest'
import { currencies, getCurrencyCodes, getCurrencyName } from '../data/currencies'

describe('Currency utilities', () => {
  describe('currencies object', () => {
    it('should contain all required currencies', () => {
      expect(currencies).toBeDefined()
      expect(typeof currencies).toBe('object')
    })

    it('should have USD, EUR, and BRL currencies', () => {
      expect(currencies.USD).toBe('Dólar Americano')
      expect(currencies.EUR).toBe('Euro')
      expect(currencies.BRL).toBe('Real Brasileiro')
    })

    it('should have 31 currencies total', () => {
      expect(Object.keys(currencies)).toHaveLength(31)
    })

    it('should have proper currency format', () => {
      Object.entries(currencies).forEach(([code, name]) => {
        expect(code).toMatch(/^[A-Z]{3}$/) // Código de 3 letras maiúsculas
        expect(typeof name).toBe('string')
        expect(name.length).toBeGreaterThan(0)
      })
    })
  })

  describe('getCurrencyCodes', () => {
    it('should return array of currency codes', () => {
      const codes = getCurrencyCodes()
      expect(Array.isArray(codes)).toBe(true)
      expect(codes).toHaveLength(31)
      expect(codes).toContain('USD')
      expect(codes).toContain('EUR')
      expect(codes).toContain('BRL')
    })

    it('should return codes in consistent order', () => {
      const codes1 = getCurrencyCodes()
      const codes2 = getCurrencyCodes()
      expect(codes1).toEqual(codes2)
    })
  })

  describe('getCurrencyName', () => {
    it('should return correct currency names', () => {
      expect(getCurrencyName('USD')).toBe('Dólar Americano')
      expect(getCurrencyName('EUR')).toBe('Euro')
      expect(getCurrencyName('BRL')).toBe('Real Brasileiro')
    })

    it('should return code if currency not found', () => {
      expect(getCurrencyName('XXX')).toBe('XXX')
      expect(getCurrencyName('INVALID')).toBe('INVALID')
    })

    it('should handle empty or null inputs', () => {
      expect(getCurrencyName('')).toBe('')
      expect(getCurrencyName(null)).toBe(null)
      expect(getCurrencyName(undefined)).toBe(undefined)
    })
  })
})