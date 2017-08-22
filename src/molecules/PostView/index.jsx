import React from 'react';
import { htmlDecode } from '../../utils';
import styles from './index.css';
import isEmpty from 'lodash/isEmpty';

const Comment = ({ comment }) => {
  if (isEmpty(comment)) return null;
  const nestComments =
    comment.replies.data &&
    comment.replies.data.children.map(child => child.data) || [];
  const nestCommentsView = nestComments.map((cm, i) => {
    return <Comment key={i} comment={cm} />;
  });
  return (
    <div className={styles.comment}>
      <p>author:{comment.author}</p>
      <div
        dangerouslySetInnerHTML={{ __html: htmlDecode(comment.body_html) }}
      />
      {nestCommentsView}
    </div>
  );
};

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
