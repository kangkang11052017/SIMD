import { fromJS } from 'immutable';
import FETCH_USERS from './actionTypes';

const initState = fromJS({
  users: fromJS([]),
  isLoading: false,
  isLoaded: false,
  error: null,
});

const users = (state = initState, action) => {
  switch (action.type) {
  case FETCH_USERS.START:
    console.log('STARINTG', action.type);

    return state
      .set('isLoading', true)
      .set('isLoaded', false)
      .set('error', null);

  case FETCH_USERS.SUCCESS:
    return state
      .set('isLoading', false)
      .set('isLoaded', true)
      .set('error', null)
      .set('users', fromJS(action.payload));

  case FETCH_USERS.ERROR:
    return state
      .set('isLoading', false)
      .set('isLoaded', false)
      .set('error', fromJS(action.payload));

  default: return state;
  }
};

export default { users };
