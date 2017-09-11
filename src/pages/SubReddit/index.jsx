import React from 'react';
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
    const { summaries, loading, showFixedHeader, title } = this.props;
    const summariesView = summaries.map(summary =>
      <Summary key={summary.id} data={summary} />,
    );
    return (
      <section className={styles.wrapper}>
        <Header
          title={title}
          style={{ opacity: showFixedHeader ? 1 : 0 }}
          className={styles.fixedTop}
        />
        <Header title={title} />
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
