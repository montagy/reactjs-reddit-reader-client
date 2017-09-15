import React from 'react';
import styles from './index.css';
import { toggle } from '../../hocs/toggle';

function Loading({ ...props }) {
  return <div className={styles.loading} {...props} />;
}

export default toggle(Loading);
