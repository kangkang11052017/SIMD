import { Observable } from 'rxjs';
import { sendMail } from './actions';
import { SEND_MAIL } from './actionTypes';
import services from './services';

const sendMailEpic = (action$) => {
  return action$.ofType(SEND_MAIL.START)
    .switchMap((action) => {
      return services
        .sendMail(action.payload)
        .flatMap((response) => {
          return Observable.of(sendMail.success(response));
        })
        .catch((error) => {
          return Observable.of(sendMail.error(error));
        });
    });
};

export default [sendMailEpic];
