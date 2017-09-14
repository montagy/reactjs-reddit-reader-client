import React from 'react';
import { string, func } from 'prop-types';
import styles from './index.css';

Input.propTypes = {
  value: string,
  onChange: func,
};
export default function Input({ value, onChange, ...props }) {
  return (
    <input
      onChange={onChange}
      value={value}
      className={styles.formInput}
      {...props}
    />
  );
}
