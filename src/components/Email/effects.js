import { Observable } from 'rxjs';
import { ACTION } from '../../constants';

const sendEmailEpic = (action$) => {
  return action$.ofType(ACTION.SEND_MAIL.START)
    .switchMap(() => {
    });
};


export default [sendEmailEpic];
