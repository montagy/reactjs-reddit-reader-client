import React from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import Summary from '../../molecules/Summary';
import styles from './index.css';
import global from '../../global';
import fetchReddit from '../../api';

class SubReddit extends React.Component {
  reddit = global.storage[this.props.match.params.sub];
  state = {
    loading: true,
    summaries: [],
    nextPageId: '',
  };
  handleScroll = debounce(
    e => {
      e.preventDefault();
      if (
        window.innerHeight ===
          document.body.scrollHeight - document.body.scrollTop &&
        document.body.scrollTop > 0 &&
        !this.state.loading
      ) {
        console.log('handle scroll');
        this.setState({
          loading: true,
        });
        fetchReddit(
          this.props.location.pathname,
          this.update(true),
          this.state.nextPageId,
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
      const result = shouldCombine ? prevState.summaries.concat(newData) : newData;
      return {
        summaries: result,
        nextPageId: json.data.after,
      };
    });
  };
  static propTypes = {
    location: PropTypes.object,
  };

  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('scroll', this.handleScroll);
    // add to localstorage
  }
  componentDidMount() {
    console.log('did mount');
    const twohour = 2 * 60 * 60 * 1000;
    if (
      this.reddit === undefined ||
      new Date().getTime() - this.reddit.timestamp > twohour
    ) {
      fetchReddit(this.props.location.pathname, this.update(false));
    }
    window.addEventListener('scroll', this.handleScroll, false);
  }
  // 全部初始化了重新fetch
  componentWillReceiveProps(nextProps) {
    console.log('will receive');
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        loading: true,
        summaries: [],
        nextPageId: '',
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('did update');
    if (prevProps.location.pathname !== this.props.location.pathname)
      this.fetchReddit(this.props.location.pathname, this.update(false));
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
      <div>
        {summaries}
        {this.state.loading && <div className={styles.loading} />}
      </div>
    );
  }
}

export default SubReddit;
