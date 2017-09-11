import React from 'react';
import styles from './index.css';

const Button = ({ children }) =>
  <button type="submit" className={styles.btn}>{children}</button>;

export default Button;
