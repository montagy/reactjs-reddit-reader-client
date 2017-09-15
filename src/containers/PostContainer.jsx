import React, { Component } from 'react';
import Post from '../pages/Post';
import fetchReddit from '../api';

class PostContainer extends Component {
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
    const {...rest} = this.state;
    return (
      <Post {...rest} />
    );
  }
}
export default PostContainer;
