import React from 'react';
import { htmlDecode, timeAgo } from '../../utils';
import styles from './index.css';
import isEmpty from 'lodash/isEmpty';

const Author = ({ name, time }) => {
  const ago = timeAgo(time);
  return (
    <div className={styles.author}>
      {name}
      <span>发表于{ago.day > 1 ? `${ago.day}天` : `${ago.hour}小时`}前</span>
    </div>
  );
};
const Comment = ({ comment }) => {
  if (isEmpty(comment)) return null;
  const nestComments =
    (comment.replies &&
      comment.replies.data &&
      comment.replies.data.children.map(child => child.data)) ||
    [];
  const nestCommentsView = nestComments.map((cm, i) => {
    return <Comment key={i} comment={cm} />;
  });
  return (
    <div className={styles.comment}>
      <Author name={comment.author} time={comment.created_utc} />
      <div
        dangerouslySetInnerHTML={{ __html: htmlDecode(comment.body_html) }}
      />
      {nestCommentsView}
    </div>
  );
};
const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <h1>{post.title}<span>{post.author}</span></h1>
      <main>
        <Author name={post.author} time={post.created_utc} />
        <div
          dangerouslySetInnerHTML={{ __html: htmlDecode(post.selftext_html) }}
        />
      </main>
    </div>
  );
};
const PostView = ({ post, comments }) => {
  const cms = comments.map((cm, i) => {
    return <Comment key={i} comment={cm} />;
  });
  return (
    <div className={styles.wrapper}>
      <Post post={post} />
      <div className={styles.content}>
        <p style={{ fontSize: '1.5em' }}>{comments.length}留言</p>
        {comments.length ? cms : <div>No comment</div>}
      </div>
    </div>
  );
};

export default PostView;
