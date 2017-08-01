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
      ) {
        this.setState({
          loading: true,
        });
        this.fetchData(props.location.pathname, (json) =>{
          this.setState(prevState => ({
            nextPageId: json.data.after,
            summaries: [...prevState.summaries, ...json.data.children.map(child => child.data)],
          }), );
        }, this.state.nextPageId);
      }
    }, 2000, { leading: true });
    this.update = (json) => {
      this.setState(prevState => ({
        loading: false,
        summaries: json.data.children.map(child => child.data),
        nextPageId: json.data.after,
      }));
    };
  }
  static propTypes = {
    location: PropTypes.object,
  }
  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  componentDidMount() {
    this.fetchData(this.props.location.pathname, this.update);
  }
  // 全部初始化了重新fetch
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        loading: true,
        summaries: [],
        nextPageId: '',
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname)
      this.fetchData(prevProps.location.pathname, this.update);
    if(prevState.loading)
      this.setState(prev => {
        return { loading: false };
      });
  }
  fetchData(path, resolve, after) {
    const basic = `https://www.reddit.com${path}.json`;
    const url = after ? `${basic}?after=${after}` : basic;
    fetch(url)
      .then(res => res.json())
      .then(resolve)
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const summaries = this.state.summaries.map(summary =>
      <Summary key={summary.id} data={summary} />,
    );
    return (
      <div>
        {summaries}
        {this.state.loading && <p style={{lineHeight: '3em'}}>loading...</p>}
      </div>
    );
  }
}

export default SubReddit;
