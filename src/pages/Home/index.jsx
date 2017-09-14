import React from 'react';
import { string, number, func } from 'prop-types';
import InputRange from 'react-input-range';
import styles from './index.css';
import InlineForm from '../../molecules/InlineForm';
import '!style-loader!css-loader!react-input-range/lib/css/index.css';

Home.propTypes = {
  defaultHome: string,
  setDefaultHome: func,
  cachedHour: number,
  setFontSize: func.isRequired,
};
//TODO defaultHome 的有效性检测
function Home({
  defaultHome,
  cachedHour,
  setDefaultHome,
  fontSize,
  setFontSize,
}) {
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
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
              className={styles.lineForm}
            >
              <input type="text" />
              <button type="submit">提交</button>
            </form>
          </div>
        </div>
        <div>
          <p>字体大小</p>
          <div style={{ width: '50%' }}>
            <InputRange
              maxValue={5}
              minValue={1}
              value={fontSize}
              onChange={setFontSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
