import { fromJS } from 'immutable';
import { find } from 'lodash';
import { createActions } from 'redux-actions';
import { AUTH, ACTION } from '../constants';

const initState = fromJS({
  login: null,
});

const actions = createActions({
  [AUTH.SIGN_UP]: (user) => { return user; },
  [AUTH.LOGIN]: (user) => { return user; },
  [ACTION.SET_ROOM_CONFIG]: (config) => { return config; },
  [ACTION.SET_TEMP_OBJ]: (obj) => { return obj; },
  [ACTION.SET_CHART_DATA]: (data) => { return data; },
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

const simedReducers = (state = initState, action) => {
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

export default { simedReducers };
export { actions };
