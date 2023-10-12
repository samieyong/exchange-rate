/* eslint-disable react/prop-types */
import './display.css';
import LineChart from '../chart/LineChart';
import LoadingPage from '../loading/LoadingPage';

export default function Display({
   baseCurrency,
   quoteCurrency,
   marketData,
   isLoading,
   error,
}) {
   const rate = marketData[quoteCurrency];
   const price = marketData.price;

   return (
      <section className="summary-wrapper">
         <div className="summary">
            {isLoading ? (
               <LoadingPage />
            ) : !error ? (
               <>
                  <h1>
                     {Number(rate * price).toFixed(2)}{' '}
                     <span className="conversion-result-abbr">
                        {quoteCurrency}
                     </span>
                  </h1>
                  <p>
                     {`1${baseCurrency} = ${Number(rate).toFixed(
                        4
                     )} ${quoteCurrency}`}
                  </p>
                  <p>{`1${quoteCurrency} = ${Number(1 / rate).toFixed(
                     4
                  )} ${baseCurrency}`}</p>
               </>
            ) : (
               <>
                  <h1>Welcome</h1>
                  <p>Unable to load data</p>
                  <p>Please check your internet connnection</p>
               </>
            )}
         </div>

         {/* Line Chart */}
         <div className="chart">
            <LineChart marketData={marketData} baseCurrency={baseCurrency} />
         </div>
      </section>
   );
}
