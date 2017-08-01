import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Home, SubReddit, Post } from './pages';

const App = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/r/:sub" component={SubReddit} />
      <Route path="/p/:permalink" component={Post} />
    </div>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
