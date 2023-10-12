/* eslint-disable react/prop-types */
import './footer.css';
export default function Footer({ lastUpdatedTime }) {
   return (
      <footer>
         <p>
            <a href="https://samieyong.github.io/about_me/">
               <img src="icon.png" className="logo" />
            </a>
            {lastUpdatedTime ? (
               <span>Mid-market rates{lastUpdatedTime}</span>
            ) : (
               <span>Samie Global...the whole world</span>
            )}
         </p>
      </footer>
   );
}
