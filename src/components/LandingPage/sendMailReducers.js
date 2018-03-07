import { fromJS } from 'immutable';
import { SEND_MAIL } from './actionTypes';

const initState = fromJS({
  isLoading: false,
  isSucceed: false,
  error: null,
});

const users = (state = initState, action) => {
  switch (action.type) {
  case SEND_MAIL.START:
    return state
      .set('isLoading', true)
      .set('isSucceed', false)
      .set('error', null);

  case SEND_MAIL.SUCCESS:
    return state
      .set('isLoading', false)
      .set('isSucceed', action.payload)
      .set('error', null);

  case SEND_MAIL.ERROR:
    return state
      .set('isLoading', false)
      .set('isSucceed', false)
      .set('error', fromJS(action.payload));

  default: return state;
  }
};

export default { users };
