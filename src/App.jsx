import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { SubReddit, Post } from './pages';
import { Pannel, ToggleButton } from './molecules';
import styles from './App.css';
import storage from './storage.js';

class App extends React.Component {
  state = {
    showPannel: false,
    reddits: storage.read('reddit') || {},
    error: '',
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
  handleEsc = event => {
    if (event.keyCode === 27) {
      event.preventDefault();
      this.setState(prevState => ({
        showPannel: !prevState.showPannel,
      }));
    }
  };
  handleClickBlankClosePannel = () => {
    if (this.state.showPannel) {
      this.setState({
        showPannel: false,
      });
    }
  };
  handleError = msg => {
    this.setState({
      error: msg,
    });
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
    this.mainPage.addEventListener('click', this.handleClickBlankClosePannel);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
    this.mainPage.removeEventListener(
      'click',
      this.handleClickBlankClosePannel,
    );
  }
  render() {
    const { reddits, showPannel, error } = this.state;
    return (
      <HashRouter>
        <div className={styles.wrapper}>
          {error && <div className={styles.error}>{error}</div>}
          <Pannel reddits={reddits} active={showPannel} />
          <ToggleButton active={showPannel} handleToggle={this.togglePannel} />
          <div className={styles.container} ref={ref => (this.mainPage = ref)}>
            <Route
              exact
              path="/"
              render={({ match, ...rest }) => {
                match.params.sub = 'Home';
                return (
                  <SubReddit
                    reddits={reddits}
                    match={match}
                    addReddit={this.handleAddReddit}
                    handleUpdateFail={this.handleError}
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
                  reddits={reddits}
                  handleUpdateFail={this.handleError}
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
