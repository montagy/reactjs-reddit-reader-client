import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.css';
import RedditContainer from './containers/RedditContainer';
import PannelContainer from './containers/PannelContainer';
import PostContainer from './containers/PostContainer';
import { inject, observer } from 'mobx-react';

@inject('config')
@observer
class App extends React.Component {
  render() {
    const { defaultHome = 'Home', cachedHour, fontSize } = this.props.config;
    const { reddits, handleAddReddit, sub } = this.props;
    return (
      <div
        style={{ fontSize: `${fontSize * 0.25}em` }}
        className={styles.wrapper}
      >
        <PannelContainer
          reddits={reddits}
          addReddit={handleAddReddit}
          cachedHour={cachedHour}
        />
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
}

export default App;
