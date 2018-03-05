import {
  createStore as createReduxStore,
  // applyMiddleware,
  compose, combineReducers,
} from 'redux';
// import { createEpicMiddleware,} from 'redux-observable';
import { reducer as formReducer } from 'redux-form';
import reducers from './reducers';
import { reducers as landingPageReducers } from '../components/LandingPage';

const rootReducers = combineReducers({
  form: formReducer,
  ...reducers,
  ...landingPageReducers,
});

const createStore = (initState) => {
  const state = initState || {};
  // const epicMiddleware = createEpicMiddleware([]);
  // const middlewares = [epicMiddleware];
  // const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createReduxStore(
    rootReducers,
    state,
    // composeEnhancers(...enhancers),
    composeEnhancers(),
  );
  // store.replaceEpic = epicMiddleware.replaceEpic.bind(epicMiddleware);
  return store;
};

export default createStore;
