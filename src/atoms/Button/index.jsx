import React from 'react';
import styles from './index.css';

const Button = ({ children, ...props }) =>
  <button type="submit" className={styles.btn} {...props}>{children}</button>;

export default Button;
