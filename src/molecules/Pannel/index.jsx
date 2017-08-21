import React from 'react';
import styles from './index.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import createHistory from 'history/createHashHistory';

class Pannel extends React.Component {
  state = {
    value: '',
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const history = createHistory();
    history.push(`/r/${this.state.value}`);
    this.setState({
      value: '',
    });
  };
  render() {
    const {
      reddits,
      addReddit,
      deleteReddit,
      active,
      handleToggle,
      ...props
    } = this.props;
    const list = Object.keys(reddits).map((name, index) =>
      <Link to={`/r/${name}`} key={index} className={styles.link}>{name}</Link>,
    );
    const cls = classNames({
      [styles.pannel]: true,
      [styles.active]: active,
    });
    return (
      <div className={cls} {...props}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="reddit"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <button>Add</button>
          </form>
          {list}
        </div>
        <button onClick={handleToggle} className={styles.toggle}>
          <span className={active ? styles.firstBar : ''} />
          <span style={{ opacity: active ? '0' : '1' }} />
          <span className={active ? styles.lastBar : ''} />
        </button>
      </div>
    );
  }
}

export default Pannel;
