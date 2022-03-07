import React from 'react';

import { Global } from '@emotion/react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import commonStyles from './styles/commonStyles';
import resetStyles from './styles/resetStyles';

const App: React.FC = () => {
  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
