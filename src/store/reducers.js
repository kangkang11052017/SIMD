import { fromJS } from 'immutable';
import { find } from 'lodash';
import { createActions } from 'redux-actions';
import { AUTH } from './constants';

const initState = fromJS({
  login: null,
});

const { signUp, logIn } = createActions({
  [AUTH.SIGN_UP]: (user) => { return user; },
  [AUTH.LOGIN]: (user) => { return user; },
});

const validateSignUp = (name, mail, password, users) => {
  const existName = find(users, (u) => {
    return u.userName;
  });
  const existEmail = find(users, (u) => {
    return u.email;
  });
  return existName && existEmail;
};

const simedtrieste = (state = initState, action) => {
  switch (action.type) {
  case AUTH.SIGN_UP: {
    const { userName, email, password } = action.payload;
    const users = state.get('users');
    const errorMsg = validateSignUp(userName, email, password, users) ? 'User/Email already exist!' : '';
    users.push({ userName, email, password });
    return state
      .set('users', users)
      .set('error', errorMsg);
  }
  case AUTH.LOGIN: {
    // const { nameEmail, password } = action.payload;
    // const users = state.get('users');
    return state.set('userLogin', true);
  }
  default:
    return state;
  }
};

export default {
  simedtrieste,
  signUp,
  logIn,
};

