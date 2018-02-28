import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
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
      };
    });
  }

  onLoginRequest = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        signup: false,
        registered: true,
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Welcom to Simedtrieste</h2>
        {
          this.state.signup === true ? <SignUpForm onLoginRequest={this.onLoginRequest} /> : <LoginForm />
        }
        {
          !this.state.signup && !this.state.registered &&
          <div>
            <p>You do not have an account?</p>
            <Button bsStyle="link" onClick={this.onSignUpHandler}>Sign Up</Button>
          </div>
        }
      </div>
    );
  }
}

export default App;
