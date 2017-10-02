import React from 'react';
import styles from './index.css';
import { Link } from 'react-router-dom';
import { toggleWith } from '../../hocs/toggle';
import FixedBottom from '../../templates/FixedBottom';
import { Button, StatusButton } from '../../atoms';

function Pannel({ reddits, addReddit, cachedHour, ...props }) {
  const list = reddits.keys().map(name => {
    const url = `/${name}`;
    return (
      <div className={styles.link} key={name}>
        <Link to={{ pathname: url }}>
          {name}
        </Link>
        <StatusButton
          reddit={reddits.get(name)}
          sub={name}
          cachedHour={cachedHour}
          addReddit={addReddit}
        />
      </div>
    );
  });
  const footer = (
    <div>
      <Button><Link to="/site/config">设置</Link></Button>
    </div>
  );
  return (
    <FixedBottom
      className={styles.pannel}
      footer={footer}
      {...props}
    >
      <div className={styles.lists}>
        {list}
      </div>
    </FixedBottom>
  );
}

export default toggleWith(Pannel, {
  className: styles.pannel + ' ' + styles.active,
});
