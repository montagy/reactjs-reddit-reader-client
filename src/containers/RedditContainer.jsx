import React from 'react';
import RedditMain from '../pages/SubReddit';
import { inject, observer } from 'mobx-react';
import debounce from 'lodash/debounce';

@inject('config', 'redditStore', 'reddits')
@observer
class RedditContainer extends React.Component {
  directTo = reddit => {
    this.props.history.push(`/${reddit}`);
  };
  handleScroll = debounce(
    e => {
      const showFixedHeader = this.props.redditStore.showFixedHeader;
      e.preventDefault();
      this.props.redditStore.mergeSummaries();
      if (
        (e.target.scrollingElement.scrollTop > 200 && !showFixedHeader) ||
        (e.target.scrollingElement.scrollTop <= 200 && showFixedHeader)
      ) {
        this.props.redditStore.toggleHeader();
      }
    },
    200,
    { leading: true },
  );
  componentWillMount() {
    this.props.redditStore.update(this.props.sub);
  }
  componentWillReceiveProps(nextProps) {
    this.props.redditStore.update(nextProps.sub);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scroll(0, 0);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(e) {
    e.preventDefault();
    throttle();
  }
  render() {
    const {
      loading,
      showFixedHeader,
      error,
      summaries,
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
