import { currencies } from '../data/currencies';
import { useState, useEffect } from 'react';

export default function CurrencyForm({ amount, from, to, setAmount, setFrom, setTo, onConvert, loading = false }) {
  const [validationError, setValidationError] = useState('');

  const validateAmount = (value) => {
    if (!value || value.trim() === '') {
      return '';
    }
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      return 'Digite um valor válido';
    }
    
    if (numValue <= 0) {
      return 'Digite um valor maior que zero';
    }
    
    if (value === '00' || value === '0.00' || value === '0,00') {
      return 'Digite um valor maior que zero';
    }
    
    return '';
  };

  useEffect(() => {
    setValidationError(validateAmount(amount));
  }, [amount]);

  return (
    <div className="space-y-4">
      <div>
        <input
        type="text"
        value={amount}
        onChange={(e) => {
          let value = e.target.value;
          
          value = value.replace(/[^0-9.,]/g, '');
          
          value = value.replace(',', '.');
          
          const parts = value.split('.');
          if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
          }
          
          setAmount(value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'Enter' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            return;
          }
          
          if (!/[0-9.,]/.test(e.key)) {
            e.preventDefault();
          }
          
          if ((e.key === '.' || e.key === ',') && (e.target.value.includes('.') || e.target.value.includes(','))) {
            e.preventDefault();
          }
        }}
        placeholder="Digite o valor"
        className={`border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition ${
          validationError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300'
        }`}
      />
      
      {validationError && (
        <p className="text-red-500 text-sm mt-1">
          {validationError}
        </p>
      )}
      </div>

      <div className="flex gap-3">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border border-gray-300 p-3 flex-1 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
        >
          {Object.entries(currencies).map(([code]) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border border-gray-300 p-3 flex-1 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
        >
          {Object.entries(currencies).map(([code]) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onConvert}
        disabled={loading || validationError || !amount}
        className={`px-6 py-3 rounded-lg w-full font-medium shadow-md transition ${
          loading || validationError || !amount
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90'
        } text-white`}
      >
        {loading ? 'Convertendo...' : 'Converter'}
      </button>
    </div>
  );
}
