import React from 'react';

const PostView = ({ post, comments }) => {
  return (
    <div>
      <p>Post</p>
      <p>{post.selftext}</p>
      <p>Comment</p>
      <p>{comments.length}</p>
    </div>
  );
};

export default PostView;
