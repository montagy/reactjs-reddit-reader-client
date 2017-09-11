import React from 'react';
import styles from './index.css';

const Home = ({defaultHome, cachedHour }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p>设置你的首页: {defaultHome}</p>
        <p>缓存的有效时间: {cachedHour}</p>
      </div>
    </div>
  );
};

export default Home;
