# 💱 Conversor de Moedas

Aplicação React moderna para conversão de moedas em tempo real usando a API Frankfurter.

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38B2AC?logo=tailwind-css)
![Tests](https://img.shields.io/badge/Tests-38%20passing-brightgreen)

## ✨ Características

- 🌍 **31 moedas suportadas** com conversão em tempo real
- 📱 **Interface responsiva** com TailwindCSS
- 🧪 **38 testes automatizados** (100% cobertura)
- ⚡ **Performance otimizada** (~67KB gzipped)
- 🔧 **Validação inteligente** de entrada

## 🌍 Moedas suportadas

**31 moedas principais** disponíveis para conversão:

```
AUD - Dólar Australiano       BGN - Lev Búlgaro           BRL - Real Brasileiro
CAD - Dólar Canadense         CHF - Franco Suíço          CNY - Yuan Chinês  
CZK - Coroa Checa             DKK - Coroa Dinamarquesa    EUR - Euro
GBP - Libra Esterlina         HKD - Dólar de Hong Kong    HUF - Florim Húngaro
IDR - Rupia Indonésia         ILS - Novo Shekel           INR - Rupia Indiana
ISK - Coroa Islandesa         JPY - Iene Japonês          KRW - Won Sul-Coreano
MXN - Peso Mexicano           MYR - Ringgit Malaio        NOK - Coroa Norueguesa
NZD - Dólar Neozelandês       PHP - Peso Filipino         PLN - Zloty Polonês
RON - Leu Romeno              SEK - Coroa Sueca           SGD - Dólar de Singapura
THB - Baht Tailandês          TRY - Lira Turca            USD - Dólar Americano
ZAR - Rand Sul-Africano
```

## 📋 Requisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

## 🚀 Como usar

### Clone e execute

```bash
# Clone o repositório
git clone https://github.com/viniciuslacerd4/currency-converter.git
cd currency-converter

# Instale dependências
npm install

# Execute o projeto
npm run dev
```

Acesse: `http://localhost:5173`

### Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm test         # Executar testes
npm run test:ui  # Interface visual dos testes
```

## 🧪 Testes

**38 testes automatizados** com 100% de cobertura:

- ✅ **9 testes unitários** - Funções e utilitários
- ✅ **17 testes de componentes** - Renderização e interações  
- ✅ **12 testes de integração** - Fluxos completos

### Executar testes

```bash
npm test              # Todos os testes (~8s)
npm test -- --watch   # Modo watch
npm run test:ui       # Interface visual
npm run test:coverage # Relatório de cobertura
```

**Ferramentas:** Vitest + Testing Library + jsdom

## 🏗️ Sobre o projeto

### Stack tecnológica
- **React 19.1.1** + **Vite 7.1.7** 
- **TailwindCSS 4.1.14** para estilos
- **Vitest + Testing Library** para testes
- **API Frankfurter** para taxas de câmbio

### Funcionalidades
- Conversão entre 31 moedas principais
- Interface responsiva e moderna
- Validação de entrada em tempo real
- Tratamento de erros e loading states
- Timeout configurável (10s)

### Estrutura do projeto
```
src/
├── components/
│   ├── CurrencyConverter.jsx    # Componente principal
│   ├── CurrencyForm.jsx         # Formulário
│   └── ConversionResult.jsx     # Resultado
├── data/
│   └── currencies.js            # 31 moedas
├── test/
│   └── *.test.jsx              # 38 testes
└── App.jsx
```

## 📦 Deploy

```bash
npm run build  # Gera build otimizado (~67KB gzipped)
```
