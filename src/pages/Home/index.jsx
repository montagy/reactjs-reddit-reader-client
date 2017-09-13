import React from 'react';
import { string, number, func } from 'prop-types';
import styles from './index.css';
import InlineForm from '../../molecules/InlineForm'

Home.propTypes = {
  defaultHome: string,
  setDefaultHome: func,
  cachedHour: number,
}
//TODO defaultHome 的有效性检测
function Home({ defaultHome, cachedHour, setDefaultHome }) {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1>设置</h1>
      </header>
      <div className={styles.container}>
        <div>
          <p>首页: {defaultHome}</p>
          <InlineForm onSubmit={setDefaultHome} />
        </div>
        <div>
          <p>缓存{cachedHour}小时</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
