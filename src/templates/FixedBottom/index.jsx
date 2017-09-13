import React from 'react';
import { node } from 'prop-types';
import styles from './index.css';

FixedBottom.propTypes = {
  footer: node,
  children: node,
};
function FixedBottom({ children, footer, className, ...props }) {
  return (
    <div className={styles.wrapper + ' ' + className} {...props}>
      <main>
        {children}
      </main>
      <footer>
        {footer}
      </footer>
    </div>
  );
}

export default FixedBottom;
