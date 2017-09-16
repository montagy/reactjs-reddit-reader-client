import React from 'react';
import classNames from 'classnames';
import Summary from '../../molecules/Summary';
import Loading from '../../atoms/Loading';
import styles from './index.css';
import { scrollTopSmooth } from '../../utils';
import InlineForm from '../../molecules/InlineForm';
import Affix from '../../molecules/Affix';

function goTop(e) {
  e.preventDefault();
  scrollTopSmooth(0, 300);
}
function RedditMain({
  summaries,
  loading,
  showFixedHeader,
  error,
  onSubmit,
  sub,
}) {
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
      <div style={{margin: '0 auto'}}>
        <Loading
          active={loading}
          style={{ width: '5em', height: '5em', borderWidth: '5px' }}
        />
      </div>
      <Affix>
        <a onClick={goTop}>GO TOP</a>
      </Affix>
      <header className={cls}>
        <h1>{sub}</h1>
        <InlineForm onSubmit={onSubmit} />
      </header>
    </section>
  );
}

export default RedditMain;
