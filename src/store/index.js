import {
  createStore as createReduxStore,
  applyMiddleware,
  compose, combineReducers,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { reducer as formReducer } from 'redux-form';
import reducers from './reducers';
import { reducers as landingPageReducers, mailReducers } from '../components/LandingPage';
import { reducers as authReducers } from '../components/Auth';
import rootEpic from './effects';

const rootReducers = combineReducers({
  form: formReducer,
  ...reducers,
  ...landingPageReducers,
  ...authReducers,
  ...mailReducers,
});

const createStore = (initState) => {
  const state = initState || {};
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const middlewares = [epicMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createReduxStore(
    rootReducers,
    state,
    composeEnhancers(...enhancers),
  );
  store.replaceEpic = epicMiddleware.replaceEpic.bind(epicMiddleware);
  return store;
};

export default createStore;
