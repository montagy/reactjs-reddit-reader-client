import React from 'react';
//import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import isEmpty from 'lodash/isEmpty';
import Summary from '../../molecules/Summary';
import Loading from '../../atoms/Loading';
import fetchReddit from '../../api';
import { isScrollAtEnd, scrollToEnd, hoursAgo } from '../../utils';
import styles from './index.css';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { scrollTopSmooth } from '../../utils';
import Header from '../../organisms/Header';

class SubReddit extends React.Component {
  state = {
    loading: true,
    summaries: [],
    nextPageId: '',
    showFixedHeader: false,
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
          path: this.props.location.pathname,
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
    this.props.handleUpdateFail(error.toString());
    this.setState({
      loading: false,
    });
  };
  replaceOld = this.updateResolve(false);
  combineOld = this.updateResolve(true);
  goTop = e => {
    e.preventDefault();
    scrollTopSmooth(0, 300);
  };

  doUpdate() {
    const { reddits, match, location, addReddit, cachedHour } = this.props;
    const name = match.params && match.params.sub;
    const reddit = reddits[name] || {};
    if (isEmpty(reddit.data) || hoursAgo(reddit.timestamp) >= cachedHour) {
      fetchReddit({ path: location.pathname }).then(json => {
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
    const summaries = this.state.summaries.map(summary =>
      <Summary key={summary.id} data={summary} />,
    );
    const { loading, showFixedHeader } = this.state;
    return (
      <section className={styles.wrapper}>
        <Header
          title={this.props.match.params.sub}
          style={{ opacity: showFixedHeader ? 1 : 0 }}
          className={styles.fixedTop}
        />
        <Header title={this.props.match.params.sub} />
        <main>
          <div>
            {summaries}
          </div>
        </main>
        {loading && <Loading />}
        <footer>
          <a onClick={this.goTop}>GO TOP</a>
          继续下拉刷新
        </footer>
      </section>
    );
  }
}

export default SubReddit;
