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
    const value = this.state.value.replace(/\s/g, '');
    history.push(`/r/${value}`);
    this.setState({
      value: '',
    });
  };
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };
  componentDidUpdate() {
    if (this.props.active) {
      this.input.focus();
    }
  }
  render() {
    const { reddits, active, ...props } = this.props;
    const list = Object.keys(reddits).map((name, index) => {
      const realName = name === 'Home' ? '/' : `/r/${name}`;
      return (
        <Link to={{ pathname: realName }} key={index} className={styles.link}>
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
              ref={ref => this.input = ref}
            />
            <button type="submit" className={styles.btn}>GO</button>
          </form>
          <div className={styles.lists}>
            {list}
          </div>
        </main>
        <footer>
          This is a sentence.
        </footer>
      </div>
    );
  }
}

export default Pannel;
