import React from 'react';

import { Global } from '@emotion/react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import MainPage from './pages/MainPage';
import commonStyles from './styles/commonStyles';
import resetStyles from './styles/resetStyles';
import SignUpPage from './pages/SignUpPage';
import ExerciseSelectionPage from './pages/ExerciseSelectionPage';
import LogInPage from './pages/LogInpage';
import history from './history';

const App: React.FC = () => {
  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/users/sign-up" component={SignUpPage} />
          <Route exact path="/users/login" component={LogInPage} />
          <Route exact path="/exercise" component={ExerciseSelectionPage} />
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default App;
