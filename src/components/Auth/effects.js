import { Observable } from 'rxjs';
import { fetchUsers, signUp } from './actions';
import { FETCH_USERS, SIGN_UP } from './actionTypes';
import services from './services';

const fetchUsersEpic = (action$) => {
  return action$.ofType(FETCH_USERS.START)
    .switchMap(() => {
      return services
        .fetchUsers()
        .flatMap((response) => {
          console.log('success', response);
          return Observable.of(fetchUsers.success(response));
        })
        .catch((error) => {
          console.log('error', error);
          return Observable.of(fetchUsers.error(error));
        });
    });
};

const signUpEpic = (action$) => {
  return action$.ofType(SIGN_UP.START)
    .switchMap((action) => {
      return services
        .signUp(action.payload)
        .flatMap((response) => {
          return Observable.of(signUp.success(response));
        })
        .catch((error) => {
          return Observable.of(signUp.error(error));
        });
    });
};

export default [fetchUsersEpic, signUpEpic];
