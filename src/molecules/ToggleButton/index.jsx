import React from 'react';
import styles from './index.css';
import classNames from 'classnames';

//TODO use svg icon instead
const ToggleButton = ({ active, handleToggle }) => {
  const cls = classNames({
    [styles.toggle]: true,
    [styles.active]: active,
  });
  return (
    <div onClick={handleToggle} className={cls}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default ToggleButton;
