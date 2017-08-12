import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Home, SubReddit, Post } from './pages';
import Pannel from './molecules/Pannel';
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
          <button onClick={this.togglePannel} className={styles.toggle}>
            Toggle
          </button>
          <Pannel style={{ width: this.state.showPannel ? '30%' : '2px' }} />
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
