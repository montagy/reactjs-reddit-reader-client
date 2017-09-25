import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.css';
import RedditContainer from './containers/RedditContainer';
import PannelContainer from './containers/PannelContainer';
import PostContainer from './containers/PostContainer';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('config', 'reddits')
@observer
class App extends React.Component {
  render() {
    const { defaultHome = 'Home', cachedHour, fontSize } = this.props.config;
    const { reddits, add } = this.props.reddits;
    const sub = this.props.match.params.sub;
    return (
      <div
        style={{ fontSize: `${fontSize * 0.25}em` }}
        className={styles.wrapper}
      >
        <PannelContainer />
        <div className={styles.container}>
          <Route
            path={'/' + sub}
            exact
            render={props =>
              <RedditContainer
                reddit={reddits[sub] || {}}
                sub={sub}
                addReddit={add}
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
