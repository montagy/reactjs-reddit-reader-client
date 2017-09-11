import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Post } from './pages';
import { Pannel, ToggleButton } from './molecules';
import styles from './App.css';
import SubRedditContainer from './containers/SubRedditContainer';
import Home from './pages/Home';

class App extends React.Component {
  state = {
    showPannel: false,
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
    const { showPannel } = this.state;
    const {
      reddits,
      defaultHome = 'Home',
      handleAddReddit,
      cachedHour,
    } = this.props;
    return (
      <HashRouter>
        <div className={styles.wrapper}>
          <Pannel reddits={reddits} active={showPannel} />
          <ToggleButton active={showPannel} handleToggle={this.togglePannel} />
          <div className={styles.container} ref={ref => (this.mainPage = ref)}>
            <Route
              exact
              path="/"
              render={({ ...props }) => {
                return (
                  <Home
                    defaultHome={defaultHome}
                    cachedHour={cachedHour}
                    {...props}
                  />
                );
              }}
            />
            <Route
              path="/r/:sub"
              render={props =>
                <SubRedditContainer
                  reddit={reddits[props.match.params.sub] || {}}
                  addReddit={handleAddReddit}
                  cachedHour={cachedHour}
                  defaultHome={defaultHome}
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
