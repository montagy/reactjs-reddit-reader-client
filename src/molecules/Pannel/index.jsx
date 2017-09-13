import React from 'react';
import { arrayOf, string } from 'prop-types';
import styles from './index.css';
import { Link } from 'react-router-dom';
import { toggleWith } from '../../hocs/toggle';

Pannel.propTypes = {
  reddits: arrayOf(string),
};
function Pannel({ reddits, ...props }) {
  const list = reddits.map(name => {
    const realName = name === 'Home' ? '/' : `/${name}`;
    return (
      <Link to={{ pathname: realName }} key={name} className={styles.link}>
        {name}
      </Link>
    );
  });
  return (
    <div className={styles.pannel} {...props}>
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

export default toggleWith(Pannel, {
  className: styles.pannel + ' ' + styles.active,
});
