import React from 'react';
import { htmlDecode } from '../../utils';
import styles from './index.css';

const PostView = ({ post, comments }) => {
  const cms = comments.map((cm, i) => {
    return (
      <div key={i} className={styles.comment}>
        <p>author:{cm.author}</p>
        <p dangerouslySetInnerHTML={{ __html: htmlDecode(cm.body_html)}} />
      </div>
    );
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.post}>
        <p>{post.title}</p>
        <p dangerouslySetInnerHTML={{ __html: htmlDecode(post.selftext_html) }} />
      </div>
      {comments.length
        ? <div className={styles.content}>
            <p>Comment</p>
            {cms}
          </div>
        : <div>No comment</div>}
    </div>
  );
};

export default PostView;
