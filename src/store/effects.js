import { combineEpics } from 'redux-observable';
import { effects as authEpics } from '../components/Auth';
import { effects as sendMailEpics } from '../components/LandingPage';

const rootEpic = combineEpics(
  ...authEpics,
  ...sendMailEpics,
);

export default rootEpic;
