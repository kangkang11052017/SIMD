import { createRequestActions, createAction } from '../../utils';
import { FETCH_USERS, SIGN_UP, LOGIN } from './actionTypes';

export const fetchUsers = createRequestActions(FETCH_USERS);
export const signUp = createRequestActions(SIGN_UP);
export const login = createAction(LOGIN, 'payload');
