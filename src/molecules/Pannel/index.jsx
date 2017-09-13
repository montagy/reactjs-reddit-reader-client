import React from 'react';
import { arrayOf, string, bool } from 'prop-types';
import styles from './index.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

Pannel.propTypes = {
  reddits: arrayOf(string),
  active: bool,
};
function Pannel ({ reddits, active, ...props }) {
  const list = reddits.map((name) => {
    const realName = name === 'Home' ? '/' : `/${name}`;
    return (
      <Link to={{ pathname: realName }} key={name} className={styles.link}>
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

export default Pannel;
