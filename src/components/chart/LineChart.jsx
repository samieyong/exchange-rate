/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function LineChart({ marketData, baseCurrency }) {
   const chartRef = useRef(null);
   const [chartData, setChartData] = useState({});

   useEffect(() => {
      // Update chartData when marketData changes
      setChartData({
         GBP: marketData.GBP,
         USD: marketData.USD,
         EUR: marketData.EUR,
         AUD: marketData.AUD,
         CAD: marketData.CAD,
         CHF: marketData.CHF,
         JPY: marketData.JPY,
         NGN: marketData.NGN,
         GHS: marketData.GHS,
         ZAR: marketData.ZAR,
         AED: marketData.AED,
         EGP: marketData.EGP,
         RUB: marketData.RUB,
         INR: marketData.INR,
      });
   }, [marketData]);

   useEffect(() => {
      // Create the chart only when chartData is updated
      if (Object.keys(chartData).length === 0) return; // Don't create the chart if chartData is empty

      const data = {
         labels: Object.keys(chartData),
         datasets: [
            {
               label: `${baseCurrency} Exchange`,
               data: Object.values(chartData),
               borderColor: 'rgba(75, 192, 192, 1)', // Line color
               borderWidth: 2, // Line width
               fill: true, // Fill area under the line
            },
         ],
      };

      const config = {
         type: 'line',
         data: data,
      };

      const myChart = new Chart(chartRef.current, config);

      return () => {
         myChart.destroy(); // Destroy the chart to prevent memory leaks
      };
   }, [chartData]); /*FIX: baseCurrency should not be included in dependency*/

   return (
      <div>
         <canvas ref={chartRef}></canvas>
      </div>
   );
}
