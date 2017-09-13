import React from 'react';
import classNames from 'classnames';
import Summary from '../../molecules/Summary';
import Loading from '../../atoms/Loading';
import styles from './index.css';
import { scrollTopSmooth } from '../../utils';
import InlineForm from '../../molecules/InlineForm';

class RedditMain extends React.Component {
  goTop = e => {
    e.preventDefault();
    scrollTopSmooth(0, 300);
  };
  render() {
    const {
      summaries,
      loading,
      showFixedHeader,
      error,
      onSubmit,
      sub,
    } = this.props;
    const summariesView = summaries.map(summary =>
      <Summary key={summary.id} data={summary} />,
    );
    const cls = classNames({
      [styles.fixedTop]: true,
      [styles.active]: showFixedHeader,
    });
    return (
      <section className={styles.wrapper}>
        {error && <div className={styles.error}>{error}</div>}
        <header>
          <h1>{sub}</h1>
          <InlineForm onSubmit={onSubmit} />
        </header>
        <main>
          {summariesView}
        </main>
        <Loading active={loading}/>
        <footer>
          <a onClick={this.goTop}>GO TOP</a>
          继续下拉刷新
        </footer>
        <header className={cls}>
          <h1>{sub}</h1>
          <InlineForm onSubmit={onSubmit} />
        </header>
      </section>
    );
  }
}

export default RedditMain;
