import React from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import Summary from '../../molecules/Summary';

class SubReddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      summaries: [],
      nextPageId: '',
    };
    this.handleScroll =  debounce((e) => {
      e.preventDefault();
      if (
        window.innerHeight ===
        document.body.scrollHeight - document.body.scrollTop
        && document.body.scrollTop > 0 && !this.state.loading
      ) {
        console.log('handle scroll');
        this.setState({
          loading: true,
        });
        this.fetchData(this.props.location.pathname, (json) =>{
          this.setState(prevState => ({
            nextPageId: json.data.after,
            summaries: [...prevState.summaries, ...json.data.children.map(child => child.data)],
          }), );
        }, this.state.nextPageId);
      }
    }, 2000, { leading: true });
    /*
     *this.handleScroll = (e) => {
     *  console.log(e);
     *  console.log('handle scroll');
     *};
     */
    this.update = (json) => {
      console.log('update summaries');
      this.setState(prevState => ({
        summaries: json.data.children.map(child => child.data),
        nextPageId: json.data.after,
      }));
    };
    this.fetchData = (path, resolve, after) => {
      const basic = `https://www.reddit.com${path}.json`;
      const url = after ? `${basic}?after=${after}` : basic;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(resolve)
        .catch(err => {
          console.log(err);
        });
    }
  }
  static propTypes = {
    location: PropTypes.object,
  }

  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('scroll', this.handleScroll);
  }
  componentDidMount() {
    console.log('did mount');
    this.fetchData(this.props.location.pathname, this.update);
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
      this.fetchData(this.props.location.pathname, this.update);
    if(prevState.loading)
      this.setState(prev => {
        return { loading: false };
      });
  }
  scroll = (e) => {
    console.log('scroll');
    e.persist();
    this.handleScroll(e);
  }
  onScroll = (e) => {
    console.log('on scroll');
  }
  render() {
    const summaries = this.state.summaries.map(summary =>
      <Summary key={summary.id} data={summary} />,
    );
    return (
      <div onScroll={this.onScroll}>
        {summaries}
        {this.state.loading && <p style={{lineHeight: '3em'}}>loading...</p>}
      </div>
    );
  }
}

export default SubReddit;
