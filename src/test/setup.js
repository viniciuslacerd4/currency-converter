import '@testing-library/jest-dom'

// Mock global fetch para os testes
global.fetch = vi.fn()

// Setup para limpar mocks após cada teste
afterEach(() => {
  vi.clearAllMocks()
})