import { fromJS } from 'immutable';
import { AUTH } from './constants';

const initState = fromJS({
  login: null,
});

const simedtrieste = (state = initState, action) => {
  switch (action.type) {
  case AUTH.SIGN_UP:
    return state.get('login');
  default:
    return state;
  }
};

export default { simedtrieste };

