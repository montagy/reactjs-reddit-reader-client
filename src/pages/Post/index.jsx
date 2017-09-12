import React from 'react';
import PostView from '../../molecules/PostView';
import Loading from '../../atoms/Loading';
import fetchReddit from '../../api';

class Post extends React.Component {
  state = {
    loading: true,
    post: {},
    comments: [],
  };
  componentDidMount() {
    fetchReddit({ path: this.props.location.pathname.slice(2)}).then(json => {
      this.setState({
        loading: false,
        post: json[0].data.children[0].data,
        comments: json[1].data.children.map(child => child.data),
      });
    });
  }
  render() {
    return (
      <section>
        {this.state.loading
          ? <Loading />
          : <PostView post={this.state.post} comments={this.state.comments} />};
      </section>
    );
  }
}

export default Post;
