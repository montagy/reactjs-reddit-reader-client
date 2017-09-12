import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/AppContainer';
import './index.css';

const render = Comp => {
  ReactDOM.render(
    <AppContainer>
      <Comp />
    </AppContainer>,
    document.getElementById('root'),
  );
};
render(App);
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    console.log('hot');
    const NextApp = require('./containers/AppContainer.jsx').default;
    render(NextApp);
  });
}
