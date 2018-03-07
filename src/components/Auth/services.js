import { Api } from '../../utils';
import { URL } from '../../constants';

const services = {
  fetchUsers: () => {
    return Api.get(URL.USERS);
  },
  signUp: (user) => {
    return Api.post(URL.USERS, user);
  },
};

export default services;
