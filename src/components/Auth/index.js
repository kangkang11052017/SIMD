import React, { PureComponent } from 'react';
import { object } from 'prop-types';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

class Authentication extends PureComponent {
  static propTypes = {
    history: object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      registered: false,
      loginSucceed: false,
    };
  }

  componentWillMount() {
    const { userName, password } = this.onGetUserInfo();
    this.setState((prevState) => {
      return {
        ...prevState,
        user: {
          userName,
          password,
        },
      };
    });
  }

  onGetUserInfo = () => {
    const userName = localStorage.getItem('userName');
    const password = localStorage.getItem('password');
    return { userName, password };
  }

  onSignUpRequest = (values) => {
    this.writeOnDB(values);
    const { userName, password } = values;
    this.setState((prevState) => {
      return {
        ...prevState,
        signup: false,
        registered: true,
        user: {
          userName,
          password,
        },
      };
    });
  }

  onLoginRequest = (values) => {
    const { userName, password } = values;
    const { error, registered, loginSucceed } = this.validateUser(userName, password);
    this.setState((prevState) => {
      return {
        ...prevState,
        signup: false,
        registered,
        loginSucceed,
        error,
      };
    });
  }

  validateUser = (name, pass) => {
    const { userName, password } = this.state.user;
    const validUser = {
      error: '',
      registered: false,
      loginSucceed: false,
    };
    if (userName && userName.includes(name)) {
      if (password && !password.includes(pass)) {
        validUser.error = 'User name and password mismatch';
      } else {
        validUser.registered = true;
        validUser.loginSucceed = true;
      }
    } else {
      validUser.error = 'User name not found!';
    }
    return validUser;
  }

  writeOnDB = (info) => {
    map(info, (val, key) => {
      localStorage.setItem(key, val);
    });
  };

  signUp = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        signup: true,
        registered: false,
        loginSuccedd: false,
        error: '',
      };
    });
  };

  render() {
    const {
      signup, registered, loginSucceed, error, match, history, location,
    } = this.state;
    console.log('history', history);
    console.log('match', match);
    console.log('location', location);
    return (
      <div className="App">
        <h2>Welcome to Simedtrieste</h2>
        {
          signup === true ?
            <SignUpForm onSignUp={this.onSignUpRequest} /> :
            <LoginForm onLogin={this.onLoginRequest} logged={loginSucceed} />
        }
        {
          !signup && !registered && !loginSucceed &&
          <div>
            <p>Not registered yet ? Register Now</p>
            <Button bsStyle="link" onClick={this.signUp}>Sign Up</Button>
          </div>
        }
        {
          error && <strong className="error">{error}</strong>
        }
      </div>
    );
  }
}

export default withRouter(Authentication);
