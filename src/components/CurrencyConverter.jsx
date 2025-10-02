import { useState } from "react";
import CurrencyForm from "./CurrencyForm";
import ConversionResult from "./ConversionResult";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("BRL");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    setResult(null);
    setError(null);  
  };

  const handleFromChange = (newFrom) => {
    setFrom(newFrom);
    setResult(null); 
    setError(null);  
  };

  const handleToChange = (newTo) => {
    setTo(newTo);
    setResult(null); 
    setError(null);  
  };

  const handleConvert = async () => {
    if (!amount || amount <= 0) {
      alert("Digite um valor válido.");
      return;
    }

    if (from === to) {
      alert("Selecione moedas diferentes para conversão.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.frankfurter.app';
      const apiTimeout = import.meta.env.VITE_API_TIMEOUT || 10000;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiTimeout);
      
      const response = await fetch(
        `${apiBaseUrl}/latest?amount=${amount}&from=${from}&to=${to}`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Erro ao buscar taxa de câmbio');
      }

      const data = await response.json();
      
      const converted = data.rates[to];
      setResult(converted.toFixed(2));
      
    } catch (err) {
      setError('Erro ao converter moeda. Tente novamente.');
      console.error('Erro na conversão:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition duration-300">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        💱 Conversor de Moedas
      </h1>

      <CurrencyForm
        amount={amount}
        from={from}
        to={to}
        setAmount={handleAmountChange}
        setFrom={handleFromChange}
        setTo={handleToChange}
        onConvert={handleConvert}
        loading={loading}
      />

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-4 text-center text-blue-600">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
          Convertendo...
        </div>
      )}

      {result && !loading && !error && (
        <ConversionResult amount={amount} from={from} to={to} result={result} />
      )}
    </div>
  );
}
