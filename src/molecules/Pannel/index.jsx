import React from 'react';
import styles from './index.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Pannel extends React.Component {
  state = {
    value: '',
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.context.router;
    history.push(`/r/${this.state.value}`);
    this.setState({
      value: '',
    });
  };
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired
    }).isRequired
  }
  render() {
    const {
      reddits,
      active,
      ...props
    } = this.props;
    const list = Object.keys(reddits).map((name, index) => {
      const realName = name === 'Home' ? '/' : `/r/${name}`;
      return (
        <Link
          to={{ pathname: realName }}
          key={index}
          className={styles.link}
        >
          {name}
        </Link>
      );
    });
    const cls = classNames({
      [styles.pannel]: true,
      [styles.active]: active,
    });
    return (
      <div className={cls} {...props}>
        <main>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="reddit"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <button
              type="submit"
              className={styles.btn}>GO</button>
          </form>
          <div className={styles.lists}>
            {list}
            <p>This is a sentence.</p>
          </div>
        </main>
      </div>
    );
  }
}

export default Pannel;
