import React from 'react';
import styles from './index.css';

function Home({ defaultHome, cachedHour, setDefaultHome }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>设置你的首页: <span>{defaultHome}</span></div>
        <p>缓存的有效时间: {cachedHour}</p>
      </div>
    </div>
  );
}

export default Home;
