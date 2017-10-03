import React from 'react';
import { inject, observer } from 'mobx-react';
import throttle from 'lodash/throttle';
import { observable, action } from 'mobx';
import classNames from 'classnames';
import { scrollTopSmooth } from '../utils';
import { Summary, InlineForm, Affix } from '../molecules';
import Loading from '../atoms/Loading';
import styles from '../styles/subReddit.css';

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
  goTop = e => {
    e.preventDefault();
    scrollTopSmooth(0, 300);
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
    const summariesView = summaries.map(summary =>
      <Summary key={summary.id} data={summary} />,
    );
    const cls = classNames({
      [styles.fixedTop]: true,
      [styles.hidden]: !this.showFixedHeader,
    });
    return (
      <section className={styles.wrapper}>
        {error && <div className={styles.error}>{error}</div>}
        <header>
          <h1>{sub}</h1>
          <InlineForm onSubmit={this.directTo} />
        </header>
        <main>
          {summariesView}
        </main>
        <div>
          <Loading
            active={loading}
            style={{
              width: '5em',
              height: '5em',
              borderWidth: '5px',
              margin: '0 auto',
            }}
          />
        </div>
        <Affix className={styles.affix}>
          <a onClick={this.goTop}>GO TOP</a>
        </Affix>
        <header className={cls}>
          <h1>{sub}</h1>
          <InlineForm onSubmit={this.directTo} />
        </header>
      </section>
    );
  }
}

export default RedditContainer;
