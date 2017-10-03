import React from 'react';
import styles from './index.css';
import InlineForm from '../../molecules/InlineForm';
import Button from '../../atoms/Button';
import { observer, inject } from 'mobx-react';

@inject('config', 'reddits')
@observer
class Home extends React.Component {
  hourSubmit = e => {
    this.props.config.setCachedHour(e.target.value);
  };
  fontSizeSubmit = e => {
    this.props.config.setFontSize(e.target.value);
  };
  render() {
    const {
      defaultHome,
      setDefaultHome,
      cachedHour,
      fontSize,
    } = this.props.config;
    const { cleanCache } = this.props.reddits;
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
              <input
                type="range"
                max={12}
                min={0}
                step={1}
                value={cachedHour}
                onChange={this.hourSubmit}
              />
            </div>
          </div>
          <div>
            <p>字体大小</p>
            <div>
              <label>{fontSize}</label>
              <input
                type="range"
                max={5}
                min={1}
                step={1}
                value={fontSize}
                onChange={this.fontSizeSubmit}
              />
            </div>
          </div>
          <div>
            <Button onClick={cleanCache}>清空缓存</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
