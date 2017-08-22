import React from 'react';
import { htmlDecode } from '../../utils';
import styles from './index.css';

const Comment = ({ comment }) =>
  <div className={styles.comment}>
    <p>author:{comment.author}</p>
    <div dangerouslySetInnerHTML={{ __html: htmlDecode(comment.body_html) }} />
  </div>;

const PostView = ({ post, comments }) => {
  const cms = comments.map((cm, i) => {
    return <Comment key={i} comment={cm} />;
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.post}>
        <header>{post.title}<span>{post.author}</span></header>
        <main
          dangerouslySetInnerHTML={{ __html: htmlDecode(post.selftext_html) }}
        />
      </div>
      <div className={styles.content}>
        <p>Comment</p>
        {comments.length ? cms : <div>No comment</div>}
      </div>
    </div>
  );
};

export default PostView;
