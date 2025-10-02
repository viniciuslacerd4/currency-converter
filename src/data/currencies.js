export const currencies = {
  "AUD": "Dólar Australiano",
  "BGN": "Lev Búlgaro",
  "BRL": "Real Brasileiro",
  "CAD": "Dólar Canadense",
  "CHF": "Franco Suíço",
  "CNY": "Yuan Chinês",
  "CZK": "Coroa Checa",
  "DKK": "Coroa Dinamarquesa",
  "EUR": "Euro",
  "GBP": "Libra Esterlina",
  "HKD": "Dólar de Hong Kong",
  "HUF": "Florim Húngaro",
  "IDR": "Rupia Indonésia",
  "ILS": "Novo Shekel Israelense",
  "INR": "Rupia Indiana",
  "ISK": "Coroa Islandesa",
  "JPY": "Iene Japonês",
  "KRW": "Won Sul-Coreano",
  "MXN": "Peso Mexicano",
  "MYR": "Ringgit Malaio",
  "NOK": "Coroa Norueguesa",
  "NZD": "Dólar Neozelandês",
  "PHP": "Peso Filipino",
  "PLN": "Zloty Polonês",
  "RON": "Leu Romeno",
  "SEK": "Coroa Sueca",
  "SGD": "Dólar de Singapura",
  "THB": "Baht Tailandês",
  "TRY": "Lira Turca",
  "USD": "Dólar Americano",
  "ZAR": "Rand Sul-Africano"
};

export const getCurrencyCodes = () => Object.keys(currencies);

export const getCurrencyName = (code) => currencies[code] || code;