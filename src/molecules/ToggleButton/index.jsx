import React from 'react';
import styles from './index.css';
import classNames from 'classnames';

const ToggleButton = ({ active, handleToggle }) => {
  const cls = classNames({
    [styles.toggle]: true,
    [styles.active]: active,
  });
  return (
    <button onClick={handleToggle} className={cls}>
      <span className={active ? styles.firstBar : null} />
      <span className={active ? styles.sndBar : null} />
      <span className={active ? styles.lastBar : null} />
    </button>
  );
};

export default ToggleButton;
