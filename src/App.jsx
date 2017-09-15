import React from 'react';
import { Route } from 'react-router-dom';
import { object, objectOf, string, number } from 'prop-types';
import styles from './App.css';
import RedditContainer from './containers/RedditContainer';
import PannelContainer from './containers/PannelContainer';
import PostContainer from './containers/PostContainer';

App.propTyeps = {
  config: objectOf({
    defaultHome: string,
    cachedHour: number,
    fontSize: number,
  }),
  sub: string,
  reddits: object,
};
function App({ reddits, handleAddReddit, config, sub }) {
  const { defaultHome = 'Home', cachedHour, fontSize } = config;
  return (
    <div
      style={{ fontSize: `${fontSize * 0.25}em` }}
      className={styles.wrapper}
    >
      <PannelContainer reddits={Object.keys(reddits)} />
      <div className={styles.container}>
        <Route
          path={'/' + sub}
          exact
          render={props =>
            <RedditContainer
              reddit={reddits[sub] || {}}
              sub={sub}
              addReddit={handleAddReddit}
              cachedHour={cachedHour}
              defaultHome={defaultHome}
              {...props}
            />}
        />
        <Route path={`/${sub}/:comment`} component={PostContainer} />
      </div>
    </div>
  );
}

export default App;
