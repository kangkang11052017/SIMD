import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
    };
  }

  onSignUpHandler = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        signup: true,
        registered: false,
        loginSucceed: false,
      };
    });
  }

  onLoginRequest = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        signup: false,
        registered: true,
        loginSucceed: true,
      };
    });
  }

  render() {
    const { signup, registered, loginSucceed } = this.state;
    return (
      <div className="App">
        <h2>Welcom to Simedtrieste</h2>
        {
          signup === true ?
            <SignUpForm onLoginRequest={this.onLoginRequest} /> :
            <LoginForm onLogin={this.onLoginRequest} />
        }
        {
          !signup && !registered && !loginSucceed &&
          <div>
            <p>You do not have an account?</p>
            <Button bsStyle="link" onClick={this.onSignUpHandler}>Sign Up</Button>
          </div>
        }
        {
          loginSucceed && <LandingPage />
        }
      </div>
    );
  }
}

export default App;
