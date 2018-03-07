import { createRequestTypes } from '../../utils';

const MODULE_NAME = 'simedtrieste.auth';
const FETCH_USERS = createRequestTypes('FETCH_USERS', MODULE_NAME);
const SIGN_UP = createRequestTypes('SIGN_UP', MODULE_NAME);
const LOGIN = createRequestTypes('LOGIN', MODULE_NAME);

export default FETCH_USERS;
export { FETCH_USERS, SIGN_UP, LOGIN };
