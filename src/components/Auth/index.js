import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { func, array } from 'prop-types';
import { Button } from 'react-bootstrap';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { fetchUsers, signUp } from './actions';
import reducers from './reducers';
import effects from './effects';

class Authentication extends PureComponent {
  static propTypes = {
    dispatchFetchUsers: func.isRequired,
    users: array.isRequired,
    dispatchSignUp: func.isRequired,
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
    const { dispatchFetchUsers } = this.props;
    dispatchFetchUsers();
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
    const { dispatchSignUp } = this.props;
    this.writeOnDB(values);
    const { userName, password, email = '' } = values;
    dispatchSignUp({ name: userName, email, password });
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

  validateUser = (userName, pass) => {
    const { users } = this.props;
    const validUser = {
      error: '',
      registered: false,
      loginSucceed: false,
    };
    map(users, (user) => {
      const { name, password } = user;
      if (name && name.includes(userName)) {
        if (password && !password.includes(pass)) {
          validUser.error = 'User name and password mismatch';
        } else {
          validUser.registered = true;
          validUser.loginSucceed = true;
        }
      } else {
        validUser.error = 'User name not found!';
      }
    });
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
      signup, registered, loginSucceed, error,
    } = this.state;
    const { users } = this.props;
    return (
      <div className="App">
        <h2>Welcome to Simedtrieste</h2>
        {
          signup === true ?
            <SignUpForm users={users} onSignUp={this.onSignUpRequest} /> :
            <LoginForm users={users} onLogin={this.onLoginRequest} logged={loginSucceed} />
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

const mapStateToProps = (state) => {
  return {
    users: state.users.get('users').toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchUsers: () => {
      dispatch(fetchUsers.start());
    },
    dispatchSignUp: (user) => {
      dispatch(signUp.start(user));
    },
  };
};

const enhancers = [
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
];

export default compose(...enhancers)(Authentication);
export { reducers, effects };
