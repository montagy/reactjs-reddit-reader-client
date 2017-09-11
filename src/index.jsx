import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Config from './Config';
import './index.css';

const render = Comp => {
  ReactDOM.render(
    <AppContainer>
      <Comp />
    </AppContainer>,
    document.getElementById('root'),
  );
};
render(Config);
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    console.log('hot');
    const NextApp = require('./Config').default;
    render(NextApp);
  });
}
