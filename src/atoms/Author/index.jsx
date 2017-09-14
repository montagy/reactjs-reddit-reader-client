import React from 'react';
import { number, string, bool } from 'prop-types';
import styles from './index.css';
import { timeAgo } from '../../utils';

Author.propTypes = {
  name: string.isRequired,
  time: number.isRequired,
  isSubmitter: bool,
};
Author.defaultProps = {
  name: '未知',
  time: new Date().getTime(),
};
function Author({ name = '', time, isSubmitter }) {
  const ago = timeAgo(time);
  return (
    <div className={styles.author}>
      {name}
      {isSubmitter && <span>[S]</span>}
      <span>
        发表于{ago.day > 1
          ? `${ago.day}天`
          : ago.hour ? `${ago.hour}小时` : `${ago.min}分钟`}前
      </span>
    </div>
  );
}

export default Author;
