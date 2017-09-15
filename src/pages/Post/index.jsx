import React from 'react';
import { bool, object, array } from 'prop-types';
import PostView from '../../molecules/PostView';
import Loading from '../../atoms/Loading';

Post.propTypes = {
  loading: bool,
  post: object,
  comments: array,
};
function Post({ loading, post, comments }) {
  return (
    <section>
      <div style={{ position: 'fixed', left: '50%', top: '50%' }}>
        <Loading
          active={loading}
          style={{ width: '5em', height: '5em', borderWidth: '5px' }}
        />
      </div>
      <PostView post={post} comments={comments} />
    </section>
  );
}

export default Post;
