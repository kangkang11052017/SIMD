import { createRequestActions } from '../../utils';
import { FETCH_USERS, SIGN_UP } from './actionTypes';

export const fetchUsers = createRequestActions(FETCH_USERS);
export const signUp = createRequestActions(SIGN_UP);
