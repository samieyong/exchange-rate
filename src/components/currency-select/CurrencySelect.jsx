/* eslint-disable react/prop-types */
import './currency-select.css';

export default function CurrencySelect({
   currency,
   setCurrency,
   currencyList,
}) {
   return (
      <select
         className="select"
         value={currency}
         onChange={(e) => setCurrency(e.target.value)}
      >
         {Object.entries(currencyList).map(([key, value]) => (
            <option key={key} value={key}>
               {key}: {value}
            </option>
         ))}
      </select>
   );
}
