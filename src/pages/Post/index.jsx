import React from 'react';
import PostView from '../../molecules/PostView';

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
    this.fetchData(this.props.location.pathname.split('/p')[1]);
  }
  fetchData(path) {
    fetch(`https://www.reddit.com${path}.json`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          loading: false,
          post: json[0].data.children[0].data,
          comments: json[1].data.children.map(child => child.data),
        });
      })
      .catch(err => {
        console.log(err);
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
