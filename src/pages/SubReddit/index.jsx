import React from 'react';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import Summary from '../../molecules/Summary';
import Loading from '../../atoms/Loading';
import fetchReddit from '../../api';
import { isScrollAtEnd, scrollToEnd, hoursAgo } from '../../utils';
import styles from './index.css';
import shallowEqual from 'fbjs/lib/shallowEqual';

class SubReddit extends React.Component {
  initState = {
    loading: true,
    summaries: [],
    nextPageId: '',
  };
  state = this.initState;
  handleScroll = debounce(
    e => {
      e.preventDefault();
      if (isScrollAtEnd() && !this.state.loading) {
        console.log('handle scroll');
        this.setState(
          {
            loading: true,
          },
          scrollToEnd,
        );
        fetchReddit(this.props.location.pathname, this.state.nextPageId).then(
          this.combineOld,
        );
      }
    },
    2000,
    { leading: true },
  );
  updateResolve = shouldCombine => json => {
    console.log('update summaries');
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
  replaceOld = this.updateResolve(false);
  combineOld = this.updateResolve(true);

  doUpdate() {
    const { reddits, match, location, addReddit } = this.props;
    const name = match.params && match.params.sub;
    const reddit = reddits[name] || {};
    if (isEmpty(reddit.data) || hoursAgo(reddit.timestamp) >= 2) {
      fetchReddit(location.pathname).then(json => {
        this.replaceOld(json);
        addReddit(name, json);
      });
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
    console.log('did mount');
    this.doUpdate();
    window.addEventListener('scroll', this.handleScroll, false);
  }
  // 全部初始化了重新fetch
  componentWillReceiveProps(nextProps) {
    console.log('will receive');
    if (!shallowEqual(this.props.location, nextProps.location)) {
      this.setState(this.initState, this.doUpdate);
    }
  }
  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    const summaries = this.state.summaries.map(summary =>
      <Summary key={summary.id} data={summary} />,
    );
    return (
      <section className={styles.wrapper}>
        <div>
          <h1>{this.props.match.params.sub}</h1>
        </div>
        <main>
          {summaries}
          {this.state.loading && <Loading />}
        </main>
      </section>
    );
  }
}

export default SubReddit;
