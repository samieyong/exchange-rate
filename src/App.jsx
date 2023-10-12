import { useEffect, useState } from 'react';

import './index.css';
import InputForm from './components/input-form/InputForm';
import Display from './components/display/Display';
import Footer from './components/footer/Footer';
import CurrencySelect from './components/currency-select/CurrencySelect';

const host = 'https://v6.exchangerate-api.com/v6/93acd3f00001af08dba47465/';

function App() {
   const [baseCurrency, setBaseCurrency] = useState('USD');
   const [quoteCurrency, setQuoteCurrency] = useState('EUR');
   const [marketData, setMarketData] = useState({});
   const [lastUpdatedTime, setLastUpdatedTime] = useState('');
   const [currencyList, setCurrencyList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      async function getCurrencyList() {
         setIsLoading(true);
         setError('');
         try {
            // fetch currency list for select button
            const res = await fetch(`${host}codes`);
            const apiData = await res.json();
            let list = apiData.supported_codes;

            if (!apiData) {
               throw new Error('Unable to fecth Currency List');
            }

            list = list.reduce((obj, [abbreviation, value]) => {
               obj[abbreviation] = `${value}`;
               return obj;
            }, {});
            setCurrencyList(list);

            // fetch exchange rate with USD as base currency for graph and footer
            const res2 = await fetch(`${host}latest/USD`);
            const data2 = await res2.json();

            if (!data2) {
               throw new Error('Unable to fecth data for graph');
            }

            setMarketData({ price: 1, ...data2.conversion_rates });
            setLastUpdatedTime(data2.time_last_update_utc);
         } catch (err) {
            setError(err.message);
            console.error(err);
         } finally {
            setIsLoading(false);
         }
      }
      getCurrencyList();
   }, []);

   ////function to handle currency pair conversion ////
   async function handleConvert(e, price) {
      e.preventDefault();
      if (!price || isNaN(price)) return;
      if (baseCurrency === quoteCurrency) {
         alert('Currency Pair should be different');
         return;
      }
      setIsLoading(true);
      try {
         const res = await fetch(`${host}latest/${baseCurrency}`);
         const data = await res.json();
         setMarketData({ price: price, ...data.conversion_rates });
         setLastUpdatedTime(data.time_last_update_utc);
      } catch (err) {
         console.error(err);
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <>
         <main>
            <div className="container">
               <InputForm onConvert={handleConvert}>
                  <CurrencySelect
                     currencyList={currencyList}
                     currency={baseCurrency}
                     setCurrency={setBaseCurrency}
                  />
                  <span className="spin-icon">💫</span>
                  <CurrencySelect
                     currencyList={currencyList}
                     currency={quoteCurrency}
                     setCurrency={setQuoteCurrency}
                  />
               </InputForm>
               <Display
                  baseCurrency={baseCurrency}
                  quoteCurrency={quoteCurrency}
                  marketData={marketData}
                  isLoading={isLoading}
                  error={error}
               />
               <Footer lastUpdatedTime={lastUpdatedTime} />
            </div>
         </main>
      </>
   );
}

export default App;
