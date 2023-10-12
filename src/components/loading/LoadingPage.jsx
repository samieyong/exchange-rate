import styles from './LoadingPage.module.css';

const Loading = () => {
   return (
      <div className={styles.loading}>
         <div className={styles.spinner}></div>
         <p>Loading...</p>
      </div>
   );
};

export default Loading;
