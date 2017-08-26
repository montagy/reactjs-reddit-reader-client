import React from 'react';
import { Link } from 'react-router-dom';
import unescape from 'lodash/unescape';
import styles from './index.css';
import Author from '../../atoms/Author';

class Summary extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.data.id !== nextProps.data.id;
  }
  render() {
    const {
      data: {
        permalink,
        domain,
        title,
        author,
        created_utc,
        num_comments,
        url,
      },
      ...rest
    } = this.props;
    const escaped = unescape(title);
    let realTitle = domain.slice(0, 4) === 'self'
      ? <Link to={`/p${permalink}`}>
          {escaped}
        </Link>
      : <a href={url} target="_blank">{escaped}</a>;
    return (
      <div className={styles.wrapper} {...rest}>
        <header>
          {realTitle}
          <span>{domain}</span>
        </header>
        <Author time={created_utc} name={author} />
        <footer>
          <Link to={`/p${permalink}`}>{`${num_comments || ''}留言`}</Link>
        </footer>
      </div>
    );
  }
}

export default Summary;
