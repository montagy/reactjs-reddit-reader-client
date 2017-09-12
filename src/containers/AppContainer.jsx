import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import storage from '../storage';

class AppContainer extends React.Component {
  state = {
    defaultHome: '',
    cachedHour: 2,
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
  setDefaultHome = value => {
    this.setState({
      defaultHome: value,
    });
  };
  render() {
    const { reddits, defaultHome, cachedHour } = this.state;
    return (
      <HashRouter>
        <div>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Home
                  defaultHome={defaultHome}
                  cachedHour={cachedHour}
                  setDefaultHome={this.setDefaultHome}
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
                  {...props}
                />
              );
            }}
          />
        </div>
      </HashRouter>
    );
  }
}
export default AppContainer;
