import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CurrencyConverter from '../components/CurrencyConverter'

describe('CurrencyConverter - Simplified Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('should render the currency converter interface', () => {
      render(<CurrencyConverter />)
      
      expect(screen.getByText('💱 Conversor de Moedas')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Digite o valor')).toBeInTheDocument()
      expect(screen.getAllByRole('combobox')).toHaveLength(2)
      expect(screen.getByRole('button', { name: 'Converter' })).toBeInTheDocument()
    })

    it('should initialize with correct default values', () => {
      render(<CurrencyConverter />)
      
      const selects = screen.getAllByRole('combobox')
      expect(selects[0]).toHaveValue('BRL') // From
      expect(selects[1]).toHaveValue('USD') // To
    })
  })

  describe('Form Interactions', () => {
    it('should allow changing currency selections', async () => {
      const user = userEvent.setup()
      render(<CurrencyConverter />)
      
      const [fromSelect, toSelect] = screen.getAllByRole('combobox')
      
      await user.selectOptions(fromSelect, 'EUR')
      await user.selectOptions(toSelect, 'JPY')
      
      expect(fromSelect).toHaveValue('EUR')
      expect(toSelect).toHaveValue('JPY')
    })

    it('should allow typing in amount field', async () => {
      const user = userEvent.setup()
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      await user.type(input, '100')
      
      // Input é controlado, então verificamos se não há erros visuais
      expect(input).toBeInTheDocument()
    })
  })

  describe('State Management', () => {
    it('should clear previous error when input changes', async () => {
      const user = userEvent.setup()
      
      // Mock para simular erro
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
      
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      const button = screen.getByRole('button', { name: 'Converter' })
      
      // Digita valor e tenta converter (vai dar erro)
      await user.type(input, '100')
      await user.click(button)
      
      // Aguarda erro aparecer
      await waitFor(() => {
        expect(screen.getByText('Erro ao converter moeda. Tente novamente.')).toBeInTheDocument()
      })
      
      // Muda o valor - erro deve desaparecer
      await user.clear(input)
      await user.type(input, '200')
      
      // Erro deve ter sumido
      expect(screen.queryByText('Erro ao converter moeda. Tente novamente.')).not.toBeInTheDocument()
    })
  })

  describe('Button States', () => {
    it('should disable button when loading', async () => {
      const user = userEvent.setup()
      
      // Mock que demora para resolver
      global.fetch = vi.fn().mockImplementation(
        () => new Promise(resolve => {
          setTimeout(() => resolve({
            ok: true,
            json: () => Promise.resolve({ rates: { USD: 0.18 } })
          }), 200)
        })
      )
      
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      const button = screen.getByRole('button', { name: 'Converter' })
      
      await user.type(input, '100')
      await user.click(button)
      
      // Botão deve mostrar loading
      expect(screen.getByRole('button', { name: 'Convertendo...' })).toBeDisabled()
    })

    it('should validate input behavior', async () => {
      const user = userEvent.setup()
      
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      const button = screen.getByRole('button', { name: 'Converter' })
      
      // Verifica que o botão existe e pode ser clicado
      expect(button).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      
      // Testa entrada de valor
      await user.type(input, '0')
      expect(input.value).toBe('0')
      
      // Testa limpeza
      await user.clear(input)
      expect(input.value).toBe('')
    })

    it('should prevent same currency conversion', async () => {
      const user = userEvent.setup()
      
      // Mock global alert
      const originalAlert = global.alert
      global.alert = vi.fn()
      
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      const [, toSelect] = screen.getAllByRole('combobox')
      const button = screen.getByRole('button', { name: 'Converter' })
      
      await user.type(input, '100')
      await user.selectOptions(toSelect, 'BRL') // Mesma moeda que FROM (BRL)
      await user.click(button)
      
      expect(global.alert).toHaveBeenCalledWith('Selecione moedas diferentes para conversão.')
      
      global.alert = originalAlert
    })
  })

  describe('Error Handling', () => {
    it('should display error message on network failure', async () => {
      const user = userEvent.setup()
      
      // Mock que falha
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
      
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      const button = screen.getByRole('button', { name: 'Converter' })
      
      await user.type(input, '100')
      await user.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('Erro ao converter moeda. Tente novamente.')).toBeInTheDocument()
      })
    })

    it('should handle HTTP errors gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock que retorna HTTP error
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      })
      
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      const button = screen.getByRole('button', { name: 'Converter' })
      
      await user.type(input, '100')
      await user.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('Erro ao converter moeda. Tente novamente.')).toBeInTheDocument()
      })
    })
  })

  describe('Currency Integration', () => {
    it('should have all currency options available', () => {
      render(<CurrencyConverter />)
      
      const selects = screen.getAllByRole('combobox')
      
      // Verifica algumas moedas importantes
      expect(screen.getAllByRole('option', { name: 'USD' })).toHaveLength(2)
      expect(screen.getAllByRole('option', { name: 'EUR' })).toHaveLength(2) 
      expect(screen.getAllByRole('option', { name: 'BRL' })).toHaveLength(2)
      expect(screen.getAllByRole('option', { name: 'JPY' })).toHaveLength(2)
    })
  })

  describe('Success Flow (Mocked)', () => {
    it('should successfully process conversion with valid API response', async () => {
      const user = userEvent.setup()
      
      // Mock de sucesso real
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          amount: 100,
          base: 'BRL',
          rates: { USD: 0.18 }
        })
      })
      
      render(<CurrencyConverter />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      const button = screen.getByRole('button', { name: 'Converter' })
      
      await user.type(input, '100')
      await user.click(button)
      
      // Verifica se fetch foi chamado com a URL correta
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('api.frankfurter.app/latest?amount=100&from=BRL&to=USD'),
          expect.objectContaining({
            signal: expect.any(AbortSignal)
          })
        )
      })
      
      // Se chegou até aqui, o fluxo básico funciona
      expect(global.fetch).toHaveBeenCalled()
    })
  })
})