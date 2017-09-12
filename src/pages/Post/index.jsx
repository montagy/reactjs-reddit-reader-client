import React from 'react';
import PostView from '../../molecules/PostView';
import Loading from '../../atoms/Loading';
import fetchReddit from '../../api';

class RedditPost extends React.Component {
  state = {
    loading: true,
    post: {},
    comments: [],
  };
  componentDidMount() {
    fetchReddit({ pathPiece: [this.props.match.params.comment] }).then(json => {
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
        <Loading active={this.state.loading} />
        <PostView post={this.state.post} comments={this.state.comments} />
      </section>
    );
  }
}

export default RedditPost;
