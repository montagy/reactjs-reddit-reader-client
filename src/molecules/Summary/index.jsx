import React from 'react';
import { Link } from 'react-router-dom';

const Summary = ({ data, ...rest }) => {
  const style = {
    wrapper: {},
  };
  const { permalink, domain, subreddit, title, author, created, num_comments, url } = data;
  return (
    <div style={style.wrapper} {...rest}>
      <p>
        <Link to={`/p${permalink}`}>
          {title}
        </Link>
        <span>{domain}</span>
      </p>
      <ul>
        <li>
          <p>
            {author}
            <span>{`创建于${created}`}</span>
          </p>
        </li>
        <li>{`${num_comments}留言`}</li>
      </ul>
    </div>
  );
};

export default Summary;
