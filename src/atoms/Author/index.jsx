import React from 'react';
import styles from './index.css';
import { timeAgo } from '../../utils';

const Author = ({ name, time }) => {
  const ago = timeAgo(time);
  return (
    <div className={styles.author}>
      {name}
      <span>
        发表于{ago.day > 1
          ? `${ago.day}天`
          : ago.hour ? `${ago.hour}小时` : `${ago.min}分钟`}前
      </span>
    </div>
  );
};

export default Author;
