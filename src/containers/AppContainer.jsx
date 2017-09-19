import React from 'react';
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import storage from '../storage';
import { inject, observer } from 'mobx-react';

@inject('config')
@observer
class AppContainer extends React.Component {
  state = {
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
    this.setState({ reddits: {} });
    storage.remove('reddit');
  };
  render() {
    const { reddits } = this.state;
    const { defaultHome } = this.props.config;
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
                return <Home cleanCache={this.cleanCache} {...props} />;
              }}
            />
            <Route
              path="/:sub"
              render={props => {
                return (
                  <App
                    reddits={reddits}
                    handleAddReddit={this.handleAddReddit}
                    sub={props.match.params.sub}
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
