import React from 'react';
import styles from './index.css';
import InlineForm from '../../molecules/InlineForm';
import Button from '../../atoms/Button';
import { observer, inject } from 'mobx-react';

//TODO defaultHome 的有效性检测
@inject('config', 'reddits')
@observer
class Home extends React.Component {
  state = {
    hour: '',
  };
  handleHour = e => {
    this.setState({ hour: +e.target.value });
  };
  render() {
    const {
      defaultHome,
      setDefaultHome,
      cachedHour,
      setCachedHour,
      fontSize,
      setFontSize,
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
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setCachedHour(this.state.hour);
                }}
                className={styles.lineForm}
              >
                <input
                  type="text"
                  onChange={this.handleHour}
                  value={this.state.hour}
                />
                <button type="submit">提交</button>
              </form>
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
                onChange={e => {
                  setFontSize(e.target.value);
                }}
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
