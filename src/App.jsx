import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Home, SubReddit, Post } from './pages';
import Pannel from './molecules/Pannel';
import global from './global';
import styles from './App.css';

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
  render() {
    return (
      <HashRouter>
        <div className={styles.wrapper}>
          <Pannel style={{ width: this.state.showPannel ? '30%' : '0' }} />
          <div
            className={styles.container}
            style={{ marginLeft: this.state.showPannel ? '30%' : '0' }}
          >
            <button onClick={this.togglePannel} className={styles.toggle}>
              <span className={this.state.showPannel ? styles.firstBar : ''} />
              <span
                style={{ opacity: this.state.showPannel ? '0' : '1' }}
              />
              <span className={this.state.showPannel ? styles.lastBar : ''} />
            </button>
            <Route exact path="/" component={Home} />
            <Route path="/r/:sub" component={SubReddit} />
            <Route path="/p/:permalink" component={Post} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
