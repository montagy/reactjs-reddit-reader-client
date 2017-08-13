import React from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import Summary from '../../molecules/Summary';
import Loading from '../../atoms/Loading';
import global from '../../global';
import fetchReddit from '../../api';
import { isScrollAtEnd, scrollToEnd, hoursAgo } from '../../utils';
import styles from './index.css';

class SubReddit extends React.Component {
  reddit = global.storage[this.props.match.params.sub];
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
  componentDidMount() {
    console.log('did mount');
    if (this.reddit === undefined || hoursAgo(this.reddit.timestamp) >= 2) {
      fetchReddit(this.props.location.pathname).then(this.replaceOld);
    }
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
    const path = this.props.location.pathname;
    if (prevProps.location.pathname !== path)
      fetchReddit(path).then(this.replaceOld);
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
      <div className={styles.wrapper}>
        <div>
          {summaries}
          {this.state.loading && <Loading />}
        </div>
      </div>
    );
  }
}

export default SubReddit;
