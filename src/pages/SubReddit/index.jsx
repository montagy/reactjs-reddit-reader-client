import React from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import Summary from '../../molecules/Summary';
import styles from './index.css';
import global from '../../global';

class SubReddit extends React.Component {
  constructor(props) {
    super(props);
    this.reddit = global.getStorage()[props.match.params.sub];
    this.state = {
      loading: true,
      summaries: [],
      nextPageId: '',
    };
    this.handleScroll = debounce(
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
          this.fetchReddit(
            this.props.location.pathname,
            json => {
              this.setState(prevState => ({
                nextPageId: json.data.after,
                summaries: [
                  ...prevState.summaries,
                  ...json.data.children.map(child => child.data),
                ],
              }));
            },
            this.state.nextPageId,
          );
        }
      },
      2000,
      { leading: true },
    );
    this.update = json => {
      console.log('update summaries');
      this.setState(prevState => ({
        summaries: json.data.children.map(child => child.data),
        nextPageId: json.data.after,
      }));
    };
    this.fetchReddit = (path, resolve, after) => {
      const basic = `https://www.reddit.com${path}.json`;
      const url = after ? `${basic}?after=${after}` : basic;
      console.log(url);
      fetch(url).then(res => res.json()).then(resolve).catch(err => {
        console.log(err);
      });
    };
  }
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
      this.fetchReddit(this.props.location.pathname, this.update);
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
      this.fetchReddit(this.props.location.pathname, this.update);
    if (prevState.loading)
      this.setState(prev => {
        return { loading: false };
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
