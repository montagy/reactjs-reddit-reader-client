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
      className,
      reddits,
      addReddit,
      deleteReddit,
      ...props
    } = this.props;
    const cls = classNames({
      [className]: true,
      [styles.pannel]: true,
    });
    const list = Object.keys(reddits).map((name, index) =>
      <Link to={`/r/${name}`} key={index} className={styles.link}>{name}</Link>,
    );
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
      </div>
    );
  }
}

export default Pannel;
