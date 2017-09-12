import React from 'react';
import { bool } from 'prop-types';
import styles from './index.css';

Loading.propTypes = {
  active: bool,
};

function Loading({ active = false }) {
  if (!active) {
    return null;
  }
  return (
    <div className={styles.loading}>
      <div />
    </div>
  );
}

export default Loading;
