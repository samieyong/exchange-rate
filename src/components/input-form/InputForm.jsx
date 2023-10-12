/* eslint-disable react/prop-types */
import { useState } from 'react';
import './input-form.css';

export default function InputForm({ onConvert, children }) {
   const [price, setPrice] = useState('');

   return (
      <form className="input-form" onSubmit={(e) => onConvert(e, price)}>
         <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
         />
         <div className="currency-select-wrapper">{children}</div>
         <button>CONVERT</button>
      </form>
   );
}
