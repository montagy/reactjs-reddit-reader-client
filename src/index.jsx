import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/AppContainer';
import './index.css';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import config from './mobx/config';
import redditStore from './mobx/redditStore';
import reddits from './mobx/reddits';

useStrict(true);

const store = {
  config,
  reddits,
  redditStore,
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
