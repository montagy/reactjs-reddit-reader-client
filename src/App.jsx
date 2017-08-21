import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { SubReddit, Post } from './pages';
import Pannel from './molecules/Pannel';
import styles from './App.css';
import storage from './storage.js';

class App extends React.Component {
  state = {
    showPannel: false,
    reddits: storage.read('reddit') || {},
  };
  togglePannel = e => {
    e.preventDefault();
    this.setState(prevState => ({
      showPannel: !prevState.showPannel,
    }));
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
  render() {
    return (
      <HashRouter>
        <div className={styles.wrapper}>
          <Pannel
            reddits={this.state.reddits}
            addReddit={this.handleAddReddit}
            deleteReddit={this.handleDeleteReddit}
            active={this.state.showPannel}
            handleToggle={this.togglePannel}
          />
          <div
            className={styles.container}
          >
            <Route
              exact
              path="/"
              render={({ match, ...rest }) => {
                match.params.sub = 'Home';
                return (
                  <SubReddit
                    reddits={this.state.reddits}
                    match={match}
                    addReddit={this.handleAddReddit}
                    {...rest}
                  />
                );
              }}
            />
            <Route
              path="/r/:sub"
              render={props =>
                <SubReddit
                  addReddit={this.handleAddReddit}
                  reddits={this.state.reddits}
                  {...props}
                />}
            />
            <Route path="/p/:permalink" component={Post} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
