import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import reducer from './modules/reducer';
import rootSaga from './modules/rootSaga';
import history from '../history';

const create = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,

    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
