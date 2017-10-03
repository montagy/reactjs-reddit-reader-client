import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/AppContainer';
import './index.css';
import { Provider } from 'mobx-react';
import store from './mobx';

const render = Comp => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...store}>
        <Comp />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};
render(App);
if (module.hot) {
  module.hot.accept('./containers/AppContainer.jsx', () => {
    const NextApp = require('./containers/AppContainer.jsx').default;
    render(NextApp);
  });
}
