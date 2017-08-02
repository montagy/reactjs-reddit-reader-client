import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Home, SubReddit, Post } from './pages';
import global from './global';

class App extends React.Component {
  constructor(props) {
    super(props);
    // read from localstorage
    global.setStorage({});
    this.state = {
      showPannel: false,
    };
  }
  togglePannel = e => {
    e.preventDefault();
    this.setState(prevState => ({
      showPannel: !prevState.showPannel,
    }));
  };
  render() {
    return (
      <HashRouter>
        <div>
          <div className="pannel">
            <button className="toggle" onClick={this.togglePannel}>
              Toggle
            </button>
            <div style={{ display: this.state.showPannel ? 'block' : 'none' }}>
              Toggle by Button
            </div>
          </div>
          <div>
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
