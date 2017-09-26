import React from 'react';
import RedditMain from '../pages/SubReddit';
import { inject, observer } from 'mobx-react';

@inject('config', 'redditStore', 'reddits')
@observer
class RedditContainer extends React.Component {
  directTo = reddit => {
    this.props.history.push(`/${reddit}`);
  };
  componentWillMount() {
    this.props.redditStore.setCurrentReddit(this.props.sub);
  }
  componentWillReceiveProps(nextProps) {
    this.props.redditStore.setCurrentReddit(nextProps.sub);
  }
  componentDidMount() {
    window.addEventListener(
      'scroll',
      this.props.redditStore.handleScroll,
      false,
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scroll(0, 0);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.redditStore.handleScroll);
  }
  render() {
    const {
      summaries,
      loading,
      showFixedHeader,
      error,
    } = this.props.redditStore;
    const { sub } = this.props;
    return (
      <RedditMain
        summaries={summaries}
        loading={loading}
        showFixedHeader={showFixedHeader}
        error={error}
        onSubmit={this.directTo}
        sub={sub}
      />
    );
  }
}

export default RedditContainer;
