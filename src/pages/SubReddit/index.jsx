import React from 'react';
import classNames from 'classnames';
import Summary from '../../molecules/Summary';
import Loading from '../../atoms/Loading';
import styles from './index.css';
import { scrollTopSmooth } from '../../utils';
import Header from '../../organisms/Header';

class SubReddit extends React.Component {
  goTop = e => {
    e.preventDefault();
    scrollTopSmooth(0, 300);
  };
  render() {
    const { summaries, loading, showFixedHeader, title, error, onSubmit } = this.props;
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
        <Header
          title={title}
          className={cls}
          onSubmit={onSubmit}
        />
        <Header title={title} onSubmit={onSubmit} />
        <main>
          <div>
            {summariesView}
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
