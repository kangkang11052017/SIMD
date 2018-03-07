import { Api } from '../../utils';
import { URL } from '../../constants';

const services = {
  sendMail: (mail) => {
    return Api.post(URL.MAIL, mail);
  },
};

export default services;
