export default function ConversionResult({ amount, from, to, result }) {
  return (
    <div 
      data-testid="conversion-result"
      className="mt-6 p-5 border rounded-xl bg-green-100 text-center shadow-md"
    >
      <p className="text-lg text-gray-700">
        {amount} <strong>{from}</strong> =
      </p>
      <p className="text-3xl font-extrabold text-green-700 mt-1">
        {result} {to}
      </p>
    </div>
  );
}
