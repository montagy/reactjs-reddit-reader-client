import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.css';
import RedditContainer from './containers/RedditContainer';
import PannelContainer from './containers/PannelContainer';
import PostContainer from './containers/PostContainer';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('config')
@observer
class App extends React.Component {
  render() {
    const { fontSize } = this.props.config;
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
            render={props => <RedditContainer sub={sub} {...props} />}
          />
          <Route path={`/${sub}/:comment`} component={PostContainer} />
        </div>
      </div>
    );
  }
}

export default App;
