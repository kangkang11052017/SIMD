import { combineEpics } from 'redux-observable';
import { effects as emailEpics } from '../components/Email';
import { effects as authEpics } from '../components/Auth';

const rootEpic = combineEpics(
  ...emailEpics,
  ...authEpics,
);

export default rootEpic;
