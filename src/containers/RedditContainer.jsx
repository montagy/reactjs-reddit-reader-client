import React from 'react';
import RedditMain from '../pages/SubReddit';
import { inject, observer } from 'mobx-react';
import throttle from 'lodash/throttle';
import { observable, action } from 'mobx';

@inject('config', 'redditStore', 'reddits')
@observer
class RedditContainer extends React.Component {
  @observable showFixedHeader = false;
  @action
  toggleHeader() {
    this.showFixedHeader = !this.showFixedHeader;
  }
  directTo = reddit => {
    this.props.history.push(`/${reddit}`);
  };
  handleScroll = throttle(
    e => {
      const showFixedHeader = this.showFixedHeader;
      e.preventDefault();
      this.props.redditStore.mergeSummaries();
      if (
        (e.target.scrollingElement.scrollTop > 200 && !showFixedHeader) ||
        (e.target.scrollingElement.scrollTop <= 200 && showFixedHeader)
      ) {
        this.toggleHeader();
      }
    },
    300,
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
  render() {
    const { loading, error, summaries } = this.props.redditStore;
    const { sub } = this.props;
    return (
      <RedditMain
        summaries={summaries}
        loading={loading}
        showFixedHeader={this.showFixedHeader}
        error={error}
        onSubmit={this.directTo}
        sub={sub}
      />
    );
  }
}

export default RedditContainer;
