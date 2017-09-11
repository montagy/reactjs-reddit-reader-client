import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { SubReddit, Post } from './pages';
import { Pannel, ToggleButton } from './molecules';
import styles from './App.css';

class App extends React.Component {
  state = {
    showPannel: false,
    error: '',
  };
  togglePannel = e => {
    e.preventDefault();
    this.setState(prevState => ({
      showPannel: !prevState.showPannel,
    }));
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
  clearError = () => {
    this.setState({ error: '' });
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
    const { showPannel, error } = this.state;
    const { reddits, defaultHome = 'Home', handleAddReddit } = this.props;
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
                match.params.sub = defaultHome;
                return (
                  <SubReddit
                    reddits={reddits}
                    match={match}
                    addReddit={handleAddReddit}
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
                  addReddit={handleAddReddit}
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
