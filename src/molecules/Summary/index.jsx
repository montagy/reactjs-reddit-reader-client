import React from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils';
import styles from './index.css';

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
    const dayAndHour = timeAgo(created_utc);
    let realTitle = domain.slice(0, 4) === 'self'
      ? <Link to={`/p${permalink}`}>
          {title}
        </Link>
      : <a href={url} target="_blank">{title}</a>;
    return (
      <div className={styles.wrapper} {...rest}>
        <header>
          {realTitle}
          <span>{domain}</span>
        </header>
        <div>
          <p>
            {author}
            <span>
              {`创建于${dayAndHour.day > 0
                ? dayAndHour.day + '天'
                : ''} ${dayAndHour.hour}小时前`}
            </span>
          </p>
        </div>
        <footer>
          <Link to={`/p${permalink}`}>{`${num_comments || ''}留言`}</Link>
        </footer>
      </div>
    );
  }
}

export default Summary;
