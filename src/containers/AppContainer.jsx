import React from 'react';
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import storage from '../storage';

class AppContainer extends React.Component {
  state = {
    config: storage.read('reddit_config') || {
      defaultHome: '',
      cachedHour: 2,
      fontSize: 1,
    },
    reddits: storage.read('reddit') || {},
  };
  handleAddReddit = (name, data) => {
    const reddits = this.state.reddits;
    reddits[name] = {
      timestamp: new Date().getTime(),
      data,
    };
    this.setState({
      reddits: { ...reddits },
    });
    storage.write('reddit', reddits);
  };
  handleDeleteReddit = name => {
    const reddits = this.state.reddits;
    delete reddits[name];
    this.setState({
      reddits: { ...reddits },
    });
    storage.write('reddit', reddits);
  };
  cleanCache = () => {
    this.setState({ reddits: {}});
    storage.remove('reddit');
  }
  setDefaultHome = value => {
    this.setConfig({ defaultHome: value})
  };
  setFontSize = e => {
    e.preventDefault();
    this.setConfig({ fontSize: e.target.value});
  }
  setConfig = (patch) => {
    const config = { ...this.state.config, ...patch};
    this.setState({ config });
    storage.write('reddit_config', config)
  }
  render() {
    const { reddits, config } = this.state;
    const { defaultHome, cachedHour, fontSize } = config;
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return defaultHome
                  ? <Redirect to={`/${defaultHome}`} />
                  : <Redirect to="/site/config" />;
              }}
            />
            <Route
              path="/site/config"
              render={props => {
                return (
                  <Home
                    defaultHome={defaultHome}
                    cachedHour={cachedHour}
                    setDefaultHome={this.setDefaultHome}
                    fontSize={fontSize}
                    setFontSize={this.setFontSize}
                    cleanCache={this.cleanCache}
                    {...props}
                  />
                );
              }}
            />
            <Route
              path="/:sub"
              render={props => {
                return (
                  <App
                    reddits={reddits}
                    defaultHome={defaultHome}
                    handleAddReddit={this.handleAddReddit}
                    handleDeleteReddit={this.handleDeleteReddit}
                    cachedHour={cachedHour}
                    setDefaultHome={this.setDefaultHome}
                    fontSize={fontSize}
                    {...props}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
export default AppContainer;
