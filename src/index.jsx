import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Home, SubReddit, Post } from './pages';
import global from './global';
import styles from './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    // read from localstorage
    global.storage = {};
  }
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
          <div
            className={styles.pannel}
            style={{ width: this.state.showPannel ? '30%' : '2px' }}
          >
            <button onClick={this.togglePannel}>
              Toggle
            </button>
            <div style={{ display: this.state.showPannel ? 'block' : 'none' }}>
              Toggle by Button
            </div>
          </div>
          <div className={styles.container}>
            <Route exact path="/" component={Home} />
            <Route path="/r/:sub" component={SubReddit} />
            <Route path="/p/:permalink" component={Post} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
