import React from 'react';
import PostView from '../../molecules/PostView';
import fetchReddit from '../../api';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      post: {},
      comments: [],
    };
  }
  componentDidMount() {
    fetchReddit(this.props.location.pathname.slice(2)).then(json => {
      this.setState({
        loading: false,
        post: json[0].data.children[0].data,
        comments: json[1].data.children.map(child => child.data),
      });
    });
  }
  render() {
    if (this.state.loading) {
      return <p>loading...</p>;
    }
    return <PostView post={this.state.post} comments={this.state.comments} />;
  }
}

export default Post;
