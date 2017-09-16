import React from 'react';
import { func } from 'prop-types';
import styles from './index.css';
import { toggleWith } from '../../hocs/toggle';

ToggleButton.propTypes = {
  handleToggle: func,
};
//TODO use svg icon instead
function ToggleButton(props) {
  return (
    <div className={styles.toggle} {...props}>
      <div />
      <div />
      <div />
    </div>
  );
}

export default toggleWith(ToggleButton, {
  className: styles.toggle + ' ' + styles.active,
});

