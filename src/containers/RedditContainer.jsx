import React from 'react';
import throttle from 'lodash/throttle';
import isEmpty from 'lodash/isEmpty';
import shallowEqual from 'fbjs/lib/shallowEqual';
import fetchReddit from '../api';
import SubReddit from '../pages/SubReddit';
import { isScrollAtEnd, scrollToEnd, hoursAgo } from '../utils';

class RedditContainer extends React.Component {
  state = {
    loading: true,
    summaries: [],
    nextPageId: '',
    showFixedHeader: false,
    error: '',
  };
  toggleFixedHeader = () => {
    this.setState(prev => ({
      showFixedHeader: !prev.showFixedHeader,
    }));
  };
  handleScroll = throttle(
    e => {
      e.preventDefault();
      if (isScrollAtEnd() && !this.state.loading) {
        this.setState(
          {
            loading: true,
          },
          scrollToEnd,
        );
        fetchReddit({
          pathPiece: ['r', this.props.match.url.slice(1)],
          after: this.state.nextPageId,
        }).then(this.combineOld, this.updateReject);
      }
      if (
        e.target.scrollingElement.scrollTop > 200 &&
        !this.state.showFixedHeader
      ) {
        this.setState({ showFixedHeader: true });
      }
      if (
        e.target.scrollingElement.scrollTop <= 200 &&
        this.state.showFixedHeader
      ) {
        this.setState({ showFixedHeader: false });
      }
    },
    500,
    { leading: true },
  );
  updateResolve = shouldCombine => json => {
    const newData = json.data.children.map(child => child.data);
    this.setState(
      prevState => {
        const result = shouldCombine
          ? prevState.summaries.concat(newData)
          : newData;
        return {
          summaries: result,
          nextPageId: json.data.after,
        };
      },
      () => {
        this.setState({
          loading: false,
        });
      },
    );
  };
  updateReject = error => {
    this.handleError(error.toString());
    this.setState({
      loading: false,
    });
  };
  replaceOld = this.updateResolve(false);
  combineOld = this.updateResolve(true);

  handleError = msg => {
    this.setState(
      {
        error: msg,
      },
      () => {
        //setTimeout(() => {
          //this.setState({ error: '' });
          //this.props.history.replace(this.props.defaultHome);
        //}, 2000);
      },
    );
  };
  directTo = reddit => {
    this.props.history.push(`/${reddit}`);
  };
  doUpdate() {
    const { reddit, match, addReddit, cachedHour } = this.props;
    const name = match.url.slice(1);
    if (isEmpty(reddit.data) || hoursAgo(reddit.timestamp) >= cachedHour) {
      fetchReddit({ pathPiece: ['r', name] }).then(json => {
        this.replaceOld(json);
        addReddit(name, json);
      }, this.updateReject);
    } else {
      this.setState({
        summaries: reddit.data.data.children.map(child => child.data),
        nextPageId: reddit.data.data.after,
        loading: false,
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props.location, nextProps.location) ||
      !shallowEqual(this.state, nextState)
    );
  }
  componentDidMount() {
    this.doUpdate();
    window.addEventListener('scroll', this.handleScroll, false);
  }
  // 全部初始化了重新fetch
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.location, nextProps.location)) {
      this.setState(
        { loading: true, summaries: [], nextPageId: '' },
        this.doUpdate,
      );
    }
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
    const { summaries, loading, showFixedHeader, error } = this.state;
    return (
      <SubReddit
        summaries={summaries}
        loading={loading}
        showFixedHeader={showFixedHeader}
        title={this.props.match.params.sub}
        error={error}
        onSubmit={this.directTo}
      />
    );
  }
}

export default RedditContainer;
