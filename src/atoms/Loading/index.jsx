import React from 'react';
import { bool } from 'prop-types';
import styles from './index.css';
import { toggle } from '../../hocs/toggle';

Loading.propTypes = {
  active: bool,
};

function Loading() {
  return (
    <div className={styles.loading}>
      <div />
    </div>
  );
}

export default toggle(Loading);
