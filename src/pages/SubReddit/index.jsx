import React from 'react';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import Summary from '../../molecules/Summary';
import Loading from '../../atoms/Loading';
import fetchReddit from '../../api';
import { isScrollAtEnd, scrollToEnd, hoursAgo } from '../../utils';
import styles from './index.css';

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
  update = shouldCombine => json => {
    console.log('update summaries');
    const newData = json.data.children.map(child => child.data);
    this.setState(prevState => {
      const result = shouldCombine
        ? prevState.summaries.concat(newData)
        : newData;
      return {
        summaries: result,
        nextPageId: json.data.after,
      };
    });
  };
  replaceOld = this.update(false);
  combineOld = this.update(true);

  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('scroll', this.handleScroll);
    // add to localstorage
  }
  /*
   *shouldUpdate() {
   *  const { reddits, match } = this.props;
   *  const reddit = reddits.readReddit(match.params && match.params.sub);
   *  return (isEmpty(reddit.data) || hoursAgo(reddit.timestamp) >= 2)
   *}
   */
  doUpdate() {
    const { reddits, match, location } = this.props;
    const reddit = reddits.readReddit(match.params && match.params.sub);
    if (isEmpty(reddit.data) || hoursAgo(reddit.timestamp) >= 2) {
      fetchReddit(location.pathname).then(json => {
        this.replaceOld(json);
        //TODO this is not notify parent, so it will not toggle update
        reddits.addReddit(match.params.sub, json).store();
      });
    } else {
      this.setState({
        summaries: reddit.data.data.children.map(child => child.data),
        nextPageId: reddit.data.data.after,
      });
    }
  }
  componentDidMount() {
    console.log('did mount');
    this.doUpdate();
    window.addEventListener('scroll', this.handleScroll, false);
  }
  // 全部初始化了重新fetch
  componentWillReceiveProps(nextProps) {
    console.log('will receive');
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState(this.initState);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('did update');
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.doUpdate();
    }
    if (prevState.loading)
      this.setState({
        loading: false,
      });
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
