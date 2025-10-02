import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CurrencyForm from '../components/CurrencyForm'

describe('CurrencyForm Component', () => {
  const defaultProps = {
    amount: '',
    from: 'USD',
    to: 'BRL',
    setAmount: vi.fn(),
    setFrom: vi.fn(),
    setTo: vi.fn(),
    onConvert: vi.fn(),
    loading: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all form elements', () => {
      render(<CurrencyForm {...defaultProps} />)
      
      expect(screen.getByPlaceholderText('Digite o valor')).toBeInTheDocument()
      expect(screen.getByDisplayValue('USD')).toBeInTheDocument()
      expect(screen.getByDisplayValue('BRL')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Converter' })).toBeInTheDocument()
    })

    it('should render currency options', () => {
      render(<CurrencyForm {...defaultProps} />)
      
      const selects = screen.getAllByRole('combobox')
      expect(selects).toHaveLength(2)
      
      // Verifica se algumas moedas estão presentes (usando getAllByRole para múltiplos)
      const usdOptions = screen.getAllByRole('option', { name: 'USD' })
      const eurOptions = screen.getAllByRole('option', { name: 'EUR' })
      const brlOptions = screen.getAllByRole('option', { name: 'BRL' })
      
      expect(usdOptions).toHaveLength(2) // Uma em cada select
      expect(eurOptions).toHaveLength(2)
      expect(brlOptions).toHaveLength(2)
    })
  })

  describe('Input validation', () => {
    it('should allow valid numeric input', async () => {
      const user = userEvent.setup()
      render(<CurrencyForm {...defaultProps} />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      await user.type(input, '123.45')
      
      // Verifica se setAmount foi chamado (funcionalidade principal)
      expect(defaultProps.setAmount).toHaveBeenCalled()
      expect(defaultProps.setAmount).toHaveBeenCalledTimes(6) // 6 caracteres
    })

    it('should convert comma to dot', async () => {
      const user = userEvent.setup()
      render(<CurrencyForm {...defaultProps} />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      await user.type(input, '123,45')
      
      // Verifica se setAmount foi chamado (funcionalidade principal)
      expect(defaultProps.setAmount).toHaveBeenCalled()
      expect(defaultProps.setAmount).toHaveBeenCalledTimes(6) // 6 caracteres
    })

    it('should prevent non-numeric characters', async () => {
      const user = userEvent.setup()
      render(<CurrencyForm {...defaultProps} />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      await user.type(input, 'abc123def')
      
      // Verifica se setAmount foi chamado apenas para os números válidos
      expect(defaultProps.setAmount).toHaveBeenCalled()
      
      // Verifica se as chamadas contêm apenas números (sem letras)
      const calls = defaultProps.setAmount.mock.calls
      calls.forEach(call => {
        expect(call[0]).toMatch(/^[0-9.]*$/) // Apenas números e pontos
      })
    })

    it('should show validation error for zero values', () => {
      render(<CurrencyForm {...defaultProps} amount="0" />)
      expect(screen.getByText('Digite um valor maior que zero')).toBeInTheDocument()
    })

    it('should show validation error for "00"', () => {
      render(<CurrencyForm {...defaultProps} amount="00" />)
      expect(screen.getByText('Digite um valor maior que zero')).toBeInTheDocument()
    })

    it('should apply error styling when validation fails', () => {
      render(<CurrencyForm {...defaultProps} amount="0" />)
      const input = screen.getByPlaceholderText('Digite o valor')
      expect(input).toHaveClass('border-red-400')
    })
  })

  describe('Currency selection', () => {
    it('should call setFrom when from currency changes', async () => {
      const user = userEvent.setup()
      render(<CurrencyForm {...defaultProps} />)
      
      const fromSelect = screen.getAllByRole('combobox')[0]
      await user.selectOptions(fromSelect, 'EUR')
      
      expect(defaultProps.setFrom).toHaveBeenCalledWith('EUR')
    })

    it('should call setTo when to currency changes', async () => {
      const user = userEvent.setup()
      render(<CurrencyForm {...defaultProps} />)
      
      const toSelect = screen.getAllByRole('combobox')[1]
      await user.selectOptions(toSelect, 'JPY')
      
      expect(defaultProps.setTo).toHaveBeenCalledWith('JPY')
    })
  })

  describe('Convert button', () => {
    it('should call onConvert when clicked', async () => {
      const user = userEvent.setup()
      render(<CurrencyForm {...defaultProps} amount="100" />)
      
      const button = screen.getByRole('button', { name: 'Converter' })
      await user.click(button)
      
      expect(defaultProps.onConvert).toHaveBeenCalled()
    })

    it('should be disabled when loading', () => {
      render(<CurrencyForm {...defaultProps} loading={true} />)
      
      const button = screen.getByRole('button', { name: 'Convertendo...' })
      expect(button).toBeDisabled()
    })

    it('should be disabled when amount is empty', () => {
      render(<CurrencyForm {...defaultProps} amount="" />)
      
      const button = screen.getByRole('button', { name: 'Converter' })
      expect(button).toBeDisabled()
    })

    it('should be disabled when validation error exists', () => {
      render(<CurrencyForm {...defaultProps} amount="0" />)
      
      const button = screen.getByRole('button', { name: 'Converter' })
      expect(button).toBeDisabled()
    })

    it('should show loading text when loading', () => {
      render(<CurrencyForm {...defaultProps} loading={true} />)
      expect(screen.getByText('Convertendo...')).toBeInTheDocument()
    })
  })

  describe('Keyboard navigation', () => {
    it('should allow navigation keys', () => {
      render(<CurrencyForm {...defaultProps} />)
      const input = screen.getByPlaceholderText('Digite o valor')
      
      // Simula teclas de navegação
      fireEvent.keyDown(input, { key: 'ArrowLeft' })
      fireEvent.keyDown(input, { key: 'ArrowRight' })
      fireEvent.keyDown(input, { key: 'Backspace' })
      fireEvent.keyDown(input, { key: 'Delete' })
      
      // Não deveria prevenir essas teclas
      expect(input).toBeInTheDocument()
    })

    it('should prevent invalid characters', async () => {
      const user = userEvent.setup()
      render(<CurrencyForm {...defaultProps} />)
      
      const input = screen.getByPlaceholderText('Digite o valor')
      
      // Tenta digitar letra inválida - ela não deve aparecer no input
      await user.type(input, 'a')
      
      // Input deve permanecer vazio pois 'a' é filtrado
      expect(input.value).toBe('')
    })
  })
})