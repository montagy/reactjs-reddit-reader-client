import React from 'react';
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import { inject, observer } from 'mobx-react';

@inject('config')
@observer
class AppContainer extends React.Component {
  render() {
    const { defaultHome } = this.props.config;
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return defaultHome
                  ? <Redirect to={`/${defaultHome}`} />
                  : <Redirect to="/site/config" />;
              }}
            />
            <Route path="/site/config" component={Home} />
            <Route path="/:sub" component={App} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
export default AppContainer;
