import React from 'react';
import { htmlDecode } from '../../utils';
import styles from './index.css';

const PostView = ({ post, comments }) => {
  const cms = comments.map((cm, i) => {
    return (
      <div key={i}>
        <p>author:{cm.author}</p>
        <p dangerouslySetInnerHTML={{ __html: htmlDecode(cm.body_html)}} />
      </div>
    );
  });
  return (
    <div>
      <p>{post.title}</p>
      <p dangerouslySetInnerHTML={{ __html: htmlDecode(post.selftext_html) }} />
      {comments.length
        ? <div>
            <p>Comment</p>
            {cms}
          </div>
        : <div>No comment</div>}
    </div>
  );
};

export default PostView;
