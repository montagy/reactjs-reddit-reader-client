import React from 'react';
import styles from './index.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class Pannel extends React.Component {
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
