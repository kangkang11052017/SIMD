import { Api } from '../../utils';
import { URL } from '../../constants';

const services = {
  fetchUsers: () => {
    console.log('URL', URL.USERS);
    return Api.get(URL.USERS);
  },
};

export default services;
