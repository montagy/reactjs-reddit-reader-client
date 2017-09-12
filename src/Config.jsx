import React from 'react';
import App from './App.jsx';
import storage from './storage.js';

class Config extends React.Component {
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
  setDefaultHome = (value) => {
    this.setState({
      defaultHome: value,
    });
  }

  render() {
    const { reddits, defaultHome, cachedHour } = this.state;
    return (
      <App
        reddits={reddits}
        defaultHome={defaultHome}
        handleAddReddit={this.handleAddReddit}
        handleDeleteReddit={this.handleDeleteReddit}
        cachedHour={cachedHour}
        setDefaultHome={this.setDefaultHome}
      />
    );
  }
}

export default Config;
