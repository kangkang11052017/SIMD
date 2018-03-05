import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Authentication from './components/Auth';
import LandingPage from './components/LandingPage/';
import { URL } from './constants';
import createStore from './store';
import './App.css';

const appStore = createStore();

const App = () => {
  return (
    <Provider store={appStore}>
      <Router>
        <div className="App">
          <Route exact path={URL.HOME} component={Authentication} />
          <Route path={URL.LANDING} component={LandingPage} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
