import React from 'react';
import { Route } from 'react-router-dom';
import { Post } from './pages';
import styles from './App.css';
import RedditContainer from './containers/RedditContainer';
import PannelContainer from './containers/PannelContainer';

class App extends React.Component {
  render() {
    const {
      reddits,
      defaultHome = 'Home',
      handleAddReddit,
      cachedHour,
      match
    } = this.props;
    const sub = match.params.sub;
    return (
      <div className={styles.wrapper}>
        <PannelContainer reddits={Object.keys(reddits)} />
        <div className={styles.container}>
          <Route
            path={match.url}
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
          <Route path={`${match.url}/:comment`} component={Post} />
        </div>
      </div>
    );
  }
}

export default App;
