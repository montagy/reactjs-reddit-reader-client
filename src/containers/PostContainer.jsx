import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PostView from '../molecules/PostView';
import Loading from '../atoms/Loading';

@inject('post')
@observer
class PostContainer extends Component {
  componentWillMount() {
    this.props.post.setId(this.props.match.params.comment);
  }
  render() {
    const { loading, post, comments } = this.props.post;
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
}
export default PostContainer;
