import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/AppContainer';
import './index.css';
import config from './mobx/config';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

useStrict(true);

const store = {
  config,
};
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
