import { Api } from '../../utils';
import { URL } from '../../constants';

const services = {
  fetchUsers: () => {
    return Api.get(URL.USERS);
  },
  signUp: () => {
    return Api.post(URL.USERS);
  },
};

export default services;
