import { map } from 'lodash';
import { ACTION_REQ } from '../constants';

const createActionType = (type, module) => {
  return `${module}/${type}`;
};

const createRequestTypes = (base, module = '') => {
  return map(ACTION_REQ).reduce((acc, type) => {
    const actionType = `${base}_${type}`;
    return {
      ...acc,
      [type]: module ? `${module}/${actionType}` : actionType,
    };
  }, {});
};

export default createRequestTypes;
export {
  createRequestTypes,
  createActionType,
};
