import { Observable } from 'rxjs';
import { fetchUsers } from './actions';
import FETCH_USERS from './actionTypes';
import services from './services';

const fetchUsersEpic = (action$) => {
  return action$.ofType(FETCH_USERS.START)
    .switchMap(() => {
      return services
        .fetchUsers()
        .flatMap((response) => {
          console.log('response', response);
          return Observable.of(fetchUsers.success(response));
        })
        .catch((error) => {
          return Observable.of(fetchUsers.error(error));
        });
    });
};

export default [fetchUsersEpic];
