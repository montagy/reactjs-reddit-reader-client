import React from 'react';
import unescape from 'lodash/unescape';
import { htmlDecode } from '../../utils';
import styles from './index.css';
import isEmpty from 'lodash/isEmpty';
import Author from '../../atoms/Author';

function Comment({ comment }) {
  if (
    isEmpty(comment) ||
    comment.count ||
    !comment.author ||
    !comment.created_utc
  )
    return null;
  const nestComments =
    (comment.replies &&
      comment.replies.data &&
      comment.replies.data.children.map(child => child.data)) ||
    [];
  const nestCommentsView = nestComments.map(cm => {
    return <Comment key={cm.id} comment={cm} />;
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
}
function Post({ post }) {
  return (
    <div className={styles.post}>
      <h1>
        <a href={post.url} target="_blank">{unescape(post.title)}</a>
        <span>{post.domain}</span>
      </h1>
      <main>
        <Author name={post.author} time={post.created_utc} />
        {post.selftext_html &&
          <div
            dangerouslySetInnerHTML={{ __html: htmlDecode(post.selftext_html) }}
          />}
      </main>
    </div>
  );
}

function PostView({ post, comments }) {
  const cms = comments.map((cm, i) => {
    return <Comment key={i} comment={cm} />;
  });
  return (
    <div className={styles.wrapper}>
      <Post post={post} />
      <div className={styles.content}>
        <p style={{ fontSize: '1.5em' }}>{post.num_comments || 0}留言</p>
        {comments.length ? cms : <div>No comment</div>}
      </div>
    </div>
  );
}

export default PostView;
